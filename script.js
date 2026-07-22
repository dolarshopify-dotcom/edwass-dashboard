const prices = {
  "الجزائر": 600,
  "وهران": 700,
  "سطيف": 500,
  "قسنطينة": 550
};

const wilaya = document.getElementById("wilaya");
const deliveryPrice = document.getElementById("deliveryPrice");

wilaya.addEventListener("change", function () {
  const price = prices[this.value] || 0;
  deliveryPrice.textContent = price;
});
