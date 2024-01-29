import { loadScreen } from "./main.js";
let showDet = document.querySelector("#showDet")
export class Details {
    async getDetails(mealId = `53071`) {
        loadScreen.classList.remove("d-none");
        loadScreen.style.display = "flex";
        let req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let data = await req.json();
        let mealData = data.meals;
        let { strArea, strCategory, strInstructions, strMealThumb, strYoutube, strSource, strMeal, strTags } = mealData[0]
        let temp = `
            <div class="w-100 detailsPage">
                                    <div class="w-85 text-end">
                        <i class="fa-solid fa-x fa-lg" id="closeBtn"></i>
                    </div>
                    <div class="w-85 mx-auto d-flex justify-content-between flex-wrap mt-3">
                        <div class="w-35 rounded-3 w-r-100">
                            <img src="${strMealThumb}" alt="${strMeal}" class="w-100 rounded-3">
                            <h2 class="mt-3">${strMeal}</h2>
                        </div>
                        <div class="w-60 w-r-100">
                            <h2>Instructions</h2>
                            <p>${strInstructions}</p>
                            <p class="fs-4"><span class="fw-bold fs-3">Area :</span> ${strArea}</p>
                            <p class="fs-4"><span class="fw-bold fs-3">Category :</span> ${strCategory}</p>
                            <p class="fs-3 fw-medium">Recipes :</p>
                            <div class="w-100 d-flex justify-content-start flex-wrap" id="recipes">
                                
                            </div>
                            <p class="fs-3 fw-medium">Tags :</p>
                            <div class="d-flex w-100 justify-content-start flex-wrap mb-3">
                                <p class="alert alert-danger m-2 p-1">${strTags ? strTags : "this tag is missing"}</p>
                            </div>
                            <a class="btn btn-success" href="${strSource}" target ="_blank">Source</a>
                            <a class="btn btn-danger" href="${strYoutube}" target ="_blank">Youtube</a>
                        </div>
                    </div>
            </div>
                `
        showDet.innerHTML = temp
        let temp2 = ``;
        for (let i = 1; i <= 20; i++) {
            let ingredient = `${mealData[0]['strIngredient' + i]}`
            let measure = `${mealData[0]['strMeasure' + i]}`
            if ((ingredient !== null && ingredient !== "") && (measure !== null && measure !== "")) {
                temp2 += `
                    <p class="alert alert-info m-2 p-1">${measure} ${ingredient}</p>
                `
            }
        }
        document.querySelector("#recipes").innerHTML = temp2;
        document.querySelector("#closeBtn").addEventListener("click", () => {
            document.querySelector("#showDet").classList.add("d-none")
        })
    }
}