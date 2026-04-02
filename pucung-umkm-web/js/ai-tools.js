const form = document.getElementById('marketing-form');
const output = document.getElementById('caption-output');

function createCaption({ businessName, productName, productBenefit }) {
  const benefits = productBenefit.trim() || 'kualitas terbaik dan harga bersaing';
  return `✨ Promo Spesial dari ${businessName}! ✨\n\nNikmati ${productName} dengan ${benefits}. Cocok untuk acara keluarga, oleh-oleh, atau kebutuhan harian.\n\nPesan sekarang dan tingkatkan cita rasa usaha lokal Desa Pucung!\n\n📍 Hubungi: ${businessName} siap melayani pesanan Anda.`;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const businessName = document.getElementById('business-name').value.trim();
  const productName = document.getElementById('product-name').value.trim();
  const productBenefit = document.getElementById('product-benefit').value.trim();

  if (!businessName || !productName) {
    output.textContent = 'Silakan isi nama UMKM dan nama produk terlebih dahulu.';
    return;
  }

  const caption = createCaption({ businessName, productName, productBenefit });
  output.textContent = caption;
});