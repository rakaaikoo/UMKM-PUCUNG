const adminForm = document.getElementById('admin-form');
const adminList = document.getElementById('admin-list');
const resetButton = document.getElementById('reset-admin');
const umkmIdInput = document.getElementById('umkm-id');
const API_URL = 'api/umkm.php';

let umkmData = [];

function renderAdminTable() {
  adminList.innerHTML = '';
  umkmData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.product}</td>
      <td>
        <button type="button" data-action="edit" data-id="${item.id}">Edit</button>
        <button type="button" data-action="delete" data-id="${item.id}">Hapus</button>
      </td>
    `;
    adminList.appendChild(row);
  });
}

function loadData() {
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal memuat data admin');
      }
      return response.json();
    })
    .then(data => {
      umkmData = Array.isArray(data) ? data : [];
      renderAdminTable();
    })
    .catch(error => {
      console.error('Gagal memuat data admin:', error);
      alert('Tidak dapat memuat data UMKM. Pastikan backend PHP sudah berjalan.');
    });
}

function resetForm() {
  adminForm.reset();
  umkmIdInput.value = '';
}

function fillForm(item) {
  document.getElementById('admin-name').value = item.name;
  document.getElementById('admin-product').value = item.product;
  document.getElementById('admin-description').value = item.description;
  document.getElementById('admin-contact').value = item.contact;
  document.getElementById('admin-address').value = item.address;
  document.getElementById('admin-lat').value = item.latitude;
  document.getElementById('admin-lng').value = item.longitude;
  document.getElementById('admin-category').value = item.category;
  umkmIdInput.value = item.id;
}

function requestApi(method, payload = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  return fetch(API_URL, options).then(response => {
    if (!response.ok) {
      return response.json().then(body => {
        throw new Error(body.error || 'Request gagal');
      });
    }
    return response.json();
  });
}

adminForm.addEventListener('submit', event => {
  event.preventDefault();
  const id = umkmIdInput.value;
  const item = {
    id: id || undefined,
    name: document.getElementById('admin-name').value.trim(),
    product: document.getElementById('admin-product').value.trim(),
    description: document.getElementById('admin-description').value.trim(),
    contact: document.getElementById('admin-contact').value.trim(),
    address: document.getElementById('admin-address').value.trim(),
    latitude: parseFloat(document.getElementById('admin-lat').value),
    longitude: parseFloat(document.getElementById('admin-lng').value),
    category: document.getElementById('admin-category').value.trim(),
  };

  const method = id ? 'PUT' : 'POST';
  requestApi(method, item)
    .then(() => {
      resetForm();
      loadData();
    })
    .catch(error => {
      console.error('Gagal menyimpan UMKM:', error);
      alert(error.message);
    });
});

adminList.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') return;
  const id = event.target.dataset.id;
  const action = event.target.dataset.action;
  const item = umkmData.find(entry => entry.id === id);
  if (!item) return;

  if (action === 'edit') {
    fillForm(item);
  }

  if (action === 'delete') {
    if (!confirm('Hapus UMKM ini?')) return;
    fetch(`${API_URL}?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        loadData();
      })
      .catch(error => {
        console.error('Gagal menghapus UMKM:', error);
        alert('Gagal menghapus UMKM.');
      });
  }
});

resetButton.addEventListener('click', resetForm);
loadData();