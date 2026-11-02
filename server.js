const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Konfigurasi koneksi database menggunakan pool (menghubungkan ke db_tugas_pemweb)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_tugas_pemweb'
});

// Middleware penting
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// --- RUTE APLIKASI ---

// 1. READ (Menampilkan data & pencarian)
app.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const query = 'SELECT * FROM alat_seni WHERE nama_alat LIKE ? ORDER BY id DESC';
        const [rows] = await pool.execute(query, [`%${search}%`]);
        res.render('index', { alatList: rows, search });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server / database.');
    }
});

// Rute untuk membuka form TAMBAH data (Sesuai href="/tambah" di index.ejs)
app.get('/tambah', (req, res) => {
    res.render('form', { alat: null });
});

// 2. CREATE (Proses menyimpan data baru)
app.post('/alat', async (req, res) => {
    try {
        const { nama_alat, jenis, jumlah_unit, lokasi_penyimpanan } = req.body;
        const query = 'INSERT INTO alat_seni (nama_alat, jenis, jumlah_unit, lokasi_penyimpanan) VALUES (?, ?, ?, ?)';
        await pool.execute(query, [nama_alat, jenis, jumlah_unit, lokasi_penyimpanan]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal menambah data.');
    }
});

// Rute untuk membuka form EDIT data berdasarkan ID (Sesuai href="/edit/:id" di index.ejs)
app.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute('SELECT * FROM alat_seni WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Data tidak ditemukan.');
        }
        res.render('form', { alat: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal memuat halaman edit.');
    }
});

// 3. UPDATE (Proses mengubah data berdasarkan ID)
app.post('/alat/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_alat, jenis, jumlah_unit, lokasi_penyimpanan } = req.body;
        const query = 'UPDATE alat_seni SET nama_alat = ?, jenis = ?, jumlah_unit = ?, lokasi_penyimpanan = ? WHERE id = ?';
        await pool.execute(query, [nama_alat, jenis, jumlah_unit, lokasi_penyimpanan, id]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal memperbarui data.');
    }
});

// 4. DELETE (Proses menghapus data berdasarkan ID)
app.post('/alat/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM alat_seni WHERE id = ?';
        await pool.execute(query, [id]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal menghapus data.');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server ArtCraft Studio berjalan di http://localhost:${port}`);
});