
let products = [];

let cart = [];


// Load Products From JSON File

async function loadProducts() {

    try {

        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        products = await response.json();

        displayProducts(products);

    }

    catch (error) {

        document.getElementById("productContainer").innerHTML =
            "Products could not be loaded. Please use Live Server.";

        console.log(error);

    }

}


// Display Products

function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img src="${product.image}"
                alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="category">
                    ${product.category}
                    </p>

                    <p class="rating">
                    ⭐ ${product.rating}
                    </p>

                    <p class="price">
                    ₹${product.price}
                    </p>

                    <button class="add-btn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                    </button>

                </div>

            </div>

        `;

    });

}


// Add Product To Cart

function addToCart(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    cart.push(product);

    updateCart();

    alert(product.name + " added successfully!");

}


// Update Cart

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const totalPrice =
        document.getElementById("totalPrice");

    cartCount.innerText = cart.length;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "Your cart is empty.";

    }

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `

            <div class="cart-product">

                <span>
                ${item.name} - ₹${item.price}
                </span>

                <button onclick="removeFromCart(${index})">
                Remove
                </button>

            </div>

        `;

    });

    totalPrice.innerText = total;

}


// Remove Product From Cart

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// Clear Entire Cart

function clearCart() {

    cart = [];

    updateCart();

}


// Search Products

function searchProducts() {

    const searchValue =
        document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        return product.name.toLowerCase()
        .includes(searchValue) ||
        product.category.toLowerCase()
        .includes(searchValue);

    });

    displayProducts(filteredProducts);

}


// Scroll To Products

function scrollToProducts() {

    document.getElementById("products")
    .scrollIntoView({

        behavior: "smooth"

    });

}


// Load Products When Page Opens

loadProducts();
