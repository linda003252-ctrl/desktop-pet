// Guide questions and options data
const guideData = {
    category: {
        question: "What category interests you most?",
        options: [
            { label: "Fashion & Accessories", icon: "👜" },
            { label: "Tech & Gadgets", icon: "📱" },
            { label: "Home & Lifestyle", icon: "🏠" },
            { label: "Beauty & Wellness", icon: "💄" }
        ]
    },
    budget: {
        question: "What's your budget range?",
        options: [
            { label: "Under $30", icon: "💵" },
            { label: "$30 - $60", icon: "💴" },
            { label: "$60 - $100", icon: "💶" },
            { label: "$100+", icon: "💷" }
        ]
    },
    style: {
        question: "Which style do you prefer?",
        options: [
            { label: "Modern & Minimalist", icon: "⬜" },
            { label: "Casual & Playful", icon: "🎨" },
            { label: "Luxury & Premium", icon: "✨" },
            { label: "Eco-Friendly", icon: "🌿" }
        ]
    },
    feature: {
        question: "What features matter most to you?",
        options: [
            { label: "Quality & Durability", icon: "🏆" },
            { label: "Design & Aesthetics", icon: "🎭" },
            { label: "Functionality", icon: "⚙️" },
            { label: "Value for Money", icon: "💰" }
        ]
    }
};

// Customer profile state
let customerProfile = {};
let currentStep = 0;
const steps = ['category', 'budget', 'style', 'feature'];

// Speech messages for Loulou
const speeches = {
    welcome: "Hi there! Let me help you find the perfect product for you! 😸",
    category: "Tell me what you're interested in! 🛍️",
    budget: "What's your budget? No judgment here! 💰",
    style: "What's your style? Let's find your vibe! 🎨",
    feature: "What features are most important? ⚡",
    result: "Perfect! I found some great options for you! 🎁",
    thanks: "Thanks for shopping with us! Come back soon! 😻"
};

// DOM Elements
const petImage = document.getElementById('petImage');
const speechText = document.getElementById('speechText');
const speechBubble = document.getElementById('speechBubble');
const questionSection = document.getElementById('questionSection');
const optionsGrid = document.getElementById('optionsGrid');
const questionTitle = document.getElementById('questionTitle');
const productsSection = document.getElementById('productsSection');
const customerProfile_elem = document.getElementById('customerProfile');
const profileItems = document.getElementById('profileItems');
const resetBtn = document.getElementById('resetBtn');
const guideButtons = document.querySelectorAll('.guide-btn');
const cartLink = document.querySelector('.cart-link');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const addToCartBtns = document.querySelectorAll('.add-cart-btn');

let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
    loadSampleImage();
});

function attachEventListeners() {
    guideButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.currentTarget.dataset.question;
            startGuide(question);
        });
    });

    resetBtn.addEventListener('click', resetGuide);
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('open');
    });
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Load sample cat image
function loadSampleImage() {
    // You can replace this with actual image URL
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple cat illustration
    drawCat(ctx);
    
    petImage.src = canvas.toDataURL();
}

function drawCat(ctx) {
    const centerX = 200;
    const centerY = 200;
    
    // Background
    ctx.fillStyle = '#E8F4F8';
    ctx.fillRect(0, 0, 400, 400);
    
    // Head
    ctx.fillStyle = '#8B8B8B';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears
    ctx.fillStyle = '#8B8B8B';
    ctx.beginPath();
    ctx.moveTo(centerX - 60, centerY - 80);
    ctx.lineTo(centerX - 80, centerY - 140);
    ctx.lineTo(centerX - 40, centerY - 100);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(centerX + 60, centerY - 80);
    ctx.lineTo(centerX + 80, centerY - 140);
    ctx.lineTo(centerX + 40, centerY - 100);
    ctx.fill();
    
    // Inner ears
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.arc(centerX - 55, centerY - 95, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 55, centerY - 95, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#white';
    ctx.beginPath();
    ctx.arc(centerX - 30, centerY - 30, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 30, centerY - 30, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX - 30, centerY - 30, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 30, centerY - 30, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Nose
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.arc(centerX, centerY + 5, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 15, 15, 0, Math.PI);
    ctx.stroke();
    
    // Body
    ctx.fillStyle = '#F0F0F0';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 100, 70, 90, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Tail
    ctx.strokeStyle = '#8B8B8B';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(centerX + 80, centerY + 60, 50, Math.PI * 1.5, 0);
    ctx.stroke();
}

function startGuide(questionKey) {
    customerProfile = {};
    currentStep = 0;
    showQuestion(questionKey);
}

function showQuestion(questionKey) {
    const data = guideData[questionKey];
    
    // Show question section
    questionSection.style.display = 'block';
    productsSection.style.display = 'none';
    customerProfile_elem.style.display = 'none';
    
    // Update speech
    updateSpeech(speeches[questionKey]);
    animatePet();
    
    // Update title and options
    questionTitle.textContent = data.question;
    optionsGrid.innerHTML = '';
    
    data.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<div style="font-size: 24px; margin-bottom: 6px;">${option.icon}</div>${option.label}`;
        btn.addEventListener('click', () => selectOption(questionKey, option.label));
        optionsGrid.appendChild(btn);
    });
}

function selectOption(questionKey, selectedOption) {
    customerProfile[questionKey] = selectedOption;
    
    // Find next question
    const currentIndex = steps.indexOf(questionKey);
    
    if (currentIndex < steps.length - 1) {
        showQuestion(steps[currentIndex + 1]);
    } else {
        showResults();
    }
}

function showResults() {
    questionSection.style.display = 'none';
    productsSection.style.display = 'block';
    customerProfile_elem.style.display = 'block';
    
    // Update speech
    updateSpeech(speeches.result);
    animatePet('spin');
    
    // Show customer profile
    profileItems.innerHTML = '';
    Object.entries(customerProfile).forEach(([key, value]) => {
        const item = document.createElement('div');
        item.className = 'profile-item';
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        item.textContent = `${label}: ${value}`;
        profileItems.appendChild(item);
    });
}

function resetGuide() {
    customerProfile = {};
    currentStep = 0;
    questionSection.style.display = 'none';
    productsSection.style.display = 'block';
    customerProfile_elem.style.display = 'none';
    
    updateSpeech(speeches.welcome);
    animatePet();
}

function updateSpeech(text) {
    speechText.textContent = text;
    speechBubble.style.animation = 'none';
    setTimeout(() => {
        speechBubble.style.animation = 'speechPulse 0.5s ease-out';
    }, 10);
}

function animatePet(animation = 'bounce') {
    const pet = document.querySelector('.pet-stage');
    pet.style.animation = animation === 'spin' ? 'spin 1s ease' : 'bounce 0.5s ease';
    setTimeout(() => {
        pet.style.animation = 'none';
    }, animation === 'spin' ? 1000 : 500);
}

function addToCart(e) {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h4').textContent;
    const price = productCard.querySelector('.price').textContent;
    
    const item = {
        id: Date.now(),
        name: productName,
        price: parseFloat(price.replace('$', ''))
    };
    
    cart.push(item);
    updateCart();
    updateSpeech(`Great! Added "${productName}" to your cart! 🛒`);
    animatePet();
    
    // Visual feedback
    e.target.textContent = '✓ Added!';
    setTimeout(() => {
        e.target.textContent = 'Add to Cart';
    }, 2000);
}

function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <span>${item.price}</span>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: #FF6B6B; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Remove</button>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = '$' + total.toFixed(2);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    updateSpeech('Removed from cart! 🗑️');
}

// Allow uploading pet image
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        petImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
document.body.appendChild(fileInput);

// Add ability to click pet stage to upload image
document.querySelector('.pet-stage').addEventListener('click', () => {
    fileInput.click();
});
