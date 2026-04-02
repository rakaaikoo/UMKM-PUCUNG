-- Buat database dan tabel untuk UMKM Desa Pucung
CREATE DATABASE IF NOT EXISTS umkm_pucung CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE umkm_pucung;

CREATE TABLE IF NOT EXISTS umkm (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  contact VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,6) NOT NULL,
  longitude DECIMAL(10,6) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO umkm (id, name, product, description, contact, address, latitude, longitude, category) VALUES
('umkm-001', 'Kue Tradisional Pucung', 'Nagasari & Kue Lapis', 'Menyediakan kue tradisional segar dengan bahan lokal. Cocok untuk oleh-oleh dan acara keluarga.', '0812-3456-7890', 'Jalan Raya Pucung No. 12', -7.398623, 110.598712, 'Kuliner'),
('umkm-002', 'Kerajinan Anyaman Pucung', 'Tas Anyaman & Hiasan Dinding', 'Karya kerajinan tangan dari bahan rotan dan bambu. Produk ramah lingkungan dan unik.', '0813-9876-5432', 'Dusun 3 Desa Pucung', -7.402120, 110.605330, 'Kerajinan'),
('umkm-003', 'Agro Herbal Pucung', 'Teh Herbal & Minyak Atsiri', 'Produk herbal berbahan alami desa Pucung untuk kesehatan dan kecantikan.', '0812-1111-2222', 'RT 02 RW 01 Desa Pucung', -7.401200, 110.603800, 'Herbal'),
('umkm-004', 'Warung Makan Ibu Sari', 'Nasi Pecel & Sego Gudeg', 'Warung makan rumahan yang menyajikan kuliner khas desa dengan cita rasa autentik.', '0812-2222-3333', 'Simpang Lima Desa Pucung', -7.399900, 110.600500, 'Kuliner');
