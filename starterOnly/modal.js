const navMenuIcon = document.getElementById("nav-menu-icon");
navMenuIcon.addEventListener("click", editNav);
function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// TODO 1 : fermer la modale
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// onsubmit
document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms["reserve"];
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validate()) {
            showSuccessMessage();
        }
    });
});

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// TODO 4 : Message de succès qui remplace le form dans la modale
// et est trigger quand validate() retourne true
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

// TODO 2 : Implémenter entrées du formulaire
// TODO 3 : Insertion des messages d'erreur + rendu visible
// TODO 5 : Ajout des console.log pour les tests
// validate form
function validate() {
    let isValid = true;

    // validate first name
    const firstName = document.getElementById("first");
    if (!validators.validateName(firstName.value)) {
        firstName.parentElement.setAttribute("data-error-visible", "true");
        firstName.parentElement.setAttribute("data-error", "Prénom doit avoir au moins 2 caractères.");
        isValid = false;
    } else {
        firstName.parentElement.setAttribute("data-error-visible", "false");
        console.log("First Name:", firstName.value);
    }

    // validate last name
    const lastName = document.getElementById("last");
    if (!validators.validateName(lastName.value)) {
        lastName.parentElement.setAttribute("data-error-visible", "true");
        lastName.parentElement.setAttribute("data-error", "Nom doit avoir au moins 2 caractères.");
        isValid = false;
    } else {
        lastName.parentElement.setAttribute("data-error-visible", "false");
        console.log("Last Name:", lastName.value);
    }

    // validate email
    const email = document.getElementById("email");
    if (!validators.validateEmail(email.value)) {
        email.parentElement.setAttribute("data-error-visible", "true");
        email.parentElement.setAttribute("data-error", "E-mail invalide.");
        isValid = false;
    } else {
        email.parentElement.setAttribute("data-error-visible", "false");
        console.log("Email:", email.value);
    }

    // validate birthdate
    const birthdate = document.getElementById("birthdate");
    if (!validators.validateBirthdate(birthdate.value)) {
        birthdate.parentElement.setAttribute("data-error-visible", "true");
        birthdate.parentElement.setAttribute("data-error", "Veuillez entrer votre date de naissance.");
        isValid = false;
    } else {
        birthdate.parentElement.setAttribute("data-error-visible", "false");
        console.log("Birthdate:", birthdate.value);
    }

    // validate quantity
    const quantity = document.getElementById("quantity");
    if (!validators.validateQuantity(quantity.value)) {
        quantity.parentElement.setAttribute("data-error-visible", "true");
        quantity.parentElement.setAttribute("data-error", "Veuillez entrer un nombre.");
        isValid = false;
    } else {
        quantity.parentElement.setAttribute("data-error-visible", "false");
        console.log("Quantity:", quantity.value);
    }

    // refactored location validation
    const locationRadios = document.querySelectorAll('input[name="location"]');
    const locationSelected = Array.from(locationRadios).some((radio) => radio.checked);
    const selectedLocation = locationSelected ? Array.from(locationRadios).find((radio) => radio.checked).value : "";

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
    if (!validators.validateCheckbox(termsCheckbox.checked)) {
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

// reusable validator functions
const validators = {
    validateName: (value) => value.trim().length >= 2,
    validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    validateBirthdate: (date) => {
        if (!date) return false;
        const birthdateValue = new Date(date);
        return birthdateValue < new Date();
    },
    validateQuantity: (value) => !isNaN(value) && value.trim() !== "",
    validateCheckbox: (checked) => checked,
};
