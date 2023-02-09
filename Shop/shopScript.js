const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartTable = document.querySelector('#cart tbody');
const totalDisplay = document.querySelector('#total');
const checkoutBtn = document.getElementById("checkout");


// Constants
let song = new Audio("songs/song1.mp3");
let total = 0;
totalDisplay.textContent = `$${total.toFixed(2)}`;


// Loading the shop... 
window.addEventListener('load', function() {
    song.play();
});


// User Clicking the Checkout Button
checkoutBtn.addEventListener("click", function () {
    localStorage.setItem("songTime", song.currentTime);
    localStorage.setItem("orderTotal", total);
    window.location.href = "checkoutIndex.html";
});

// Handling User Adding to Cart and Rmoving Items
addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Product information
        const product = button.parentElement;
        const name = product.querySelector('.name').textContent;
        const price = product.querySelector('.price').textContent;

        // Get the current items from localStorage
        let items = JSON.parse(localStorage.getItem("items")) || [];

        // Add the new item to the list of items
        items.push({ name, price });

        // Store the items in localStorage
        localStorage.setItem("items", JSON.stringify(items));

        // Inserting Product into Cart
        const row = document.createElement('tr');
        row.innerHTML = 
        `
            <td>${name}</td>
            <td>1</td>
            <td>${price}</td>
            <td><img class="remove-img" src="/icons/remove.png" alt="Remove Item"></td>
        `;
        cartTable.appendChild(row);
        const priceNumber = parseFloat(price.replace('$', ''));
        total += parseFloat(priceNumber);
        totalDisplay.textContent = `$${total.toFixed(2)}`;
        const removeImg = row.querySelector('.remove-img');

        // Removing Product from Cart
        removeImg.addEventListener('click', () => {
            cartTable.removeChild(row);

            // Remove the item from the items in localStorage
            items = items.filter((item) => item.name !== name);
            localStorage.setItem("items", JSON.stringify(items));

            // Updating amount
            total -= parseFloat(priceNumber);
            if(total < 0) total *= -1; 
            totalDisplay.textContent = `$${total.toFixed(2)}`;
        });
    });
});
