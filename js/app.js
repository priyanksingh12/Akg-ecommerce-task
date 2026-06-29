const productContainer = document.getElementById("productContainer");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");

let products = [];

async function fetchProducts() {
    try {
        loading.style.display = "block";
        productContainer.innerHTML = "";

        const response = await fetch("https://dummyjson.com/products?limit=194");
        const data = await response.json();

        products = data.products;

        loading.style.display = "none";

        displayProducts(products);
    } catch (error) {
        loading.innerHTML = "Failed to load products.";
    }
}

function displayProducts(items) {

    productContainer.innerHTML = "";

    if (items.length === 0) {
        productContainer.innerHTML = `
            <div class="no-products">
                No products found.
            </div>
        `;
        return;
    }

    items.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>

            <div class="product-details">

                <h3 class="product-title">${product.title}</h3>

                <p class="product-brand">
                    ${product.brand}
                </p>

                <p class="product-rating">
                    ⭐ ${product.rating}
                </p>

                <p class="product-price">
                    $${product.price}
                </p>

                <a
                    href="product.html?id=${product.id}"
                    class="product-btn"
                >
                    View Details
                </a>

            </div>
        `;

        productContainer.appendChild(card);

    });

}

searchInput.addEventListener("input", e => {

    const value = e.target.value.toLowerCase().trim();

    const filteredProducts = products.filter(product =>

        product.title.toLowerCase().includes(value) ||

        product.brand.toLowerCase().includes(value) ||

        product.category.toLowerCase().includes(value)

    );

    displayProducts(filteredProducts);

});

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, item) => {

        return sum + item.quantity;

    }, 0);

    cartCount.textContent = totalItems;

}

fetchProducts();

updateCartCount();