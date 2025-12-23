
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

//substituting onclick on html button for event listener
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
	event.preventDefault(); //stop submit

	validate();
})