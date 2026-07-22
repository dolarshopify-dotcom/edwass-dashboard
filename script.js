.delivery-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.delivery-card {
    display: flex;
    align-items: center;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #fff;
}

.delivery-card input[type="radio"] {
    margin-left: 10px;
    accent-color: #10b981;
    width: 18px;
    height: 18px;
}

.delivery-card:hover {
    border-color: #10b981;
    background-color: #f0fdf4;
}

.delivery-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
}

.delivery-price {
    color: #059669;
}

.total-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f5f9;
    padding: 12px 15px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #0f172a;
    margin-bottom: 15px;
    border: 1px dashed #94a3b8;
}

#total-price {
    color: #059669;
    font-size: 18px;
}
