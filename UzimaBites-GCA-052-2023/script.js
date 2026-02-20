const inventory = {
    dishes: [
        { id: 1, name: "Grilled Tilapia & Kachumbari", price: 1500, img: "images/tilapia.jpg", desc: "Fresh lake fish served with brown rice and traditional salsa." },
        { id: 2, name: "Quinoa Veggie Salad", price: 1200, img: "images/salad.jpg", desc: "Organic kale, quinoa, and lemon-tahini dressing." },
        { id: 3, name: "Brown Ugali & Sukuma Wiki", price: 850, img: "images/ugali.jpg", desc: "High-fiber whole grain ugali with sautéed greens." },
        { id: 7, name: "Lentil (Kamande) Stew", price: 950, img: "images/lentils.jpg", desc: "Protein-rich brown lentils simmered in coconut milk." },
        { id: 8, name: "Chicken Pesto Pasta", price: 1650, img: "images/pasta.jpg", desc: "Whole-wheat pasta with grilled chicken and fresh basil." },
        { id: 9, name: "Avocado & Chickpea Toast", price: 1100, img: "images/toast.jpg", desc: "Sourdough bread topped with mashed avocado and spiced peas." }
    ],
    beverages: [
        { id: 4, name: "Green Detox Juice", price: 650, img: "images/green-juice.jpg", desc: "Spinach, green apple, and ginger." },
        { id: 6, name: "Fruit Infused Water", price: 250, img: "images/water.jpg", desc: "Chilled water with cucumber and mint." },
        { id: 10, name: "Hibiscus Ginger Tea", price: 400, img: "images/tea.jpg", desc: "Antioxidant-rich floral tea served hot or cold." },
        
    ]
};
let cart = JSON.parse(localStorage.getItem('vitalCart')) || [];

function updateNavbarCount() {
    const countElement = document.getElementById('cart-count');
    if(countElement) countElement.innerText = cart.length;
}

function addToCart(itemId) {
    const allItems = [...inventory.dishes, ...inventory.beverages];
    const item = allItems.find(i => i.id === itemId);
    cart.push(item);
    localStorage.setItem('vitalCart', JSON.stringify(cart));
    updateNavbarCount();
    alert(`${item.name} added to cart!`);
}

function loadMenu() {
    const dishContainer = document.getElementById('dishes-container');
    const bevContainer = document.getElementById('beverages-container');

    if(dishContainer) {
        dishContainer.innerHTML = inventory.dishes.map(item => `
            <div class="card">
                <img src="${item.img}" alt="${item.name}" class="menu-img">
                <h3>${item.name}</h3>
                <p><strong>Ksh ${item.price}</strong></p>
                <button class="order"onclick="addToCart(${item.id})">Add to Order</button>
            </div>
        `).join('');
    }

    if(bevContainer) {
        bevContainer.innerHTML = inventory.beverages.map(item => `
            <div class="card">
                <img src="${item.img}" alt="${item.name}" class="menu-img">
                <h3>${item.name}</h3>
                <p><strong>Ksh ${item.price}</strong></p>
                <button class="order"onclick="addToCart(${item.id})">Add to Order</button>
            </div>
        `).join('');
    }
}

function loadCartPage() {
    const display = document.getElementById('cart-display');
    const totalElem = document.getElementById('total-price');
    
    if(!display) return; 

    if(cart.length === 0) {
        display.innerHTML = "<p style='text-align:center; padding: 20px;'>Your cart is empty. Head to the menu to add some healthy meals!</p>";
        if(totalElem) totalElem.innerText = "0";
    } else {
      
        display.innerHTML = cart.map((item, index) => `
            <div class="cart-item" style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee;">
                <span>${item.name}</span>
                <span><strong>Ksh ${item.price}</strong></span>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        if(totalElem) totalElem.innerText = total.toLocaleString(); 
    }
}
function processOrder() {
    // 1. Check if cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty! Add some healthy meals first.");
        return;
    }

    // 2. Get form values
    const name = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // 3. Simple Validation (UX Error Prevention)
    if (!name || !phone || !address) {
        alert("Please fill in all delivery details so we can reach you.");
        return;
    }

    // 4. Success Feedback
    alert(`Asante, ${name}! Your order is confirmed. We will deliver to ${address} shortly. Total: Ksh ${document.getElementById('total-price').innerText}`);
    
    // 5. Clear everything
    localStorage.removeItem('vitalCart');
    window.location.href = "index.html"; // Redirect back to home
}
function clearCart() { localStorage.removeItem('vitalCart'); location.reload(); }
function checkout() { alert("Order placed! Delivering soon."); clearCart(); }

window.onload = () => { updateNavbarCount(); loadMenu(); loadCartPage(); };