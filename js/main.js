import { Categories } from "./categories.module.js";
import { HomeData } from "./home.module.js";
import { Details } from "./details.module.js";
import { sByName, sByLetter, Searching } from "./search.module.js";
import { Area } from "./area.module.js";
import { Ingredient } from "./ingredients.module.js";
export let showing = document.querySelector("#showData");
let navToggle = document.querySelector(".menu-btn");
let navBar = document.querySelector("nav");
let navLinks = document.querySelectorAll(".naving ul li");
navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open")
    navBar.classList.toggle("show-nav")
    navLinks.forEach(e => e.classList.toggle("active"))
})
export let loadScreen = document.querySelector(".loading")
export function loading() {
    $(document).ready(function () {
        $(loadScreen).fadeOut(2000, function () {
            $(loadScreen).addClass("d-none");
        })
    })
}
loading()
let category = new Categories();
document.querySelector(".sec").addEventListener("click", () => {
    document.querySelector("#contact").classList.add("d-none")
    category.getCats()
    loading()
})
let home = new HomeData()
home.displayHomeData()
let detData = new Details()
detData.getDetails()
let search = document.querySelector(".fst")
search.addEventListener("click", () => {
    showing.innerHTML = ``
    document.querySelector("#contact").classList.add("d-none")
    document.querySelector("#searching").classList.remove("d-none")
    sByName.addEventListener("input", async () => {
        let sData = new Searching()
        await sData.showByName()
        loading()
    })
    sByLetter.addEventListener("input", async () => {
        let letterVal = sByLetter.value;
        let sData = new Searching()
        await sData.showByLetter(letterVal)
        loading()
    })
})
document.querySelector(".trd").addEventListener("click", () => {
    document.querySelector("#contact").classList.add("d-none")
    document.querySelector("#searching").classList.add("d-none")
    let areaDet = new Area()
    areaDet.area()
    loading()
})
document.querySelector(".frt").addEventListener("click", () => {
    let ingredient = new Ingredient()
    document.querySelector("#contact").classList.add("d-none")
    document.querySelector("#searching").classList.add("d-none")
    ingredient.getIngredient()
    loading()
})
document.querySelector(".home").addEventListener("click", async () => {
    loadScreen.classList.remove("d-none");
    loadScreen.style.display = "flex";
    await home.displayHomeData()
    loading()
})

document.querySelector(".fft").addEventListener("click", () => {
    loadScreen.classList.remove("d-none");
    loadScreen.style.display = "flex";
    showing.innerHTML = ``
    document.querySelector("#contact").classList.remove("d-none")
    document.querySelector("#searching").classList.add("d-none")
    loading()
})

//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
let name = document.querySelector("#nameInp");
let nameRegEx = /^[a-zA-Z ]{1,20}$/;
let nameAlert = document.querySelector("#nameAlert");
let email = document.querySelector("#emailInp");
let emailRegEx = /^[a-zA-Z0-9 -_!#$]{1,20}@[a-zA-Z]{1,8}\.[a-zA-Z]{2,5}$/;
let emailAlert = document.querySelector("#emailAlert");
let phone = document.querySelector("#phoneInp");
let phoneRegEx = /^01(0|1|2|5)[0-9]{8}$/;
let phoneAlert = document.querySelector("#phoneAlert");
let age = document.querySelector("#ageInp");
let ageRegEx = /^[1-9][0-9]$/;
let ageAlert = document.querySelector("#ageAlert");
let password = document.querySelector("#passInp");
let passRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@_\-!%$#*]{8,}$/;
let passAlert = document.querySelector("#passAlert");
let rePass = document.querySelector("#rePassInp");
let rePassAlert = document.querySelector("#rePassAlert");
let subBtn = document.querySelector('.subBtn');
function validateName() {
    if (!nameRegEx.test(name.value)) {
        name.classList.add("is-invalid");
        name.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
        return false;
    } else {
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
        nameAlert.classList.add("d-none");
        return true;
    }
}
function validateEmail() {
    if (!emailRegEx.test(email.value)) {
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
        emailAlert.classList.remove("d-none");
        return false;
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        emailAlert.classList.add("d-none");
        return true;
    }
}
function validatePhone() {
    if (!phoneRegEx.test(phone.value)) {
        phone.classList.add("is-invalid");
        phone.classList.remove("is-valid");
        phoneAlert.classList.remove("d-none");
        return false;
    } else {
        phone.classList.remove("is-invalid");
        phone.classList.add("is-valid");
        phoneAlert.classList.add("d-none");
        return true;
    }
}
function validateAge() {
    if (!ageRegEx.test(age.value)) {
        age.classList.remove("is-valid");
        age.classList.add("is-invalid");
        ageAlert.classList.remove("d-none");
        return false;
    } else {
        age.classList.remove("is-invalid");
        age.classList.add("is-valid");
        ageAlert.classList.add("d-none");
        return true;
    }
}
function validatePassword() {
    if (!passRegEx.test(password.value)) {
        password.classList.add("is-invalid");
        password.classList.remove("is-valid");
        passAlert.classList.remove("d-none");
        return false;
    } else {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
        passAlert.classList.add("d-none");
        return true;
    }
}
function validateRePass() {
    if (rePass.value !== password.value) {
        rePass.classList.add("is-invalid");
        rePass.classList.remove("is-valid");
        rePassAlert.classList.remove("d-none");
        return false;
    } else {
        rePass.classList.remove("is-invalid");
        rePass.classList.add("is-valid");
        rePassAlert.classList.add("d-none");
        return true;
    }
}
function enableDisableSubmitButton() {
    if (validateName() && validateEmail() && validatePhone() && validateAge() && validatePassword() && validateRePass()) {
        subBtn.removeAttribute("disabled");
    } else {
        subBtn.setAttribute("disabled", true);
    }
}

name.addEventListener("input", enableDisableSubmitButton);
email.addEventListener("input", enableDisableSubmitButton);
phone.addEventListener("input", enableDisableSubmitButton);
age.addEventListener("input", enableDisableSubmitButton);
password.addEventListener("input", enableDisableSubmitButton);
rePass.addEventListener("input", enableDisableSubmitButton);

