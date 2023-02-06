// Get the "Add to Cart" buttons and the cart table
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartTable = document.querySelector('#cart tbody');
const totalDisplay = document.querySelector('#total');

let total = 0;

// Loop through all "Add to Cart" buttons
addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get the product information
        const product = button.parentElement;
        const name = product.querySelector('.name').textContent;
        const price = product.querySelector('.price').textContent;

        // Create a new row in the cart table
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${name}</td>
        <td>1</td>
        <td>${price}</td>
        <td><button class="remove">Remove</button></td>
        `;
        cartTable.appendChild(row);

        // Update the total amount
        total += parseFloat(price.slice(1));
        totalDisplay.textContent = `$${total.toFixed(2)}`;

        // Add a click event listener to the "Remove" button
        const removeButton = row.querySelector('.remove');
        removeButton.addEventListener('click', () => {
        // Remove the row from the cart table
        cartTable.removeChild(row);

        // Update the total amount
        total -= parseFloat(price.slice(1));
        totalDisplay.textContent = `$${total.toFixed(2)}`;
        });
    });
});
