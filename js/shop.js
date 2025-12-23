import { products } from "./products.js";

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart = [];

const total = 0;

// Exercise 1
const buy = (id) => {
    // 1. Loop for to the array products to get the item to add to cart

    let productFound = null;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            productFound = products[i];
        }
    }

    if (productFound === null) {
        return "Product not found."
    } 

    // 2. Add found product to the cart array

    let prodInCart = false;

    for (let j = 0; j < cart.length; j++) {
        if (productFound.id === cart[j].id) {
            cart[j].quantity ++;
            prodInCart = true;
        }
    }
    
    if (prodInCart === false) {
        const newProd = {...productFound};
        newProd.quantity = 1;
        cart.push(newProd);
    }
}

// Exercise 2
const cleanCart = () =>  {

    while (cart.length !== 0) {
        cart.pop()
    }
}

// Exercise 3
const calculateTotal = () =>  {
    // Calculate total price of the cart using the "cartList" array
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        let itemPrice = cart[i].subtotal;
        total += itemPrice;
    }

    return total;
}

// Exercise 4
const applyPromotionsCart = () =>  {
    // Apply promotions to each item in the array "cart"

    for (let i = 0; i < cart.length; i++) {
        let subtotal = cart[i].price * cart[i].quantity;
        cart[i].subtotal = subtotal;

        if (cart[i].offer !== undefined) {
            if (cart[i].quantity >= cart[i].offer.number) {
                let discSubtotal = subtotal - (subtotal * (cart[i].offer.percent / 100));
                cart[i].subtotal = discSubtotal;
            }
        }         
    }
}

// Exercise 5
const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom
    
    let cartList = document.getElementById("cart_list");
    let counterNav = document.getElementById("count_product");
    let totalElement = document.getElementById("total_price");

    let counter = 0;
    let finalTable = "";
    
    cartList.innerHTML = "";

    for (let i = 0; i < cart.length; i++){
        let subtotal = cart[i].subtotal;

        finalTable += `<tr><th scope="row"> ${cart[i].name}</th><td>$${cart[i].price}</td><td>${cart[i].quantity}</td><td>$${subtotal}</td><td><button class="btn btn-sm btn-danger remove-item" data-product-id="${cart[i].id}" aria-label="Remove ${cart[i].name}"> ✕ </button></td></tr>`

        counter += cart[i].quantity;
    }

    cartList.innerHTML = finalTable; 
    counterNav.innerHTML = counter;
    totalElement.innerHTML = calculateTotal();
}



// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            if (cart[i].quantity <= 1) {
                cart.splice(i, 1);
                return;
            } else {
                cart[i].quantity--;
                return;
            }
        }
    }
}

const open_modal = () =>  {
    printCart();
}

//AddToCart EventListener
const addToCart = document.getElementsByClassName("add-to-cart");

for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", function (event) { 
        let itemId = parseInt(event.currentTarget.dataset.productId);
        buy(itemId);
        applyPromotionsCart();
        printCart(); 
    });
}

//Cart button navbar eventListener
const cartBtn = document.getElementsByClassName("cart-button");

for (let i = 0; i < cartBtn.length; i++) {
    cartBtn[i].addEventListener("click", printCart);
}

//Clean Cart EventListener
const cleanCartBtn = document.getElementById("clean-cart");
cleanCartBtn.addEventListener("click", cleanPrintCart);

function cleanPrintCart() {
    cleanCart();
    applyPromotionsCart();
    printCart();
}


