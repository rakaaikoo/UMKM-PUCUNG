const params = new URLSearchParams(window.location.search);
const umkmId = params.get('id');
const nameEl = document.getElementById('umkm-name');
const descEl = document.getElementById('umkm-description');
const productEl = document.getElementById('umkm-product');
const contactEl = document.getElementById('umkm-contact');
const addressEl = document.getElementById('umkm-address');
const categoryEl = document.getElementById('umkm-category');

if (!umkmId) {
  nameEl.textContent = 'Data UMKM tidak ditemukan.';
  descEl.textContent = 'Pastikan parameter id dikirim melalui URL.';
}

fetch(`api/umkm.php?id=${encodeURIComponent(umkmId)}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('UMKM tidak ditemukan');
    }
    return response.json();
  })
  .then(umkm => {
    nameEl.textContent = umkm.name;
    descEl.textContent = umkm.description;
    productEl.textContent = umkm.product;
    contactEl.textContent = umkm.contact;
    addressEl.textContent = umkm.address;
    categoryEl.textContent = umkm.category;
  })
  .catch(error => {
    console.error('Error saat memuat detail UMKM:', error);
    nameEl.textContent = 'Terjadi kesalahan saat memuat data.';
  });