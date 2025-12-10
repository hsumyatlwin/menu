let cart = [];

window.onload = function () {
    loadCart();
    updateCartCount();
};

function addToCart(id, name, price) {
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    } else {
     cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    alert(name + " をカートに追加しました！");
}
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

}
function loadCart() {
    let data = localStorage.getItem("cart");
    if (data) {
        cart = JSON.parse(data);
    }
}
function updateCartCount() {
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.quantity;
    });

    document.getElementById("cart-count").textContent = totalCount;

}
function goToCart() {
    window.location.href = "cart.html";
}
function renderCartItems() {
    loadCart();
    let list = document.getElementById("cart-list");
    let totalArea = document.getElementById("total-price");
    list.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        let row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
                        <div class="cart-name">${item.name}</div>
                        <div class="cart-qty">
                        <button onclick="decreaseQty(${item.id})">－</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQty(${item.id})">＋</button>
                        </div>
                        <div class="cart-price">¥${item.price * item.quantity}</div>
                        <button class="delete-btn" onclick="deleteItem(${item.id})">削除</button>
                        `;

        list.appendChild(row);
        total += item.price * item.quantity;
    });
    totalArea.textContent = "合計：¥" + total;
}
function increaseQty(id) {
    let item = cart.find(p => p.id === id);
    if (item) {
        item.quantity++;
    }
    saveCart();
    renderCartItems();
    updateCartCount();

}
function decreaseQty(id) {
    let item = cart.find(p => p.id === id);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            deleteItem(id);
            return;
        }
    }
    saveCart();
    renderCartItems();
    updateCartCount();
}
function deleteItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCartItems();
    updateCartCount();

}
function confirmOrder() {
    if (cart.length === 0) {
        alert("カートが空です。");
        return;
    }
    localStorage.setItem("order", JSON.stringify(cart));
    cart = [];
    saveCart();
    window.location.href = "thanks.html";
}
 