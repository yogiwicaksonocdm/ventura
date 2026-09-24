const express = require('express');
const app = express();
const path = require('path');

// Set EJS sebagai template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Sajikan file statis (seperti gambar, CSS, JS) dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Modul UMKM Booster: halaman dan aset legacy diakses melalui Express.
const umkmBoosterPath = path.join(__dirname, 'umkmbooster');
app.use('/umkmbooster', express.static(umkmBoosterPath));

// Kamus Terjemahan
const translations = {
    "nav_home": { "id": "Beranda", "en": "Home" },
    "nav_about": { "id": "Tentang Kami", "en": "About Us" },
    "nav_services": { "id": "Layanan", "en": "Services" },
    "nav_vision": { "id": "Visi & Misi", "en": "Vision & Mission" },
    "nav_consult": { "id": "Konsultasi", "en": "Consultation" },
    
    "hero_tag": { "id": "Ekosistem Digital UMKM Nasional", "en": "National MSME Digital Ecosystem" },
    "hero_title": { "id": "Akselerasi Pertumbuhan UMKM Melalui Inovasi Digital dan Pendidikan Berkelanjutan.", "en": "Accelerating MSME Growth Through Digital Innovation and Continuous Education." },
    "hero_desc": { "id": "Ventura Indonesia hadir sebagai wadah strategis dan ekosistem terpadu yang mendampingi pelaku usaha lokal untuk bertransformasi, berdaya saing tinggi, dan mandiri secara digital di era modern.", "en": "Ventura Indonesia serves as a strategic platform and integrated ecosystem guiding local businesses to transform, become highly competitive, and achieve digital independence in the modern era." },
    "hero_title_2": { "id": "Pendampingan dan Edukasi Berkelanjutan", "en": "Continuous Mentoring and Education" },
    "hero_desc_2": { "id": "Kami mendampingi setiap langkah perjalanan UMKM melalui edukasi praktis, konsultasi strategis, dan kolaborasi berkelanjutan.", "en": "We support every step of an MSME's journey through practical education, strategic consultation, and continuous collaboration." },
    "hero_btn1": { "id": "Jelajahi Program Kami", "en": "Explore Our Programs" },
    "hero_btn2": { "id": "Bergabung Bersama Mitra", "en": "Join as a Partner" },
    
    "about_title": { "id": "Tentang Kami", "en": "About Us" },
    "about_p1": { "id": "Ventura Indonesia lahir dari sebuah keyakinan bahwa kekuatan ekonomi bangsa berakar dari ketangguhan para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM).", "en": "Ventura Indonesia was born from the belief that the nation's economic strength is rooted in the resilience of Micro, Small, and Medium Enterprises (MSMEs)." },
    "about_p2": { "id": "Sebagai rumah besar inovasi, kami memadukan pendidikan kewirausahaan berbasis digital dengan solusi teknologi praktis.", "en": "As a great house of innovation, we combine digital entrepreneurship education with practical technology solutions." },
    
    "service_title": { "id": "Pilar Utama Layanan", "en": "Core Service Pillars" },
    "service_desc": { "id": "Kami fokus pada tiga pilar utama untuk memastikan setiap UMKM binaan mengalami pertumbuhan yang signifikan.", "en": "We focus on three main pillars to ensure every guided MSME experiences significant growth." },
    "service_1_title": { "id": "1. Edukasi & Pelatihan Teknopreneur", "en": "1. Technopreneur Education & Training" },
    "service_1_desc": { "id": "Program pelatihan bisnis berbasis digital yang dirancang aplikatif.", "en": "Digital-based business training programs designed to be applicable." },
    "service_2_title": { "id": "2. Pendampingan & Inkubasi Bisnis", "en": "2. Business Mentoring & Incubation" },
    "service_2_desc": { "id": "Ruang konsultasi dan kolaborasi strategis bersama para mentor berpengalaman.", "en": "A strategic consultation and collaboration space with experienced mentors." },
    "service_3_title": { "id": "3. Solusi & Infrastruktur Digital", "en": "3. Digital Solutions & Infrastructure" },
    "service_3_desc": { "id": "Layanan teknis terintegrasi yang menjembatani UMKM untuk go-digital secara instan.", "en": "Integrated technical services that bridge MSMEs to go digital instantly." },
    
    "vision_title": { "id": "Visi Kami", "en": "Our Vision" },
    "vision_desc": { "id": "Menjadi penggerak utama dalam melahirkan jutaan UMKM Indonesia yang tangguh, inovatif, dan mandiri secara digital pada tahun 2030.", "en": "To be the main driving force in creating millions of resilient, innovative, and digitally independent Indonesian MSMEs by 2030." },
    
    "mission_title": { "id": "Misi Kami", "en": "Our Mission" },
    "mission_1": { "id": "Menyediakan akses pendidikan dan pelatihan bisnis digital yang merata.", "en": "Provide equitable and high-quality access to digital business education." },
    "mission_2": { "id": "Mengembangkan teknologi dan sarana digital praktis.", "en": "Develop practical digital technology and tools." },
    "mission_3": { "id": "Membangun jejaring kolaborasi yang kuat.", "en": "Build a strong collaboration network." },
    
    "cta_title": { "id": "Siap Membawa Bisnis Anda ke Level Berikutnya?", "en": "Ready to Take Your Business to the Next Level?" },
    "cta_desc": { "id": "Mari bertumbuh, berinovasi, dan mendobrak batas.", "en": "Let's grow, innovate, and break boundaries together." },
    "cta_btn": { "id": "Konsultasikan Bisnis Anda Sekarang", "en": "Consult Your Business Now" },
    "footer_text": { "id": "&copy; 2026 Ventura Indonesia. Ekosistem Digital UMKM Nasional.", "en": "&copy; 2026 Ventura Indonesia. National MSME Digital Ecosystem." }
};

// Helper function untuk mengambil teks berdasarkan bahasa
const t = (key, lang) => translations[key][lang] || translations[key]['id'];

// Route utama
app.get('/', (req, res) => {
    // Ambil bahasa dari query URL (?lang=en), default ke 'id'
    const currentLang = req.query.lang === 'en' ? 'en' : 'id';
    
    // Render file views/index.ejs dan kirim data bahasa
    res.render('index', { 
        lang: currentLang,
        t: (key) => t(key, currentLang)
    });
});

app.get('/umkmbooster', (req, res) => {
    res.redirect('/umkmbooster/');
});

app.get('/umkmbooster/', (req, res) => {
    res.sendFile(path.join(umkmBoosterPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});