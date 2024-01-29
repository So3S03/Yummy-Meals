import { loadScreen, loading, showing } from "./main.js";
import { detScreen } from "./home.module.js";
export class Ingredient {
    async getIngredient() {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex";
        let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let reqData = await req.json();
        let mealsIngredient = reqData.meals
        let temp = ``;
        mealsIngredient.forEach(({ strDescription, strIngredient }) => {
            temp += `
                <div class="col-lg-3">
                    <div class="rounded-3 text-center ing" data-ingredient="${strIngredient}">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${strIngredient}</h3>
                            <p>${strDescription ? strDescription.split(" ", 20).join(" ") : `this description is missing from DB`}</p>
                    </div>
                </div>
        `
        });
        showing.innerHTML = temp
        document.querySelectorAll(".ing").forEach(e => {
            e.addEventListener("click", async () => {
                let ing = e.getAttribute("data-ingredient");
                this.ingredientData(ing)
                loading()
            })
        })
    }
    async ingredientData(ing) {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex";
        let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
        let reqData = await req.json()
        let ingMeals = reqData.meals
        let temp = ``;
        ingMeals.forEach(({ idMeal, strMeal, strMealThumb }) => {
            temp += `
                <div class="col-lg-3">
                    <div class="w-100 position-relative showLayer overflow-hidden rounded-3" data-id="${idMeal}">
                        <img src="${strMealThumb}" alt="beef" class="w-100 rounded-3">
                        <div class="layer2 rounded-3">
                            <h2>${strMeal}</h2>
                        </div>
                    </div>
                </div>
            `
        });
        showing.innerHTML = temp
        let id = ``;
        document.querySelectorAll(".showLayer").forEach(e => {
            e.addEventListener("click", async () => {
                loadScreen.classList.remove("d-none");
                loadScreen.style.display = "flex";
                id = e.getAttribute("data-id");
                document.querySelector("#showDet").classList.remove("d-none")
                await detScreen.getDetails(id)
                loading()
            })
        })
    }
}