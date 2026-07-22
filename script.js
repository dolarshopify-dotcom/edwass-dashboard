// جلب الإعدادات المحفوظة من لوحة التحكم أو استخدام القيم الافتراضية
const defaultSettings = {
    productName: "EDWASS - Hoodie Pro",
    productPrice: 3000,
    homeDeliveryPrice: 400,
    stopDeskPrice: 200
};

let settings = JSON.parse(localStorage.getItem('store_settings')) || defaultSettings;

document.addEventListener("DOMContentLoaded", () => {
    // 1. تحديث اسم السلعة والسعر في الصفحة الرئيسية إذا توفرت العناصر
    const titleEl = document.querySelector("h1, h2, .product-title");
    if(titleEl && settings.productName) {
        titleEl.innerText = settings.productName;
    }

    // عرض سعر المنتج الأساسي
    const priceEl = document.querySelector(".product-price");
    if(priceEl) {
        priceEl.innerText = settings.productPrice + " دج";
    }

    // تحديث أسعار الشحن المكتوبة بجانب خيارات التوصيل (إن وجدت)
    const homeText = document.querySelector(".home-delivery-text");
    if(homeText) homeText.innerText = settings.homeDeliveryPrice + " دج";

    const stopText = document.querySelector(".stop-desk-text");
    if(stopText) stopText.innerText = settings.stopDeskPrice + " دج";

    // حساب المجموع لأول مرة
    updateTotal();

    // مراقبة تغيير خيار التوصيل لتحديث المجموع فوراً
    const deliveryInputs = document.querySelectorAll('input[name="delivery"]');
    deliveryInputs.forEach(input => {
        input.addEventListener('change', updateTotal);
    });

    // ربط نموذج الطلب بزر التأكيد
    const orderForm = document.querySelector('form');
    if(orderForm && !orderForm.id.includes('settings')) {
        orderForm.addEventListener('submit', submitOrder);
    }
});

// دالة حساب المجموع الإجمالي ديناميكياً
function updateTotal() {
    const deliveryType = document.querySelector('input[name="delivery"]:checked');
    let deliveryCost = settings.homeDeliveryPrice; // الافتراضي توصيل منزل
    
    if (deliveryType) {
        // إذا كان الخيار الثاني أو يحتوي على قيمة مكتب
        if (deliveryType.value === 'stop_desk' || deliveryType.parentElement.innerText.includes('مكتب') || deliveryType.id.includes('stop')) {
            deliveryCost = settings.stopDeskPrice;
        }
    }
    
    const total = Number(settings.productPrice) + Number(deliveryCost);
    const totalEl = document.querySelector(".total-price");
    if(totalEl) {
        totalEl.innerText = total + " دح";
    }
}

// دالة تسجيل الطلب وإرساله للوحة التحكم
function submitOrder(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('customer-name') || document.querySelector('input[name="name"]');
    const phoneInput = document.getElementById('customer-phone') || document.querySelector('input[name="phone"]');
    const wilayaInput = document.getElementById('customer-wilaya') || document.querySelector('select');
    const addressInput = document.getElementById('customer-address') || document.querySelector('input[name="address"]');
    const deliveryType = document.querySelector('input[name="delivery"]:checked');

    const order = {
        id: Date.now(),
        name: nameInput ? nameInput.value : "غير محدد",
        phone: phoneInput ? phoneInput.value : "غير محدد",
        wilaya: wilayaInput ? wilayaInput.value : "غير محدد",
        address: addressInput ? addressInput.value : "غير محدد",
        deliveryType: deliveryType ? deliveryType.parentElement.innerText : "توصيل منزل",
        total: document.querySelector(".total-price") ? document.querySelector(".total-price").innerText : settings.productPrice + " دح",
        date: new Date().toLocaleDateString('ar-DZ') + ' ' + new Date().toLocaleTimeString()
    };

    let orders = JSON.parse(localStorage.getItem('store_orders')) || [];
    orders.unshift(order);
    localStorage.setItem('store_orders', JSON.stringify(orders));

    alert("تم تأكيد طلبك بنجاح! شكراً لك.");
    window.location.reload();
}
