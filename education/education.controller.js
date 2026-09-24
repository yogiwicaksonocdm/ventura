// education/education.controller.js

// Contoh data dummy program edukasi UMKM (bisa diganti query database)
const educationPrograms = [
    {
        id: 1,
        title: "Kelas Digital Marketing & Social Media Branding",
        category: "Digital Marketing",
        description: "Pelajari cara optimasi Instagram & TikTok untuk melipatgandakan omzet UMKM.",
        duration: "4 Minggu",
        mentor: "Yogi Wicaksono",
        price: 0, // Gratis / Bersponsor
        status: "Open"
    },
    {
        id: 2,
        title: "Akademi Pembukuan Keuangan UMKM (Sadari Kas)",
        category: "Manajemen Keuangan",
        description: "Praktik langsung memisahkan keuangan pribadi & bisnis serta hitung HPP akurat.",
        duration: "2 Minggu",
        mentor: "Tim Ventura Indonesia",
        price: 150000,
        status: "Open"
    },
    {
        id: 3,
        title: "Inkubator Bisnis & Pembuatan Landing Page Usaha",
        category: "Teknologi & Bisnis",
        description: "Membuat aset digital mandiri agar bisnis UMKM mudah ditemukan secara online.",
        duration: "6 Minggu",
        mentor: "Tim Ventura Indonesia",
        price: 300000,
        status: "Coming Soon"
    }
];

// Mendapatkan semua daftar program edukasi
exports.getAllPrograms = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Berhasil mengambil data program edukasi UMKM",
            data: educationPrograms
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Mendapatkan detail program berdasarkan ID
exports.getProgramById = async (req, res) => {
    try {
        const { id } = req.params;
        const program = educationPrograms.find(p => p.id === parseInt(id));

        if (!program) {
            return res.status(404).json({ success: false, message: "Program edukasi tidak ditemukan" });
        }

        res.status(200).json({
            success: true,
            data: program
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Pendaftaran peserta UMKM ke program
exports.registerProgram = async (req, res) => {
    try {
        const { programId, participantName, businessName, whatsapp } = req.body;

        if (!programId || !participantName || !whatsapp) {
            return res.status(400).json({ 
                success: false, 
                message: "Mohon lengkapi data: programId, participantName, dan whatsapp." 
            });
        }

        // Simulasi simpan ke database
        const newRegistration = {
            id: Date.now(),
            programId,
            participantName,
            businessName: businessName || "-",
            whatsapp,
            registeredAt: new Date().toISOString()
        };

        res.status(201).json({
            success: true,
            message: "Pendaftaran program edukasi berhasil!",
            data: newRegistration
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};