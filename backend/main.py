from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import mysql.connector
import os
import shutil
import uuid
import json

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

db_config = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "0987654321"),
    "database": os.getenv("DB_NAME", "prige_db"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "ssl_disabled": os.getenv("DB_SSL_DISABLED", "true") == "true"
}

def get_db():
    return mysql.connector.connect(**db_config)

# Create table for general settings if it doesn't exist
conn = get_db()
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(50) PRIMARY KEY,
        setting_value TEXT
    )
""")
conn.commit()
cursor.close()
conn.close()

@app.get("/api/products")
def get_products():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM products ORDER BY created_at DESC")
    res = cursor.fetchall()
    cursor.close()
    conn.close()
    return res

@app.post("/api/products")
def create_product(title: str = Form(...), description: str = Form(...), image: UploadFile = File(...)):
    file_ext = image.filename.split(".")[-1]
    unique_name = f"{uuid.uuid4().hex}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    image_url = f"/uploads/{unique_name}"

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO products (title, description, image_url) VALUES (%s, %s, %s)", (title, description, image_url))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Product added", "image_url": image_url}

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT image_url FROM products WHERE id = %s", (product_id,))
    result = cursor.fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="Not found")
    
    file_path = os.path.join(UPLOAD_DIR, result["image_url"].replace("/uploads/", ""))
    if os.path.exists(file_path):
        os.remove(file_path)

    cursor.execute("DELETE FROM products WHERE id = %s", (product_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Deleted"}

# Get all settings (like text and slideshow images)
@app.get("/api/settings")
def get_settings():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM site_settings")
    res = cursor.fetchall()
    cursor.close()
    conn.close()
    # Convert list of dicts to a single dict
    return {item["setting_key"]: item["setting_value"] for item in res}

# Save general text settings
@app.post("/api/settings")
def save_settings(data: dict):
    conn = get_db()
    cursor = conn.cursor()
    for key, value in data.items():
        cursor.execute("""
            INSERT INTO site_settings (setting_key, setting_value) 
            VALUES (%s, %s) 
            ON DUPLICATE KEY UPDATE setting_value = %s
        """, (key, value, value))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Settings saved"}

# Upload a slideshow image
@app.post("/api/slideshow")
def add_slideshow_image(image: UploadFile = File(...)):
    file_ext = image.filename.split(".")[-1]
    unique_name = f"slide_{uuid.uuid4().hex}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    image_url = f"/uploads/{unique_name}"
    
    # Get existing slideshow images
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT setting_value FROM site_settings WHERE setting_key = 'slideshow_images'")
    row = cursor.fetchone()
    
    images_list = json.loads(row["setting_value"]) if row else []
    images_list.append(image_url)
    
    # Save back to DB
    cursor.execute("""
        INSERT INTO site_settings (setting_key, setting_value) 
        VALUES ('slideshow_images', %s) 
        ON DUPLICATE KEY UPDATE setting_value = %s
    """, (json.dumps(images_list), json.dumps(images_list)))
    
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Image added", "image_url": image_url}