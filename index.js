const categoryStart = getRandomNumber(1, 85);
const trivaCategory = `https://jservice.io/api/categories?count=15`;
const questionArray = [];
//const trivaQuestions = `https://jservice.io/api/categories?id=${selectedCategory}`

//Elements
const categorySelect = document.querySelector("#category");
const categoryElement = document.querySelector(".category-container");
const questionContainer = document.querySelector(".question-container");

//Function calls
getCategories()


//event listener
categorySelect.addEventListener("change", getQuestionsByCategory)


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getCategories() {
    fetch(trivaCategory)
        .then(res => res.json())
        .then(categories => renderCategoryOptions(categories));
}

function renderCategoryOptions(categories) {
    categories.forEach(category => {
        if (category.clues_count >= 10) {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('cardCategory');
            categoryCard.innerHTML = category.title;
            questionContainer.append(categoryCard)
            console.log(category.title)
        }
    })

}



function getQuestionsByCategory(e) {
    const selectedCategory = e.target.value;

    fetch(`https://jservice.io/api/clues?category=${selectedCategory}`)
        .then(res => res.json())
        .then(questions => createQuestionArray(questions));
}

function createQuestionArray(questions) {
    questions.forEach(question => {
        questionArray.push(question)
    })
    console.log(questionArray)
    console.log(questionArray[0].question)
    console.log(questionArray[0].answer)

    categorySelect.value = "";
    return questionArray;

}

function renderQuestionCard(question) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const cardQuestion = document.createElement("h2");
    cardQuestion.textContent = questionArray[1].question;

    cardDiv.append(cardQuestion);
    questionContainer.append(cardDiv)



}
console.log("is this working")
//console.log(questionArray[1].question);
