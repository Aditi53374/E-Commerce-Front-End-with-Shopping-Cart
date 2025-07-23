let products = [];
let cart = [];

// Fetch products from products.json
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
  });

function renderProducts() {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="assets/${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(productDiv);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartDiv.appendChild(itemDiv);
  });
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cartDiv.appendChild(totalDiv);
}

document.getElementById('checkout-btn').onclick = function() {
  if (cart.length === 0) {
    document.getElementById('checkout-message').textContent = 'Cart is empty!';
    return;
  }
  cart = [];
  renderCart();
  document.getElementById('checkout-message').textContent = 'Thank you for your purchase!';
  setTimeout(() => {
    document.getElementById('checkout-message').textContent = '';
  }, 2500);
}; 