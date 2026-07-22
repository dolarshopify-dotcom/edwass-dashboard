// أسعار التوصيل والبلديات لكل ولاية (يمكنك تعديلها حسب رغبتك)
const deliveryData = {
    "alger": { home: 500, desk: 300, baladiyas: ["الجزائر الوسطى", "سيدي أمحمد", "باب الوادي", "بوزريعة", "الدار البيضاء"] },
    "oran": { home: 600, desk: 400, baladiyas: ["وهران", "السانية", "بئر الجير", "أرزيو"] },
    "blida": { home: 400, desk: 250, baladiyas: ["البليدة", "بوفاريك", "العريشة", "الصومعة"] },
    "constantine": { home: 600, desk: 400, baladiyas: ["قسنطينة", "الخروب", "حامة بوزيان"] }
};

const baseProductPrice = 2000; // قم بتغيير هذا إلى سعر منتجك الحقيقي

function updateDeliveryOptions() {
    const wilayaSelect = document.getElementById("wilaya");
    const baladiyaSelect = document.getElementById("baladiya");
    
    const selectedWilaya = wilayaSelect.value;
    
    // إعادة تعيين البلديات
    baladiyaSelect.innerHTML = '<option value="">-- اختر البلدية --</option>';
    
    if (selectedWilaya && deliveryData[selectedWilaya]) {
        deliveryData[selectedWilaya].baladiyas.forEach(baladiya => {
            const option = document.createElement("option");
            option.value = baladiya;
            option.textContent = baladiya;
            baladiyaSelect.appendChild(option);
        });
    }
    calculateTotal();
}

function calculateTotal() {
    const wilaya = document.getElementById("wilaya").value;
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    
    let shippingPrice = 0;
    
    if (wilaya && deliveryData[wilaya]) {
        shippingPrice = deliveryData[wilaya][deliveryType];
    }
    
    document.getElementById("productPrice").textContent = baseProductPrice;
    document.getElementById("shippingPrice").textContent = shippingPrice;
    document.getElementById("totalPrice").textContent = baseProductPrice + shippingPrice;
}

function scrollToForm() {
    document.getElementById("orderForm").scrollIntoView({ behavior: 'smooth' });
}

function handleOrderSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const wilaya = document.getElementById("wilaya").options[document.getElementById("wilaya").selectedIndex].text;
    const baladiya = document.getElementById("baladiya").value;
    const total = document.getElementById("totalPrice").textContent;

    if (!name || !phone || !wilaya || !baladiya) {
        alert("الرجاء ملء جميع الحقول الإجبارية!");
        return;
    }

    // رسالة نجاح مؤقتة (يمكنك ربطها بـ Backend أو تخزينها محلياً كما ترغب)
    alert(🎉 مبروك يا ${name}! تم تسجيل طلبك بنجاح بمبلغ ${total} دج نحو ولاية ${wilaya}. سنتصل بك قريباً للتأكيد.);
    document.getElementById("orderForm").reset();
    calculateTotal();
}
