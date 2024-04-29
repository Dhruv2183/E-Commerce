




'use strict';



/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
});



/**
 * Header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[this.scrollY > 50 ? "add" : "remove"]("active");
});




// Function to add a product to the cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cart.find(item => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if item already exists
  } else {
    product.quantity = 1; // Set quantity to 1 if item is not in the cart
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart(); // Update the displayed cart items

  const notification = document.createElement('div');
      notification.classList.add('notification');
      notification.textContent = `${product.name} added to cart!`;

      // Append notification to the page
      const notificationContainer = document.getElementById('notification');
      notificationContainer.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
}

// Function to display cart items on the webpage
function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartContainer = document.getElementById('cart');

  // Clear previous content
  cartContainer.innerHTML = '';

  // Generate HTML for each item in the cart
  cart.forEach(item => {
      let itemHTML = `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="product-image">
          <div class="product-info">
            <h3>${item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
          <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
          <button onclick="deleteItem('${item.name}')">Remove</button>
        </div>
      `;
      cartContainer.innerHTML += itemHTML;
  });
}

// Function to update the quantity of an item in the cart
// Function to update the quantity of an item in the cart
// Function to update the quantity of an item in the cart
function updateQuantity(name, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find(item => item.name === name);

  if (item) {
      // Ensure quantity does not go below 1
      item.quantity = Math.max(0, quantity);

      // If quantity becomes 0 or less, remove the item from the cart
      if (item.quantity <= 0) {
          cart = cart.filter(cartItem => cartItem.name !== name);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart(); // Update the displayed cart items
  }
}



// Function to delete an item from the cart
function deleteItem(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let updatedCart = cart.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  displayCart(); // Update the displayed cart items
}

// Call the displayCart function when the page loads
displayCart();


// function addToCartWithNotification(product) {
//   addToCart(product); // Call your original addToCart function
  
//   // Show notification
//   const notification = document.getElementById('notification');
//   if (notification) {
//     notification.innerText = product.name + ' has been added to your cart!';
//     notification.style.display = 'block';
//     setTimeout(function() {
//       notification.style.display = 'none';
//     }, 3000); // Hide after 3 seconds
//   } else {
//     // Create the notification element dynamically
//     const notification = document.createElement('div');
//     notification.id = 'notification';
//     notification.className = 'notification';
//     notification.innerText = product.name + ' has been added to your cart!';
//     document.body.appendChild(notification);
//     setTimeout(function() {
//       notification.style.display = 'none';
//     }, 3000); // Hide after 3 seconds
//   }
//}

