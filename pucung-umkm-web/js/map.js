const mapContainer = document.getElementById('map');
const umkmList = document.getElementById('umkm-list');
const API_URL = 'api/umkm.php';

const map = L.map(mapContainer).setView([-7.400, 110.600], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19,
}).addTo(map);

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Gagal memuat data UMKM dari server');
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data)) return;
    data.forEach(item => {
      const marker = L.marker([item.latitude, item.longitude]).addTo(map);
      const popupContent = `
        <strong>${item.name}</strong><br />
        ${item.product}<br />
        <a href="detail.html?id=${item.id}">Lihat detail</a>
      `;
      marker.bindPopup(popupContent);

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${item.name}</strong><br />
        ${item.product}<br />
        <button type="button" data-id="${item.id}">Tampilkan di peta</button>
      `;
      umkmList.appendChild(listItem);
      listItem.querySelector('button').addEventListener('click', () => {
        map.setView([item.latitude, item.longitude], 17);
        marker.openPopup();
      });
    });
  })
  .catch(error => {
    console.error('Gagal memuat data UMKM:', error);
  });

function geocodeAddress(address) {
  const url = `api/geocode.php?address=${encodeURIComponent(address)}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      if (result.lat && result.lng) {
        return {
          lat: result.lat,
          lng: result.lng,
        };
      }
      throw new Error('Geocoding gagal');
    });
}

window.geocodeAddress = geocodeAddress;