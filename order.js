document.addEventListener("DOMContentLoaded", function() {
    // Debugging to see if JS is loading
    console.log("JavaScript loaded and running!");

    // Veggie List with category-wise data and image paths
    const veggies = [
        { name: "Tomato", image: "images/tomato.jpg", type: "Regular" },
        { name: "Potato", image: "images/potato.jpg", type: "Regular" },
        { name: "Onion", image: "images/onion.jpg", type: "Regular" },
        { name: "Carrot", image: "images/carrot.jpg", type: "Regular" },
        { name: "Cabbage", image: "images/cabbage.jpg", type: "Regular" },
        { name: "Drumstick", image: "images/drumstick.jpg", type: "Regular" },
        { name: "Coriander Leaves", image: "images/coriander.jpg", type: "Greens" },
        { name: "Mint Leaves", image: "images/mint.jpg", type: "Greens" },
        { name: "Curry Leaves", image: "images/curry-leaves.jpg", type: "Greens" },
        { name: "Spinach", image: "images/spinach.jpg", type: "Greens" },
        { name: "Beetroot", image: "images/beetroot.jpg", type: "Regular" },
        { name: "Snake Gourd", image: "images/snake-gourd.jpg", type: "Regular" },
    ];

    // Select the container where we'll add the veggie cards
    const veggieList = document.getElementById("veggieList");
    const cartItems = document.getElementById("cartItems");

    // Initialize an empty cart
    let cartData = [];

    // Create veggie cards dynamically
    veggies.forEach(veg => {
        const card = document.createElement("div");
        card.className = "veggie-card";
        card.innerHTML = `
            <img src="${veg.image}" alt="${veg.name}">
            <h4>${veg.name}</h4>
            <label>Quantity (in kg or gm):</label>
            <input type="number" min="0.1" step="0.1" value="0.0" class="qty">
            <label>Form:</label>
            <select class="form">
                <option value="Whole">Whole</option>
                <option value="Chopped">Chopped</option>
            </select>
            <button onclick="addToCart('${veg.name}', this)">Add to Cart</button>
        `;
        veggieList.appendChild(card);
    });

    // Function to add items to the cart
    window.addToCart = function(name, btn) {
        console.log("Adding to cart: ", name);  // Debugging log

        const card = btn.parentElement;
        const qty = parseFloat(card.querySelector(".qty").value);
        const form = card.querySelector(".form").value;

        // Check if the item is already in the cart
        const existingItem = cartData.find(item => item.name === name && item.form === form);

        if (existingItem) {
            // Update the existing item
            existingItem.qty += qty;
        } else {
            // Add new item to the cart
            cartData.push({ name, qty, form });
        }

        // Disable button and show "Added" text
        btn.textContent = "Added ✅";
        btn.disabled = true;
        btn.style.backgroundColor = "#aaa";

        // Update the cart
        updateCart();
    };

    // Function to update the cart display
    function updateCart() {
        cartItems.innerHTML = '';

        cartData.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ${item.qty} kg (${item.form})`;
            cartItems.appendChild(listItem);
        });
    }

    // Checkout function (for now, it just logs the cart)
    window.checkout = function() {
        alert("Proceeding to Checkout...");
        console.log(cartData);
        // Here you can integrate payment or order confirmation logic
    };
});
