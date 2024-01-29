import { showing, loadScreen, loading } from "./main.js";
import { Details } from "./details.module.js";
let cat = ``;
let id = ``;
export class Categories {
    async getCats() {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex";
        document.querySelector("#searching").classList.add("d-none")
        let categoriesData = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let response = await categoriesData.json();
        let data = response.categories
        let temp = ``;
        data.forEach(({ strCategory, strCategoryDescription, strCategoryThumb, idCategory }) => {
            temp += `
                    <div class="col-lg-3">
                        <div class="showLayer position-relative rounded-3 overflow-hidden" data-id= "${idCategory}" id="category" data-cat="${strCategory}">
                            <img src="${strCategoryThumb}" alt="${strCategory}" class="w-100 rounded-3">
                            <div class="layer rounded-3">
                                <h2>${strCategory}</h2>
                                <p>${strCategoryDescription.split(" ", 20).join(" ")}</p>
                            </div>
                        </div>
                    </div>
            `
        });
        showing.innerHTML = temp
        let catArr = document.querySelectorAll(".showLayer");
        catArr.forEach(e => {
            e.addEventListener("click", async () => {
                cat = e.getAttribute("data-cat")
                await this.getMealName(cat)
                loading()
            })
        })
    }
    async getMealName() {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex"
        let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        let response = await req.json()
        let mealsData = response.meals;
        let temp = ``;
        mealsData.forEach(({ strMeal, strMealThumb, idMeal }) => {
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
        })
        showing.innerHTML = temp;
        document.querySelectorAll(".showLayer").forEach(e => {
            e.addEventListener("click", async () => {
                document.querySelector("#showDet").classList.remove("d-none")
                id = e.getAttribute("data-id");
                let details = new Details()
                await details.getDetails(id)
                loading()
            })
        })
    }
}

