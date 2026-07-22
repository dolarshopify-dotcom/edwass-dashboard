// جلب إعدادات المتجر أو وضع الإعدادات الافتراضية
const defaultSettings = {
    productName: "EDWASS - Hoodie Pro",
    productPrice: 4100,
    homeDeliveryPrice: 600,
    stopDeskPrice: 400
};

let settings = JSON.parse(localStorage.getItem('store_settings')) || defaultSettings;

// تطبيق الإعدادات على الصفحة الرئيسية تلقائياً
document.addEventListener("DOMContentLoaded", () => {
    // تحديث السعر والعنوان إذا كانت العناصر موجودة
    const titleEl = document.querySelector(".product-title");
    if(titleEl) titleEl.innerText = settings.productName;
    
    updateTotal();
});

// حساب المجموع بناءً على طريقة التوصيل المتاحة
function updateTotal() {
    const deliveryType = document.querySelector('input[name="delivery"]:checked');
    let deliveryCost = 600; // افتدري
    if (deliveryType && deliveryType.value === 'stop_desk') {
        deliveryCost = settings.stopDeskPrice;
    } else {
        deliveryCost = settings.homeDeliveryPrice;
    }
    
    const total = settings.productPrice + deliveryCost;
    const totalEl = document.querySelector(".total-price");
    if(totalEl) totalEl.innerText = total + " دح";
}

// حفظ الطلب عند الضغط على تأكيد الطلب
function submitOrder(event) {
    event.preventDefault();
    
    const order = {
        id: Date.now(),
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        wilaya: document.getElementById('customer-wilaya').value,
        address: document.getElementById('customer-address').value,
        deliveryType: document.querySelector('input[name="delivery"]:checked').value,
        total: document.querySelector(".total-price").innerText,
        date: new Date().toLocaleString()
    };

    // جلب الطلبات السابقة وإضافة الطلب الجديد
    let orders = JSON.parse(localStorage.getItem('store_orders')) || [];
    orders.unshift(order);
    localStorage.setItem('store_orders', JSON.stringify(orders));

    alert("تم تأكيد طلبك بنجاح! شكراً لك.");
    window.location.reload();
}
