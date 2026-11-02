CREATE TABLE IF NOT EXISTS `alat_seni` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_alat` VARCHAR(255) NOT NULL,
  `jenis` VARCHAR(100) NOT NULL,
  `jumlah_unit` INT NOT NULL DEFAULT 0,
  `lokasi_penyimpanan` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `alat_seni` (`id`, `nama_alat`, `jenis`, `jumlah_unit`, `lokasi_penyimpanan`, `created_at`) VALUES
(1, 'Kanvas Lukis 40x60 cm', 'Melukis', 12, 'Rak Studio A1', '2026-11-01 14:32:01'),
(2, 'Set Cat Akrilik 24 Warna', 'Melukis', 8, 'Lemari Warna B2', '2026-11-01 14:32:01'),
(3, 'Pensil Sketsa Set (H-8B)', 'Sketsa', 20, 'Meja Utama C3', '2026-11-01 14:32:01'),
(4, 'Kuas Lukis Professional Set', 'Melukis', 15, 'Rak Studio A2', '2026-11-01 14:32:01'),
(5, 'Buku Sketsa A5', 'Sketsa', 25, 'Rak Kertas B1', '2026-11-01 14:32:01'),
(6, 'Glue Gun / Lem Tembak', 'Kerajinan', 6, 'Kotak Alat 02', '2026-11-01 14:32:01'),
(7, 'Brush Pen Set 12 Warna', 'Kaligrafi', 10, 'Etalase Depan', '2026-11-01 14:32:01');
