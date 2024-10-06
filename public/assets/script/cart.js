document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update cart summary
    function updateCartSummary() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        if (document.getElementById('total-items')) {
            document.getElementById('total-items').innerText = totalItems;
        }
        if (document.getElementById('total-price')) {
            document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
        }
    }

    // Event listener for "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const productId = productItem.getAttribute('data-id');
            const productName = productItem.getAttribute('data-name');
            const productPrice = parseFloat(productItem.getAttribute('data-price'));

            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} has been added to your cart!`);
            updateCartSummary();
        });
    });

    // Display the cart items and summary if on the cart page
    function displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            cart.forEach(item => {
                const cartItemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="remove-btn">Remove</button>
                    </div>
                `;
                cartItemsContainer.innerHTML += cartItemHTML;
            });

            // Add event listeners to all remove buttons
            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const cartItem = button.closest('.cart-item');
                    const productId = cartItem.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== productId);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    cartItem.remove();
                    updateCartSummary();
                });
            });
        }
    }

    // Initialize the cart summary and display items if on the cart page
    displayCart();
    updateCartSummary();
});
