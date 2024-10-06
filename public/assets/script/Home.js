// Initialize cart
const cart = [];

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    notification.style.opacity = 1;

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300); // Allow for fade-out transition
    }, 3000);
}

// Function to handle adding items to the cart
function addToCart(event) {
    const productItem = event.target.closest('.product-item');
    const productId = productItem.dataset.id;
    const productName = productItem.dataset.name;
    const productPrice = productItem.dataset.price;

    // Add product to the cart
    cart.push({ id: productId, name: productName, price: parseFloat(productPrice) });

    // Show notification
    showNotification(`${productName} has been added to your cart!`);
}

// Attach event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Function to pop emojis when loading the page
function popEmojis() {
    const emojiContainer = document.createElement('div');
    emojiContainer.innerHTML = '🎊 🎉 🎈';
    emojiContainer.classList.add('blaster');
    document.body.appendChild(emojiContainer);

    // Show blaster for a minimum of 5 seconds
    setTimeout(() => {
        emojiContainer.remove();
    }, 5000); // Show blaster for 5 seconds
}

// Initial emoji pop on page load
popEmojis();

// Set interval for popping blasters every 5-10 seconds
setInterval(popEmojis, Math.random() * 3000 + 1000); // Random interval between 5 and 10 seconds
