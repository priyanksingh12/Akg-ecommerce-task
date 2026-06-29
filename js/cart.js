const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

const totalItems = document.getElementById("totalItems");
const subtotal = document.getElementById("subtotal");
const shipping = document.getElementById("shipping");
const discount = document.getElementById("discount");
const grandTotal = document.getElementById("grandTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateSummary() {

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const subTotalValue = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const shippingCharge = cart.length === 0 ? 0 : 20;

    const discountValue = subTotalValue > 500 ? subTotalValue * 0.10 : 0;

    const total = subTotalValue + shippingCharge - discountValue;

    totalItems.textContent = itemCount;

    subtotal.textContent = `$${subTotalValue.toFixed(2)}`;

    shipping.textContent = `$${shippingCharge.toFixed(2)}`;

    discount.textContent = `-$${discountValue.toFixed(2)}`;

    grandTotal.textContent = `$${total.toFixed(2)}`;

    cartCount.textContent = itemCount;

}

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>Add some products to continue shopping.</p>
                <a href="index.html">Continue Shopping</a>
            </div>
        `;

        updateSummary();

        return;
    }

    cart.forEach(item => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">

            <div class="item-details">

                <h3>${item.title}</h3>

                <p class="price">$${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(div);

    });

    updateSummary();

}

function increaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (item) {

        item.quantity++;

        saveCart();

        renderCart();

    }

}

function decreaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();

    renderCart();

}

function removeItem(id) {

    cart = cart.filter(product => product.id !== id);

    saveCart();

    renderCart();

}

renderCart();