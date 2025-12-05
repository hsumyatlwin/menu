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

/****************************************************

 *   注文を確定して thanks.html へ

 ****************************************************/

function confirmOrder() {

    if (cart.length === 0) {

        alert("カートが空です。");

        return;

    }

    // 注文情報を保存して次のページへ

    localStorage.setItem("order", JSON.stringify(cart));

    // カートを空にする

    cart = [];

    saveCart();

    window.location.href = "thanks.html";

}

/****************************************************

 *   注文完了ページ：注文情報を表示

 ****************************************************/

function showOrderSummary() {

    let orderData = localStorage.getItem("order");

    let area = document.getElementById("order-summary");

    if (!orderData) {

        area.innerHTML = "<p>注文データがありません。</p>";

        return;

    }

    let order = JSON.parse(orderData);

    let total = 0;

    let html = "<h2>注文内容</h2>";

    order.forEach(item => {

        html += `
<p>${item.name} × ${item.quantity}　＝ ¥${item.price * item.quantity}</p>

        `;

        total += item.price * item.quantity;

    });

    html += `<h3>合計金額：¥${total}</h3>`;

    area.innerHTML = html;

}
 