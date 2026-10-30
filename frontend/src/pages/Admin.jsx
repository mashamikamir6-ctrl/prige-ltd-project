import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { 
  Lock, LogOut, LayoutDashboard, Image as ImageIcon, CheckCircle, 
  Sprout, Home, FileText, Settings, Plus, Trash2, Save, Briefcase, 
  Lightbulb, BookOpen, PhoneCall, Users, Eye, EyeOff
} from "lucide-react";

const API_URL = "https://prige-backend.onrender.com";
const ADMIN_PASSWORD = "prige_ltd@2026!!";

const defaultImages = [
  "https://prige-ltd-1.vercel.app/images/avocado-blossom.png",
  "https://prige-ltd-1.vercel.app/images/avocado-tree.png",
  "https://prige-ltd-1.vercel.app/images/lettuce-2.png",
  "https://prige-ltd-1.vercel.app/images/lettuce-3.jpeg",
  "https://prige-ltd-1.vercel.app/images/avocado-boxes.png",
  "https://prige-ltd-1.vercel.app/images/avocado-crate.png",
  "https://prige-ltd-1.vercel.app/images/avocado-close.png",
  "https://prige-ltd-1.vercel.app/images/avocadoes.png",
  "https://prige-ltd-1.vercel.app/images/beets.jpg",
  "https://prige-ltd-1.vercel.app/images/cabbages.jpg",
  "https://prige-ltd-1.vercel.app/images/couli flowers.jpg",
  "https://prige-ltd-1.vercel.app/images/french-beans.png",
  "https://prige-ltd-1.vercel.app/images/lemons.jpeg",
  "https://prige-ltd-1.vercel.app/images/strawberries.jpeg",
  "https://prige-ltd-1.vercel.app/images/lettuce-1.png",
  "https://prige-ltd-1.vercel.app/images/tomatoes.jpeg"
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("prige_admin_auth") === "true";
  });
  
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${API_URL}/api/settings`)
        .then(res => res.json())
        .then(data => setSiteData(data))
        .catch(err => console.error("Error loading settings", err));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("prige_admin_auth", "true");
      toast.success("Welcome to PRIGE LTD Admin!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("prige_admin_auth");
    toast.success("Logged out successfully");
  };

  const handleSaveField = async (key, value) => {
    try {
      const payload = { ...siteData, [key]: value };
      await fetch(`${API_URL}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setSiteData(payload);
      toast.success("Saved successfully!");
    } catch (err) {
      toast.error("Failed to save.");
    }
  };

  const handleSavePage = async (fields) => {
    try {
      const payload = { ...siteData, ...fields };
      await fetch(`${API_URL}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setSiteData(payload);
      toast.success("All changes saved successfully!");
    } catch (err) {
      toast.error("Failed to save changes.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F8E9] px-4">
        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#2E7D32]"></div>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm overflow-hidden">
            <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover p-2" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1B5E20] mb-2 font-heading">PRIGE LTD Admin</h1>
          <p className="text-gray-500 mb-8 text-sm">Enter your secure password to manage website content.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="Enter admin password..."
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(e); }} 
                className="w-full border border-gray-300 rounded-xl px-5 py-4 pr-12 focus:ring-2 focus:ring-[#2E7D32] outline-none transition-all text-center tracking-widest bg-gray-50 font-bold"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              <Lock size={18} /> Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-[#1B5E20] text-white flex flex-col shadow-2xl relative z-20 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3 border-b border-green-800/50">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm">
             <img src="/favicon.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg leading-tight font-heading tracking-wide">PRIGE LTD</h2>
            <p className="text-[11px] text-green-300 font-medium tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 mt-2 px-4">Website Pages</p>
          <button onClick={() => setActiveTab("home")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "home" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><Home size={18} /> Home Page</button>
          <button onClick={() => setActiveTab("about")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "about" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><Sprout size={18} /> About Us</button>
          <button onClick={() => setActiveTab("work")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "work" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><Briefcase size={18} /> Our Work</button>
          <button onClick={() => setActiveTab("projects")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "projects" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><LayoutDashboard size={18} /> Projects</button>
          <button onClick={() => setActiveTab("innovation")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "innovation" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><Lightbulb size={18} /> Innovation</button>
          <button onClick={() => setActiveTab("news")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "news" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><FileText size={18} /> News</button>
          <button onClick={() => setActiveTab("resources")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "resources" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><BookOpen size={18} /> Resources</button>
          <button onClick={() => setActiveTab("contact")} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl w-full transition-colors ${activeTab === "contact" ? "bg-white/20 font-bold" : "hover:bg-white/10 font-medium text-green-100/70"}`}><PhoneCall size={18} /> Contact</button>
        </nav>
        
        <div className="p-4 border-t border-green-800/50">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full text-left text-red-300 hover:bg-red-500/20 hover:text-red-100 transition-colors font-semibold"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto pb-20">
          <header className="mb-8 flex justify-between items-end border-b pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-heading capitalize">{activeTab === "work" ? "Our Work" : activeTab === "contact" ? "Contact Page" : activeTab}</h1>
              <p className="text-gray-500 mt-2">Edit the text and images for this section below.</p>
            </div>
          </header>

          {activeTab === "home" && <HomeManager onSavePage={handleSavePage} onSaveField={handleSaveField} siteData={siteData} />}
          {activeTab === "about" && <AboutManager onSavePage={handleSavePage} siteData={siteData} />}
          {activeTab === "work" && <WorkManager onSavePage={handleSavePage} siteData={siteData} />}
          {activeTab === "projects" && <ProjectsManager onSavePage={handleSavePage} siteData={siteData} />}
          {activeTab === "innovation" && <InnovationManager onSavePage={handleSavePage} siteData={siteData} />}
          {activeTab === "news" && <NewsManager onSavePage={handleSavePage} siteData={siteData} />}
          {activeTab === "resources" && <ResourcesManager onSavePage={handleSavePage} siteData={siteData} />}
          {activeTab === "contact" && <ContactManager onSavePage={handleSavePage} siteData={siteData} />}
        </div>
      </main>
    </div>
  );
}

// ================= HOME MANAGER =================
function HomeManager({ onSavePage, onSaveField, siteData }) {
  const [images, setImages] = useState(siteData.home_images ? JSON.parse(siteData.home_images) : defaultImages);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const whatImageInputRef = useRef(null);

  const handleImageUpload = async (e, isWhatWeDo = false) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/slideshow`, { method: "POST", body: formData });
      const data = await res.json();
      
      if (isWhatWeDo) {
        onSaveField("home_what_image", data.image_url);
      } else {
        const newImages = [...images, data.image_url];
        setImages(newImages);
        onSaveField("home_images", JSON.stringify(newImages)); 
      }
      toast.success("Image added!");
    } catch (err) {
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image deletion with confirmation
  const handleDeleteImage = (index) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      const newImgs = images.filter((_, idx) => idx !== index);
      setImages(newImgs);
      onSaveField("home_images", JSON.stringify(newImgs));
      toast.success("Image deleted.");
    }
  };

  // Function to handle what-we-do image deletion with confirmation
  const handleDeleteWhatImage = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      onSaveField("home_what_image", "");
      toast.success("Image deleted.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Slideshow */}
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><ImageIcon className="text-[#2E7D32]" /> Hero Slideshow Images</h2>
        <p className="text-gray-500 text-sm mb-6">These images rotate automatically on the home page.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 border">
              <img src={img.startsWith('http') ? img : `${API_URL}${img}`} alt="slide" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDeleteImage(i)} className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleImageUpload(e, false)} className="hidden" />
          <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-[#2E7D32] hover:text-[#2E7D32] aspect-square transition-colors">
            {loading ? <span className="animate-pulse font-bold text-sm">Uploading...</span> : <><Plus size={24} /><span className="text-xs font-bold mt-1">Add Image</span></>}
          </div>
        </div>
      </section>

      {/* Welcome & Pillars Form */}
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <label className="block font-bold text-gray-900 mb-2">Welcome Title</label>
        <input id="home_welcome_title" type="text" defaultValue={siteData.home_welcome_title || "Welcome to PRIGE LTD"} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-[#2E7D32] outline-none" />
        
        <label className="block font-bold text-gray-900 mb-2">Welcome Text</label>
        <textarea id="home_welcome_text" defaultValue={siteData.home_welcome_text || "Founded in 2020, PRIGE LTD is a premier Rwandan agribusiness dedicated to transforming agriculture through innovation. By combining modern greenhouse technology with community-driven empowerment, we bridge the gap between sustainable farming and reliable food security."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-8" />

        <h2 className="text-xl font-bold text-gray-900 mb-4 border-t pt-6">Our Core Pillars</h2>
        <textarea id="home_pillars_sub" defaultValue={siteData.home_pillars_sub || "Three commitments that drive every harvest, every partnership, and every family we empower."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-4" />

        <div className="space-y-4 mb-8">
          <div className="p-4 border rounded-xl bg-gray-50">
            <input id="home_pillar1_title" type="text" defaultValue={siteData.home_pillar1_title || "Modern Agriculture"} className="font-bold text-lg w-full bg-transparent border-b border-gray-300 mb-2 pb-1 focus:outline-none focus:border-[#2E7D32]" />
            <textarea id="home_pillar1_text" defaultValue={siteData.home_pillar1_text || "Utilizing state-of-the-art greenhouses and smart nursery beds to ensure year-round, high-yield crop production."} className="w-full bg-transparent text-sm resize-none focus:outline-none" rows={2} />
          </div>
          <div className="p-4 border rounded-xl bg-gray-50">
            <input id="home_pillar2_title" type="text" defaultValue={siteData.home_pillar2_title || "Social Impact"} className="font-bold text-lg w-full bg-transparent border-b border-gray-300 mb-2 pb-1 focus:outline-none focus:border-[#2E7D32]" />
            <textarea id="home_pillar2_text" defaultValue={siteData.home_pillar2_text || "Proudly creating meaningful employment and training opportunities for over 50 local youth and women in the Gakenke district."} className="w-full bg-transparent text-sm resize-none focus:outline-none" rows={2} />
          </div>
          <div className="p-4 border rounded-xl bg-gray-50">
            <input id="home_pillar3_title" type="text" defaultValue={siteData.home_pillar3_title || "Zero Waste & Zero Hunger"} className="font-bold text-lg w-full bg-transparent border-b border-gray-300 mb-2 pb-1 focus:outline-none focus:border-[#2E7D32]" />
            <textarea id="home_pillar3_text" defaultValue={siteData.home_pillar3_text || "Fighting food insecurity by modernizing supply chains and processing raw harvests into premium retail products."} className="w-full bg-transparent text-sm resize-none focus:outline-none" rows={2} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4 border-t pt-6">What We Do Best</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
             {siteData.home_what_image ? (
                <div className="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 border mb-2">
                  <img src={siteData.home_what_image.startsWith('http') ? siteData.home_what_image : `${API_URL}${siteData.home_what_image}`} alt="What We Do" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={handleDeleteWhatImage} className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 text-sm font-bold">Remove Image</button>
                  </div>
                </div>
             ) : (
                <div onClick={() => whatImageInputRef.current.click()} className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-[#2E7D32] hover:text-[#2E7D32] aspect-video transition-colors mb-2">
                  <Plus size={24} />
                  <span className="text-xs font-bold mt-1">Upload Image</span>
                </div>
             )}
             <input type="file" accept="image/*" ref={whatImageInputRef} onChange={(e) => handleImageUpload(e, true)} className="hidden" />
          </div>
          <div>
            <textarea id="home_what_sub" defaultValue={siteData.home_what_sub || "Based in Cyabingo Sector, Gakenke District, we manage a fully integrated agricultural ecosystem."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-20 mb-4 focus:ring-2 focus:ring-[#2E7D32] outline-none" />
            <textarea id="home_what_list" defaultValue={siteData.home_what_list || "Horticulture crops cultivation\nAggregation of avocado and horticulture crops\nExport of avocado and French beans\nTraining of youth and groups in the avocado value chain"} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-32 focus:ring-2 focus:ring-[#2E7D32] outline-none text-sm" />
          </div>
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            home_welcome_title: document.getElementById('home_welcome_title').value,
            home_welcome_text: document.getElementById('home_welcome_text').value,
            home_pillars_sub: document.getElementById('home_pillars_sub').value,
            home_pillar1_title: document.getElementById('home_pillar1_title').value,
            home_pillar1_text: document.getElementById('home_pillar1_text').value,
            home_pillar2_title: document.getElementById('home_pillar2_title').value,
            home_pillar2_text: document.getElementById('home_pillar2_text').value,
            home_pillar3_title: document.getElementById('home_pillar3_title').value,
            home_pillar3_text: document.getElementById('home_pillar3_text').value,
            home_what_sub: document.getElementById('home_what_sub').value,
            home_what_list: document.getElementById('home_what_list').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save Home Page Changes
          </button>
        </div>
      </section>
    </div>
  );
}

// ================= ABOUT MANAGER =================
function AboutManager({ onSavePage, siteData }) {
  const [ceoImage, setCeoImage] = useState(siteData.about_ceo_img || "");
  const ceoImageInputRef = useRef(null);

  const handleCeoImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${API_URL}/api/slideshow`, { method: "POST", body: formData });
      const data = await res.json();
      setCeoImage(data.image_url);
      onSavePage({ about_ceo_img: data.image_url });
      toast.success("Image added!");
    } catch (err) {
      toast.error("Failed to upload image.");
    }
  };

  // Delete confirmation for CEO image
  const handleDeleteCeoImage = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setCeoImage("");
      onSavePage({ about_ceo_img: "" });
      toast.success("Image deleted.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Our Story, Our Mission</h2>
        <textarea id="about_story" defaultValue={siteData.about_story || "From a vision in Gakenke to a growing force for sustainable agriculture in Rwanda."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-[#2E7D32] outline-none font-medium text-lg" />
        
        <label className="block font-bold text-gray-900 mb-2">Who We Are</label>
        <textarea id="about_who" defaultValue={siteData.about_who || "PRIGE LTD is a forward-thinking agricultural enterprise based in Rwanda's Northern Province. Established by CEO Pierre Célestin Masengesho, our company was born out of a vision to modernize traditional farming, uplift marginalized demographics, and build a resilient local food economy."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-28 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-4" />
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-bold text-gray-900 mb-2">Our Mission</label>
            <textarea id="about_mission" defaultValue={siteData.about_mission || "To drive agricultural transformation in Rwanda by deploying sustainable farming technologies that empower women and youth while delivering premium-quality foods to market."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-32 focus:ring-2 focus:ring-[#2E7D32] outline-none" />
          </div>
          <div>
            <label className="block font-bold text-gray-900 mb-2">Our Vision</label>
            <textarea id="about_vision" defaultValue={siteData.about_vision || "To be a leading African agribusiness celebrated for zero-waste production, community equity, and exceptional agri-products."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-32 focus:ring-2 focus:ring-[#2E7D32] outline-none" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4 border-t pt-6">Meet Our Leadership</h2>
        <div className="flex gap-6 items-start mb-8">
          <div>
            {ceoImage ? (
              <div className="relative group rounded-full overflow-hidden w-32 h-32 bg-gray-100 border-4 border-gray-100 mb-2">
                <img src={ceoImage.startsWith('http') ? ceoImage : `${API_URL}${ceoImage}`} alt="CEO" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={handleDeleteCeoImage} className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700"><Trash2 size={16}/></button>
                </div>
              </div>
            ) : (
              <div onClick={() => ceoImageInputRef.current.click()} className="border-2 border-dashed border-gray-300 rounded-full w-32 h-32 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-[#2E7D32] hover:text-[#2E7D32] transition-colors mb-2">
                <Plus size={20} />
                <span className="text-xs font-bold mt-1">Add Photo</span>
              </div>
            )}
            <input type="file" accept="image/*" ref={ceoImageInputRef} onChange={handleCeoImageUpload} className="hidden" />
          </div>
          
          <div className="flex-1">
            <input id="about_ceo_name" type="text" defaultValue={siteData.about_ceo_name || "Pierre Célestin Masengesho"} className="w-full font-bold text-lg bg-gray-50 border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none" />
            <input id="about_ceo_role" type="text" defaultValue={siteData.about_ceo_role || "Founder & CEO"} className="w-full text-[#2E7D32] font-semibold bg-gray-50 border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none" />
            <textarea id="about_ceo_text" defaultValue={siteData.about_ceo_text || "A visionary agribusiness entrepreneur dedicated to regional food security, sustainable development, and rural youth empowerment."} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 h-20 text-sm focus:outline-none" />
          </div>
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            about_story: document.getElementById('about_story').value,
            about_who: document.getElementById('about_who').value,
            about_mission: document.getElementById('about_mission').value,
            about_vision: document.getElementById('about_vision').value,
            about_ceo_name: document.getElementById('about_ceo_name').value,
            about_ceo_role: document.getElementById('about_ceo_role').value,
            about_ceo_text: document.getElementById('about_ceo_text').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save About Page
          </button>
        </div>
      </section>
    </div>
  );
}

// ================= WORK MANAGER =================
function WorkManager({ onSavePage, siteData }) {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sustainable Cultivation</h2>
        <textarea id="work_sust" defaultValue={siteData.work_sust || "We cultivate a diverse range of premium crops using climate-smart techniques. Our farms are optimized to protect natural resources while maximizing output."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-8" />

        <h2 className="text-xl font-bold text-gray-900 mb-4 border-t pt-6">Our Premium Harvests</h2>
        <div className="space-y-4 mb-8">
          <div className="p-4 border rounded-xl flex gap-4 items-center bg-gray-50">
            <ImageIcon className="text-gray-400" size={32} />
            <div className="flex-1">
               <input id="work_h1_title" type="text" defaultValue={siteData.work_h1_title || "Horticulture Excellence"} className="font-bold w-full bg-transparent focus:outline-none mb-1" />
               <textarea id="work_h1_text" defaultValue={siteData.work_h1_text || "Year-round production of high-demand vegetables, including cabbages, tomatoes, eggplants, and fresh greens."} className="w-full text-sm bg-transparent resize-none focus:outline-none text-gray-500" rows={2} />
            </div>
          </div>
          <div className="p-4 border rounded-xl flex gap-4 items-center bg-gray-50">
            <ImageIcon className="text-gray-400" size={32} />
            <div className="flex-1">
               <input id="work_h2_title" type="text" defaultValue={siteData.work_h2_title || "Nursery Bed Production"} className="font-bold w-full bg-transparent focus:outline-none mb-1" />
               <textarea id="work_h2_text" defaultValue={siteData.work_h2_text || "Cultivating elite fruit varieties (avocados, lemons, and apples) alongside agroforestry trees to support environmental reforestation."} className="w-full text-sm bg-transparent resize-none focus:outline-none text-gray-500" rows={2} />
            </div>
          </div>
          <div className="p-4 border rounded-xl flex gap-4 items-center bg-gray-50">
            <ImageIcon className="text-gray-400" size={32} />
            <div className="flex-1">
               <input id="work_h3_title" type="text" defaultValue={siteData.work_h3_title || "Post-Harvest Aggregation"} className="font-bold w-full bg-transparent focus:outline-none mb-1" />
               <textarea id="work_h3_text" defaultValue={siteData.work_h3_text || "Managing a robust localized storage network designed to drastically reduce food spoilage and stabilize market supply."} className="w-full text-sm bg-transparent resize-none focus:outline-none text-gray-500" rows={2} />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4 border-t pt-6">Specialized Agribusiness Ecosystems</h2>
        <textarea id="work_eco_text" defaultValue={siteData.work_eco_text || "From climate-smart cultivation of avocado, French beans, and premium horticultural produce — to aggregation and export — PRIGE LTD manages a fully integrated value chain in Northern Rwanda."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-4" />
        
        <label className="block font-bold text-gray-900 mb-2">Key Statistics</label>
        <div className="grid grid-cols-2 gap-2 mb-8">
          <input id="work_s1" type="text" defaultValue={siteData.work_s1 || "3 Hectares Owned Farmland"} className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none" />
          <input id="work_s2" type="text" defaultValue={siteData.work_s2 || "5 Hectares Rented Farmland"} className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none" />
          <input id="work_s3" type="text" defaultValue={siteData.work_s3 || "20 Million RWF in Farm Assets"} className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none" />
          <input id="work_s4" type="text" defaultValue={siteData.work_s4 || "3 Full-time & 20 Casual Staff"} className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none" />
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            work_sust: document.getElementById('work_sust').value,
            work_h1_title: document.getElementById('work_h1_title').value,
            work_h1_text: document.getElementById('work_h1_text').value,
            work_h2_title: document.getElementById('work_h2_title').value,
            work_h2_text: document.getElementById('work_h2_text').value,
            work_h3_title: document.getElementById('work_h3_title').value,
            work_h3_text: document.getElementById('work_h3_text').value,
            work_eco_text: document.getElementById('work_eco_text').value,
            work_s1: document.getElementById('work_s1').value,
            work_s2: document.getElementById('work_s2').value,
            work_s3: document.getElementById('work_s3').value,
            work_s4: document.getElementById('work_s4').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save Work Page
          </button>
        </div>
      </section>
    </div>
  );
}

// ================= PROJECTS MANAGER =================
function ProjectsManager({ onSavePage, siteData }) {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Driving Impactful Initiatives</h2>
        <textarea id="proj_sub" defaultValue={siteData.proj_sub || "Every project we launch strengthens farmers, families, and food systems."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-6" />

        <div className="space-y-4 mb-8">
          {[
            { id: "p1", title: "The Gakenke Youth & Women Empowerment Initiative", status: "Active", obj: "Combat regional unemployment by training and employing local youth and women.", imp: "Over 50 full-time jobs created, equipping a new generation with high-income agricultural skills." },
            { id: "p2", title: "High-Tech Greenhouse Expansion", status: "Active & Expanding", obj: "Build custom, climate-resilient greenhouse infrastructures to secure stable vegetable harvests independent of unpredictable seasonal shifts.", imp: "" },
            { id: "p3", title: "Commercial Agroforestry & Orchard Development", status: "Ongoing", obj: "Distribute and plant multi-variety fruit trees across the region to boost farmer income and promote ecological health.", imp: "" }
          ].map((p, i) => (
            <div key={i} className="p-4 border border-l-4 border-l-[#2E7D32] rounded-xl bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900">{i + 1}. {p.title}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">{p.status}</span>
              </div>
              <textarea id={`proj_${p.id}_obj`} defaultValue={siteData[`proj_${p.id}_obj`] || p.obj} className="w-full bg-transparent text-sm text-gray-600 resize-none focus:outline-none mb-1" rows={2} />
              {p.imp && <textarea id={`proj_${p.id}_imp`} defaultValue={siteData[`proj_${p.id}_imp`] || p.imp} className="w-full bg-transparent text-sm text-gray-600 resize-none focus:outline-none" rows={2} />}
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            proj_sub: document.getElementById('proj_sub').value,
            proj_p1_obj: document.getElementById('proj_p1_obj').value,
            proj_p1_imp: document.getElementById('proj_p1_imp').value,
            proj_p2_obj: document.getElementById('proj_p2_obj').value,
            proj_p3_obj: document.getElementById('proj_p3_obj').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save Projects Page
          </button>
        </div>
      </section>
    </div>
  );
}

// ================= INNOVATION MANAGER =================
function InnovationManager({ onSavePage, siteData }) {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <textarea id="inno_sub" defaultValue={siteData.inno_sub || "Smart greenhouses and value-added processing that turn harvests into premium products."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-6 font-medium text-lg" />

        <div className="p-4 border border-t-4 border-t-[#2E7D32] rounded-xl mb-4 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-2">Smart Greenhouse Ecosystems</h3>
          <textarea id="inno_green_text" defaultValue={siteData.inno_green_text || "By moving beyond traditional open-field hazards, our custom-engineered greenhouses protect crops from pests and extreme weather. This ensures continuous production of sensitive crops like premium strawberries, chilis, and vanilla beans."} className="w-full bg-white border rounded-lg p-2 text-sm h-24 focus:outline-none" />
        </div>

        <div className="p-4 border border-t-4 border-t-[#81C784] rounded-xl bg-gray-50 mb-8">
          <h3 className="font-bold text-gray-900 mb-2">Value-Added Agro-Processing</h3>
          <textarea id="inno_proc_text" defaultValue={siteData.inno_proc_text || "We combat post-harvest loss by turning surplus fresh yields into premium retail consumer goods:"} className="w-full bg-white border rounded-lg p-2 text-sm h-16 focus:outline-none mb-4" />
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <input id="inno_juice_title" type="text" defaultValue={siteData.inno_juice_title || "Akeza Natural Juice"} className="font-bold bg-transparent w-full focus:outline-none mb-1" />
              <textarea id="inno_juice_text" defaultValue={siteData.inno_juice_text || "A delicious, nutrient-packed blend of carrots and strawberries, available in refreshing mango and pineapple varieties."} className="w-full bg-transparent text-xs text-gray-600 resize-none focus:outline-none" rows={2} />
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <input id="inno_paste_title" type="text" defaultValue={siteData.inno_paste_title || "Delisha Tomato Paste"} className="font-bold bg-transparent w-full focus:outline-none mb-1" />
              <textarea id="inno_paste_text" defaultValue={siteData.inno_paste_text || "Thick, rich, and locally sourced paste made from our freshly harvested greenhouse tomatoes."} className="w-full bg-transparent text-xs text-gray-600 resize-none focus:outline-none" rows={2} />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            inno_sub: document.getElementById('inno_sub').value,
            inno_green_text: document.getElementById('inno_green_text').value,
            inno_proc_text: document.getElementById('inno_proc_text').value,
            inno_juice_title: document.getElementById('inno_juice_title').value,
            inno_juice_text: document.getElementById('inno_juice_text').value,
            inno_paste_title: document.getElementById('inno_paste_title').value,
            inno_paste_text: document.getElementById('inno_paste_text').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save Innovation Page
          </button>
        </div>
      </section>
    </div>
  );
}

// ================= NEWS MANAGER =================
function NewsManager({ onSavePage, siteData }) {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <textarea id="news_sub" defaultValue={siteData.news_sub || "Stories, milestones, and wins from the PRIGE LTD family."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-6 font-medium text-lg" />

        <div className="border border-gray-200 rounded-2xl p-6 mb-6 bg-gray-50">
          <input id="news_f_badge" type="text" defaultValue={siteData.news_f_badge || "Founder's Story"} className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded w-auto mb-4 focus:outline-none" />
          <input id="news_f_title" type="text" defaultValue={siteData.news_f_title || "The Journey of Pierre Célestin Masengesho"} className="w-full font-bold text-lg mb-2 bg-transparent focus:outline-none border-b pb-1" />
          <textarea id="news_f_text" defaultValue={siteData.news_f_text || "Pierre Celestin Masengesho, a young entrepreneur from Gakenke District, Rwanda, began his agricultural journey in 2018 after leaving high school. He started by cultivating a small two-acre plot of land gifted by his parents and expanded his operations through loans from youth saving groups.\n\nOver time, he grew his farm to include three hectares of land he owns and an additional five hectares rented from neighbors. Masengesho now grows a variety of vegetables such as cabbages, cauliflowers, and beets, as well as fruits like strawberries and papayas. His farm assets are valued at 20 million Rwandan francs, and he employs three full-time staff and 20 casual workers.\n\nLooking ahead, Masengesho dreams of establishing an agricultural school called the 'Masengesho College Foundation' and a processing plant for fruits and vegetables. He credits the R-YES project and Kilimo Trust for supporting him with tools, greenhouses, and agro-processing machinery, which have been crucial to his success.\n\nHe urges other young people to recognize the value of agriculture as a key driver of Rwanda's development. Masengesho's achievements have also been recognized in several competitions, including the Youth Connect Awards, where he has earned prestigious prizes."} className="w-full bg-white border rounded-lg p-3 text-sm h-48 focus:outline-none" />
        </div>

        <div className="border border-gray-200 rounded-2xl p-6 mb-6 bg-gray-50">
          <input id="news_a_badge" type="text" defaultValue={siteData.news_a_badge || "Award · 2024"} className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded w-auto mb-4 focus:outline-none" />
          <input id="news_a_title" type="text" defaultValue={siteData.news_a_title || "PRIGE LTD Celebrates Success at the YouthConnekt Awards!"} className="w-full font-bold text-lg mb-2 bg-transparent focus:outline-none border-b pb-1" />
          <textarea id="news_a_text" defaultValue={siteData.news_a_text || "We are incredibly honored to announce that PRIGE LTD has been recognized as a provincial winner at the prestigious YouthConnekt Awards. This milestone celebrates our dedication to youth employment, sustainable innovation, and our contribution toward Rwanda's 'Zero Hunger' goal through initiatives like our Akeza Natural Juice.\n\nThis recognition belongs to our entire team of young innovators, our hard-working partner farmers, and the communities that support us across the province. By transforming surplus harvests into nutritious products, we are proving that youth-led agribusiness can drive both economic growth and food security in Rwanda.\n\nThank you to the Ministry of Youth and Arts, UNDP, and all YouthConnekt partners for empowering young entrepreneurs to build a sustainable future."} className="w-full bg-white border rounded-lg p-3 text-sm h-40 focus:outline-none" />
        </div>

        <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 mb-8">
          <input id="news_j_badge" type="text" defaultValue={siteData.news_j_badge || "Story · Products"} className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded w-auto mb-4 focus:outline-none" />
          <input id="news_j_title" type="text" defaultValue={siteData.news_j_title || "From Farm to Bottle: The Story Behind Akeza Juice"} className="w-full font-bold text-lg mb-2 bg-transparent focus:outline-none border-b pb-1" />
          <textarea id="news_j_text" defaultValue={siteData.news_j_text || "Every bottle of Akeza Natural Juice tells a story of transformation, community resilience, and a deep respect for the land. In Rwanda, vibrant hills yield some of the finest crops in East Africa, yet local farmers often face a silent challenge: food waste. Due to strict market standards for appearance and limited storage, perfectly nutritious fruits and vegetables frequently go unsold.\n\nThat is where the journey of Akeza Juice begins—turning a local challenge into a nourishing solution for families across the country.\n\nHonoring the Harvest: Sourcing Local\nThe process starts in the early morning hours on local farms. Our teams work hand-in-hand with Rwandan smallholders, harvesting crisp, earthy carrots and sun-ripened strawberries at peak flavor. By purchasing directly from these farmers—especially the produce that might be deemed 'imperfect' in shape or size for traditional markets—we provide a reliable stream of income for agricultural communities while directly cutting down on post-harvest waste.\n\nCrafting the Blend: From Field to Facility\nOnce the fresh produce arrives at our production facility, our local teams step into action. Quality control is paramount. The carrots and strawberries are thoroughly washed, inspected, and prepped using strict hygienic standards.\n\nTo preserve the dense nutritional profile of the ingredients, we utilize a process that extracts maximum flavor and vitamins without relying on artificial additives. The sweetness of the strawberries perfectly balances the earthy, nutrient-rich profile of the carrots, creating a vibrant, naturally sweet blend that requires no added sugars or artificial preservatives.\n\nNourishing Rwandan Families\nWhat goes into the bottle is 100% pure, wholesome goodness. Carrots bring a powerful dose of beta-carotene, vitamin A, and antioxidants, while strawberries infuse the juice with vitamin C and a refreshing taste that children and adults love.\n\nBy choosing Akeza Natural Juice, you are doing more than just picking up a healthy drink for your family. You are actively supporting a sustainable food ecosystem, empowering local farmers, and ensuring that the bounty of Rwanda’s soil goes exactly where it belongs: nourishing our communities."} className="w-full bg-white border rounded-lg p-3 text-sm h-64 focus:outline-none" />
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            news_sub: document.getElementById('news_sub').value,
            news_f_badge: document.getElementById('news_f_badge').value,
            news_f_title: document.getElementById('news_f_title').value,
            news_f_text: document.getElementById('news_f_text').value,
            news_a_badge: document.getElementById('news_a_badge').value,
            news_a_title: document.getElementById('news_a_title').value,
            news_a_text: document.getElementById('news_a_text').value,
            news_j_badge: document.getElementById('news_j_badge').value,
            news_j_title: document.getElementById('news_j_title').value,
            news_j_text: document.getElementById('news_j_text').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save News Page
          </button>
        </div>
      </section>
    </div>
  );
}

// ================= RESOURCES MANAGER =================
function ResourcesManager({ onSavePage, siteData }) {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <textarea id="res_sub" defaultValue={siteData.res_sub || "Agribusiness insights and resources for partners, farmers, and researchers."} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-6 font-medium text-lg" />

        <div className="space-y-4 mb-8">
          {[
            { id: "r1", title: "Sustainable Farming Guide (PDF)", desc: "Best practices for managing small-scale vegetable nurseries." },
            { id: "r2", title: "Greenhouse Farming 101", desc: "A brief overview of climate-resilient agriculture techniques used by our teams." },
            { id: "r3", title: "Our Impact Report", desc: "View the data, demographics, and metrics behind our youth and women employment initiatives in the Northern Province." }
          ].map((r, i) => (
            <div key={i} className="p-4 border rounded-xl bg-gray-50">
              <input id={`res_${r.id}_title`} type="text" defaultValue={siteData[`res_${r.id}_title`] || r.title} className="font-bold w-full bg-transparent focus:outline-none border-b border-gray-300 mb-2 pb-1" />
              <textarea id={`res_${r.id}_desc`} defaultValue={siteData[`res_${r.id}_desc`] || r.desc} className="w-full text-sm bg-transparent resize-none focus:outline-none text-gray-600" rows={2} />
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            res_sub: document.getElementById('res_sub').value,
            res_r1_title: document.getElementById('res_r1_title').value,
            res_r1_desc: document.getElementById('res_r1_desc').value,
            res_r2_title: document.getElementById('res_r2_title').value,
            res_r2_desc: document.getElementById('res_r2_desc').value,
            res_r3_title: document.getElementById('res_r3_title').value,
            res_r3_desc: document.getElementById('res_r3_desc').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save Resources Page
          </button>
        </div>
      </section>
    </div>
  );
}

// ================= CONTACT MANAGER =================
function ContactManager({ onSavePage, siteData }) {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <textarea id="contact_sub" defaultValue={siteData.contact_sub || "Whether you want to stock our retail products, tour our greenhouses, or partner on a social impact project, we would love to hear from you!"} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-[#2E7D32] outline-none mb-6 font-medium text-lg" />

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
            <input id="contact_loc" type="text" defaultValue={siteData.contact_loc || "Cyabingo Sector, Gakenke District, Northern Province, Rwanda"} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input id="contact_email" type="email" defaultValue={siteData.contact_email || "info@prigeltd.rw"} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input id="contact_phone" type="text" defaultValue={siteData.contact_phone || "+250 783 793 290"} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]" />
          </div>
        </div>

        <div className="flex justify-end border-t pt-6">
          <button onClick={() => onSavePage({
            contact_sub: document.getElementById('contact_sub').value,
            contact_loc: document.getElementById('contact_loc').value,
            contact_email: document.getElementById('contact_email').value,
            contact_phone: document.getElementById('contact_phone').value,
          })} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition">
            <Save size={18} /> Save Contact Page
          </button>
        </div>
      </section>
    </div>
  );
}