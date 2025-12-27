"use strict"

function updateCounter() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const counterCheckout = document.getElementById("count_product");

	let count = 0;

	for (let i = 0; i < cart.length; i++) {
		count += cart[i].quantity;
	}

	counterCheckout.innerHTML = count;
}

updateCounter();

// Exercise 6
const validate = () => {
	let error = 0;
	// Get the input fields
	const fName = document.getElementById("fName");
	const fLastN = document.getElementById("fLastN");
	const fEmail = document.getElementById("fEmail");
	const fAddress = document.getElementById("fAddress");
	const fPhone = document.getElementById("fPhone");
	const fPassword = document.getElementById("fPassword");

	// Get the error elements (not used, is-invalid Bootstrap class used instead)
	const errorName = document.getElementById("errorName");
	const errorLastName = document.getElementById("errorLastN");
	const errorEmail = document.getElementById("errorEmail");  
	const errorAddress = document.getElementById("errorAddress");
	const errorPhone = document.getElementById("errorPhone");
	const errorPassowrd = document.getElementById("errorPassword");
	
	//Regex
	const validateLetters = /^[a-zA-Z]+$/;
	const validateNums = /^[0-9]+$/;
	const validatePass = /^(?=.*[A-Za-z])(?=.*\d).+$/;
	const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	
	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value.trim() == "" || fName.value.length < 3 || (!validateLetters.test(fName.value))) {
		fName.classList.add("is-invalid");
		
		error++;
	} else { fName.classList.remove("is-invalid"); }

	if(fLastN.value.trim() == "" || fLastN.value.length < 3 || (!validateLetters.test(fLastN.value))) {
		fLastN.classList.add("is-invalid");
		error++;
	} else { fLastN.classList.remove("is-invalid"); }

	if(fEmail.value.trim() == "" || fEmail.value.length < 3 || !validateEmail.test(fEmail.value)) {
		fEmail.classList.add("is-invalid")
		error++;
	} else { fEmail.classList.remove("is-invalid"); }

	if (fAddress.value.trim() == "" || fAddress.value.length < 3) {
		fAddress.classList.add("is-invalid");
		error++;
	} else { fAddress.classList.remove("is-invalid"); }

	if(fPhone.value.trim() == "" || isNaN(fPhone.value) || fPhone.value.length !== 9 || (!validateNums.test(fPhone.value))) {
		fPhone.classList.add("is-invalid");
		error++;
	} else { fPhone.classList.remove("is-invalid"); }

	if(fPassword.value.trim() == "" || fPassword.value.length < 4 || fPassword.value.length > 8 || (!validatePass.test(fPassword.value))) {
		fPassword.classList.add("is-invalid");
		error++;
	} else { fPassword.classList.remove("is-invalid"); }
	
	if (error === 0) {
		alert("Form submitted successfully");
	}
}

    ;

//substituting onclick on html button for event listener
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
	event.preventDefault(); //stop submit

	validate();
})

//printing cart

function printCheckoutCart() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	const tbodyCheckout = document.getElementById("checkout-list");
	const totalItems = document.getElementById("checkout-total");
	const noItemsMsg = document.getElementById("empty-cart-msg");

	tbodyCheckout.innerHTML = "";
	totalItems.innerHTML = "";

	if (cart.length === 0) {
		noItemsMsg.style.display = "block";
		return;
	}

	noItemsMsg.style.display = "none";

	let total = 0;

	for (let i = 0; i < cart.length; i++) {
		
		let subtotal = cart[i].price * cart[i].quantity;
        cart[i].subtotal = subtotal;

        if (cart[i].offer !== undefined) {
            if (cart[i].quantity >= cart[i].offer.number) {
                let discSubtotal = subtotal - (subtotal * (cart[i].offer.percent / 100));
                cart[i].subtotal = discSubtotal;
            }
        }         

		tbodyCheckout.innerHTML += `<tr><th scope="row"> ${cart[i].name}</th><td>$${cart[i].price}</td><td>${cart[i].quantity}</td><td>$${cart[i].subtotal}</td><td></tr>`

		total += cart[i].subtotal;
	}

	totalItems.innerHTML = `<td class="list-cart-item fw-bold">Total: $${total.toFixed(2)}</td>`;
}

