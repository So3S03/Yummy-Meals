import { showing, loading } from "./main.js";
import { Details } from "./details.module.js";
export let detScreen = new Details()
export class HomeData {
    async displayHomeData(s = ``) {
        let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`);
        let data = await req.json();
        let mealsData = data.meals;
        let temp = ``
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
                await detScreen.getDetails(e.getAttribute("data-id"))
                loading()
            })
        })
    }
}