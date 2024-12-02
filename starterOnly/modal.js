function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += "responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// attach validate function to form submit
document.forms["reserve"].onsubmit = function (event) {
    event.preventDefault(); // prevent form submission to avoid page reload
    if (validate()) {
        showSuccessMessage();
    }
};

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// show success message
function showSuccessMessage() {
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <p style="font-size: 24px; margin: 330px 0;">Merci pour votre inscription</p>
            <button class="btn-submit" onclick="closeModal()">Fermer</button>
        </div>
    `;
}

// validate form
function validate() {
    let isValid = true;

    // validate first name
    const firstName = document.getElementById("first");
    if (firstName.value.trim().length < 2) {
        firstName.parentElement.setAttribute("data-error-visible", "true");
        firstName.parentElement.setAttribute("data-error", "Prénom doit avoir au moins 2 caractères.");
        isValid = false;
    } else {
        firstName.parentElement.setAttribute("data-error-visible", "false");
        console.log("First Name:", firstName.value);
    }

    // validate last name
    const lastName = document.getElementById("last");
    if (lastName.value.trim().length < 2) {
        lastName.parentElement.setAttribute("data-error-visible", "true");
        lastName.parentElement.setAttribute("data-error", "Nom doit avoir au moins 2 caractères.");
        isValid = false;
    } else {
        lastName.parentElement.setAttribute("data-error-visible", "false");
        console.log("Last Name:", lastName.value);
    }

    // validate email
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        email.parentElement.setAttribute("data-error-visible", "true");
        email.parentElement.setAttribute("data-error", "E-mail invalide.");
        isValid = false;
    } else {
        email.parentElement.setAttribute("data-error-visible", "false");
        console.log("Email:", email.value);
    }

    // validate birthdate
    const birthdate = document.getElementById("birthdate");
    if (!birthdate.value) {
        birthdate.parentElement.setAttribute("data-error-visible", "true");
        birthdate.parentElement.setAttribute("data-error", "Veuillez entrer votre date de naissance.");
        isValid = false;
    } else {
        const today = new Date();
        const birthdateValue = new Date(birthdate.value);
        if (birthdateValue > today) {
            birthdate.parentElement.setAttribute("data-error-visible", "true");
            birthdate.parentElement.setAttribute("data-error", "La date de naissance ne peut pas être dans le futur.");
            isValid = false;
        } else {
            birthdate.parentElement.setAttribute("data-error-visible", "false");
            console.log("Birthdate:", birthdate.value);
        }
    }

    // validate quantity
    const quantity = document.getElementById("quantity");
    if (isNaN(quantity.value) || quantity.value.trim() === "") {
        quantity.parentElement.setAttribute("data-error-visible", "true");
        quantity.parentElement.setAttribute("data-error", "Veuillez entrer un nombre.");
        isValid = false;
    } else {
        quantity.parentElement.setAttribute("data-error-visible", "false");
        console.log("Quantity:", quantity.value);
    }

    // validate radio buttons
    const locationRadios = document.querySelectorAll('input[name="location"]');
    let locationSelected = false;
    let selectedLocation = "";
    locationRadios.forEach((radio) => {
        if (radio.checked) {
            locationSelected = true;
            selectedLocation = radio.value;
        }
    });
    const radioGroup = document.querySelector(".radio-group");
    if (!locationSelected) {
        radioGroup.setAttribute("data-error-visible", "true");
        radioGroup.setAttribute("data-error", "Veuillez sélectionner un tournoi.");
        isValid = false;
    } else {
        radioGroup.setAttribute("data-error-visible", "false");
        console.log("Selected Location:", selectedLocation);
    }

    // validate terms and conditions checkbox
    const termsCheckbox = document.getElementById("checkbox1");
    if (!termsCheckbox.checked) {
        termsCheckbox.parentElement.setAttribute("data-error-visible", "true");
        termsCheckbox.parentElement.setAttribute("data-error", "Vous devez accepter les conditions.");
        isValid = false;
    } else {
        termsCheckbox.parentElement.setAttribute("data-error-visible", "false");
        console.log("Terms Accepted:", termsCheckbox.checked);
    }

    // Add newsletter subscription status
    const newsletterCheckbox = document.getElementById("checkbox2");
    console.log("Newsletter Subscription:", newsletterCheckbox.checked);

    return isValid;
}
