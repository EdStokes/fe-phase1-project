const categoryStart = getRandomNumber(1,85);
const trivaCategory = `https://jservice.io/api/categories?count=15`;
//const trivaQuestions = `https://jservice.io/api/categories?id=${selectedCategory}`

//Elements
const categorySelect = document.querySelector("#category");

//Function calls
getCategories()

//event listener
categorySelect.addEventListener("change", getQuestionsByCategory)


function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function getCategories() {
    fetch(trivaCategory)
    .then(res => res.json())
    .then(categories => renderCategoryOptions(categories));
}

function renderCategoryOptions(categories){
    categories.forEach(category => {
        if (category.clues_count >= 10) {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.title;
        categorySelect.append(option);
        }
})

}

function getQuestionsByCategory(e) {
    const selectedCategory = e.target.value;
    debugger;

    
    fetch(`https://jservice.io/api/clues?category=${selectedCategory}`)
    .then(res => res.json())
    .then(data => console.log(data));
}

function randomNumberCategory() {

}
