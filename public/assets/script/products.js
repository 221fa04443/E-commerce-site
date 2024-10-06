document.addEventListener('DOMContentLoaded', () => {
    // Hardcoded product data (you can replace this with API or database data)
    const products = [
        { id: 1, name: 'Smartphone', category: 'electronics', price: 299.99, image: 'smartphone.jpg' },
        { id: 2, name: 'Laptop', category: 'electronics', price: 899.99, image: 'laptop.jpg' },
        { id: 3, name: 'T-shirt', category: 'fashion', price: 19.99, image: 'tshirt.jpg' },
        { id: 4, name: 'Sofa', category: 'home', price: 499.99, image: 'sofa.jpg' },
        { id: 5, name: 'Jeans', category: 'fashion', price: 39.99, image: 'jeans.jpg' },
        { id: 6, name: 'TV', category: 'electronics', price: 799.99, image: 'tv.jpg' },
        { id: 7, name: 'Coffee Table', category: 'home', price: 149.99, image: 'coffeetable.jpg' },
    ];

    // Function to get URL parameters
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search;
        if (queryString) {
            const pairs = queryString.substring(1).split('&');
            pairs.forEach(pair => {
                const [key, value] = pair.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            });
        }
        return params;
    }

    // Function to display products based on category
    function displayProducts(category) {
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = ''; // Clear previous products

        const filteredProducts = products.filter(product => product.category === category);

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productItem = `
                    <div class="product-item" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                        <img src="${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        <p>$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                `;
                productGrid.innerHTML += productItem;
            });
        } else {
            productGrid.innerHTML = `<p>No products found in this category.</p>`;
        }
    }

    // Get category from URL and display products
    const params = getQueryParams();
    if (params.category) {
        displayProducts(params.category);
    }

    // Add event listeners to "Add to Cart" buttons (assuming this functionality exists)
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const productId = productItem.getAttribute('data-id');
            const productName = productItem.getAttribute('data-name');
            const productPrice = parseFloat(productItem.getAttribute('data-price'));

            // Assuming 'cart' is stored in local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id == productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} has been added to your cart!`);
        });
    });
});
