import { loadScreen, loading, showing } from "./main.js"
import { detScreen } from "./home.module.js";
export class Area {
    async area() {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex";
        let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let areaData = await req.json();
        let data = areaData.meals
        let temp = ``
        data.forEach(({ strArea }) => {
            temp += `
                <div class="col-lg-3">
                    <div class="rounded-3 text-center area" data-area="${strArea}">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${strArea}</h3>
                    </div>
                </div>
            `
        });
        showing.innerHTML = temp
        let areaCards = document.querySelectorAll(".area");
        areaCards.forEach(e => {
            e.addEventListener("click", async () => {
                loadScreen.classList.remove("d-none");
                loadScreen.style.display = "flex";
                let areaName = e.getAttribute("data-area");
                await this.areaMeals(areaName)
            })
        })
    }
    async areaMeals(a) {
        let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`)
        let dataReq = await req.json();
        let areaMealsData = dataReq.meals;
        let temp = ``
        areaMealsData.forEach(({ strMeal, strMealThumb, idMeal }) => {
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
        showing.innerHTML = temp
        document.querySelectorAll(".showLayer").forEach(e => {
            e.addEventListener("click", async () => {
                document.querySelector("#showDet").classList.remove("d-none")
                await detScreen.getDetails(e.getAttribute("data-id"))
                loading()
            })
        })
        loading()
    }
}