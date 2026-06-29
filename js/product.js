const productContainer = document.getElementById("productContainer");
const loading = document.getElementById("loading");
const cartCount = document.getElementById("cartCount");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function fetchProduct() {

    try{

        const response = await fetch(`https://dummyjson.com/products/${productId}`);

        const product = await response.json();

        loading.style.display = "none";

        displayProduct(product);

    }

    catch{

        loading.innerHTML = "Failed to load product.";

    }

}

function displayProduct(product){

    productContainer.innerHTML = `

        <div class="product">

            <img src="${product.thumbnail}" alt="${product.title}">

            <div class="details">

                <h1>${product.title}</h1>

                <p class="brand">
                    Brand : ${product.brand}
                </p>

                <p>
                    Category : ${product.category}
                </p>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <p class="price">
                    $${product.price}
                </p>

                <p class="discount">
                    ${product.discountPercentage}% OFF
                </p>

                <p>
                    Stock : ${product.stock}
                </p>

                <p class="description">
                    ${product.description}
                </p>

                <button id="addToCart">
                    Add To Cart
                </button>

            </div>

        </div>

    `;

    document
    .getElementById("addToCart")
    .addEventListener("click",()=>{

        addToCart(product);

    });

}

function addToCart(product){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item=>item.id===product.id);

    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            id:product.id,
            title:product.title,
            price:product.price,
            thumbnail:product.thumbnail,
            quantity:1

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    alert("Product added to cart.");

}

function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce((sum,item)=>{

        return sum + item.quantity;

    },0);

    cartCount.textContent = total;

}

fetchProduct();

updateCartCount();