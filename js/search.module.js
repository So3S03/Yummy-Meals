import { HomeData, detScreen } from "./home.module.js";
import { loadScreen, showing, loading } from "./main.js";
export let sByName = document.querySelector("#sByName");
export let sByLetter = document.querySelector("#sByLetter");
export class Searching {
    async showByName() {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex";
        let nameVal = sByName.value;
        let mealName = new HomeData()
        mealName.displayHomeData(nameVal)
    }
    async showByLetter(letter = `b`) {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex";
        if (sByLetter.value !== "") {
            let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
            let dataByLetter = await req.json();
            let arr = dataByLetter.meals
            let temp = ``
            arr.forEach(({ strMeal, strMealThumb, idMeal }) => {
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
}