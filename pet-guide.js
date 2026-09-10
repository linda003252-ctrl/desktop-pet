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

// Photo carousel state
let currentPhotoIndex = 0;
const petPhotos = [
    'https://raw.githubusercontent.com/linda003252-ctrl/desktop-pet/main/4cccb916a6f192b97ecda550a4c0cb9c.jpg',
    'https://raw.githubusercontent.com/linda003252-ctrl/desktop-pet/main/d08868fda9c007eb154eeb02eb2d588e.jpg',
    'https://raw.githubusercontent.com/linda003252-ctrl/desktop-pet/main/db63017ca08eea54bff86b2a030ad2fe.jpg',
    'https://raw.githubusercontent.com/linda003252-ctrl/desktop-pet/main/40f604482647c41e919ea047f6cd20d3.jpg'
];

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
const petPhotosElements = document.querySelectorAll('.pet-photo');
const prevPhotoBtn = document.getElementById('prevPhoto');
const nextPhotoBtn = document.getElementById('nextPhoto');
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
    initializePhotos();
    attachEventListeners();
});

// Initialize pet photos
function initializePhotos() {
    petPhotosElements.forEach((photo, index) => {
        photo.src = petPhotos[index];
        photo.style.display = index === 0 ? 'block' : 'none';
    });
}

function attachEventListeners() {
    // Photo carousel
    if (prevPhotoBtn) {
        prevPhotoBtn.addEventListener('click', () => changePhoto(-1));
    }
    if (nextPhotoBtn) {
        nextPhotoBtn.addEventListener('click', () => changePhoto(1));
    }

    // Guide buttons
    guideButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.currentTarget.dataset.question;
            startGuide(question);
        });
    });

    // Other controls
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

// Photo carousel functions
function changePhoto(direction) {
    petPhotosElements[currentPhotoIndex].style.display = 'none';
    currentPhotoIndex = (currentPhotoIndex + direction + petPhotos.length) % petPhotos.length;
    petPhotosElements[currentPhotoIndex].style.display = 'block';
    updateSpeech("Look at this adorable pose! 😸");
    animatePet();
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
                    <span>$${item.price.toFixed(2)}</span>
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