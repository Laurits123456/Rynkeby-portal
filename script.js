if (!localStorage.getItem('products')) {
    const products = [
        {id: 1, name: 'Multijuice', price: 15, image: 'https://a.storyblok.com/f/243238/250x162/754688b428/250x0.webp/m/1800x0'},
    ];
    localStorage.setItem('products', JSON.stringify(products));
}

if (!localStorage.getItem('invoices')) {
    localStorage.setItem('invoices', JSON.stringify([
        {
            id: 1,
            date: '2024-06-15',
            items: [{productId: 1, quantity: 2}],
            total: 30
        }
    ]));
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const errorElement = document.getElementById('loginError');
    const username = document.querySelector('#loginForm input[type="text"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;
    
    errorElement.style.display = 'none';
    
    if(username === 'rynkebyadmin' && password === 'rynkebypass') {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'home.html';
    } else {
        errorElement.textContent = 'Forkert e-mail eller adgangskode';
        errorElement.style.display = 'block';
    }
});

function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

let cart = [];

function addToCart(productId) {
    const product = getProductById(productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...product, quantity: 1});
        }
        updateCartDisplay();
    }
}

function getProductById(productId) {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find(p => p.id === productId);
}

function updateCartDisplay() {
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('show');
}

function checkout() {
    // checkout logic ska laves
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    if (input.value.trim()) {
        const messages = document.getElementById('chatMessages');
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messages.innerHTML += `
            <div class="message user-message">
                <p>${input.value}</p>
                <span class="time">${time}</span>
            </div>
        `;
        
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
}