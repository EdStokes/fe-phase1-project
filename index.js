const trivaCategory = 'https://jservice.io/api/categories?count=15';

//Elements
const categorySelect = document.querySelector("#category");

//Function calls
getCategories()
function getCategories() {
    fetch(trivaCategory)
    .then(res => res.json())
    .then(categories => renderCategoryOptions(categories));
}

function renderCategoryOptions(categories){
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.title;
        option.textContent = category.title;
        categorySelect.append(option);
    })

}

