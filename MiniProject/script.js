let products = [
    { id: 1, name: "iPhone 16", price: 60000, image: "img/iphone16.jpg" },
    { id: 2, name: "vivo T4R", price: 27000, image: "img/vivo T4R.jpg" },
    { id: 3, name: "Oppo K14x", price: 15000, image: "img/Oppo K14x.jpg" },
    { id: 4, name: "realme 12X 5G", price: 15000, image: "img/realme 12X 5G.jpg" },
    { id: 5, name: "iPhone 15", price: 50000, image: "img/iphone15.jpg" },
    { id: 6, name: "realme C83 5G", price: 35000, image: "img/realme C83 5G.jpg" },
    { id: 7, name: "S24 Ultra", price: 110000, image: "img/S24 Ultra.jpg" },
    { id: 8, name: "S26.jpg", price: 135000, image: "img/S26.jpg" },
    { id: 9, name: "iPhone 17", price: 70000, image: "img/iphone17.jpg" },
    { id: 10, name: "vivo v70", price: 40000, image: "img/vivo v70.jpg" },
];

let cart = [];

function displayProducts() {
    let container = document.getElementById("productList");
    if (!container) return;
    container.innerHTML = "";
    products.forEach(product => {
        container.innerHTML += `
        <div id="btn" class="card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p> Price : Rs. ${product.price} </p>
            <button onclick="addToCart(${product.id})">Add To Cart</button>
            <button onclick="addToCart(${product.id})">Buy Now</button>
        </div>
        `;
    });
}
displayProducts();

function addToCart(id) {
    let product = products.find(p => p.id === id);
    let itemInCart = cart.find(item => item.id === id);

    if (itemInCart) {
        itemInCart.quantity += 1;   
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

function updateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("totalAmount").innerText = "Total Amount Rs. : " + total;
}

function renderCart() {
    let container = document.getElementById("cartItem");
    if (!container) return;
    container.innerHTML = "";
    cart.forEach(item => {
        container.innerHTML += `
        <div  class="card" id="btn">
            <h4>${item.name}</h4>
            <img src="${item.image}" alt="${item.name}" width="100">
            <p> Price : Rs. ${item.price} </p>
            <p> Quantity : ${item.quantity} </p>
            <button onclick="increaseQty(${item.id})">+</button>
            <br>
            <button onclick="decreaseQty(${item.id})">-</button>
            <br>
            <button onclick="removeItem(${item.id})">Remove</button>
        </div>
        `;
    });
    updateTotal();
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").innerText = cart.length;
}

function increaseQty(id) {
    let item = cart.find(i => i.id === id);
    item.quantity++;
    saveCart();
    renderCart();
}

function decreaseQty(id) {
    let item = cart.find(i => i.id === id);
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    renderCart();
}
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    let storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}
loadCart();
displayProducts();
renderCart();