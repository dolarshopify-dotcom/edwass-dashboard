document.querySelector('.order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // رسالة نجاح مؤقتة عند الضغط على تأكيد الطلب
    alert('تم إرسال طلبك بنجاح! سنتصل بك قريباً لتأكيد التوصيل.');
    
    // إعادة تعيين الحقول
    this.reset();
});
