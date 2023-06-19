const categoryStart = getRandomNumber(1, 85);
const trivaCategory = `https://jservice.io/api/categories?count=15`;
//const trivaQuestions = `https://jservice.io/api/categories?id=${selectedCategory}`

//Elements
const categorySelect = document.querySelector("#category");
const categoryElement = document.querySelector(".category-container");
const questionContainer = document.querySelector(".question-container");
const titleElement = document.querySelector(".header")
const categorySection = document.querySelector(".category-section");


//Function calls
getCategories()


//event listener

//Title
const title = document.createElement("h1");
title.textContent = "Triva";
titleElement.append(title);

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
            categoryCard.addEventListener("click", function () {
                getQuestionsByCategory(category.id)
            })
            categoryCard.innerHTML = category.title.toUpperCase();
            categoryElement.append(categoryCard)
        }
    })
}

function getQuestionsByCategory(categoryId) {
    const selectedCategory = categoryId;
    fetch(`https://jservice.io/api/clues?category=${selectedCategory}`)
        .then(res => res.json())
        .then(questions => renderQuestions(questions));
}

function renderQuestions(questions) {
    const questionArray = [];
    questions.forEach(question => {
        questionArray.push(question);
    })
    const questionCard = document.createElement('div');
    const nextButton = document.createElement('button');
    const answerButton = document.createElement('button');
    let arrayIndex = 0;
    questionCard.classList.add('questionCard');
    questionCard.innerHTML = questionArray[arrayIndex].question;
    nextButton.innerText = "Start Queststion"
    nextButton.addEventListener('click', () => {
        arrayIndex += 1;
        console.log(questionArray[arrayIndex].question)
        nextButton.innerText = "Next Question"
        questionCard.innerHTML = questionArray[arrayIndex].question;
        questionContainer.append(questionCard)
        answerButton.innerText = "Show Answer";
        questionContainer.appendChild(answerButton);
        answerButton.addEventListener('click', () => {
            questionCard.innerHTML = questionArray[arrayIndex].answer;
            questionContainer.append(questionCard);

        })

    })
    questionContainer.appendChild(nextButton);


}



