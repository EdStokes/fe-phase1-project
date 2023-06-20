const categoryStart = getRandomNumber(1, 85);
const trivaCategory = `https://jservice.io/api/categories?count=13`;
//const trivaQuestions = `https://jservice.io/api/categories?id=${selectedCategory}`

//Elements
const categorySelect = document.querySelector("#category");
const categoryElement = document.querySelector(".category-container");
const questionContainer = document.querySelector(".question-container");
const titleElement = document.querySelector(".header")
const categorySection = document.querySelector(".category-section");
const questionInfoElement = document.querySelector(".question-info");
const answerContainer = document.querySelector(".answer-container");


//Function calls
getCategories()

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
    answerContainer.replaceChildren();
    questionContainer.replaceChildren();
    questionInfoElement.replaceChildren();
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
    const nextButton = document.createElement('button');
    nextButton.classList.add("nextButton");
    let arrayIndex = 0;
    nextButton.innerText = "Start Queststion"
    questionInfoElement.appendChild(nextButton)
    questionInfo(questionArray, arrayIndex)
    nextButton.addEventListener('click', () => {
        arrayIndex += 1;
        nextButton.innerText = "Next Question"
        questionCard(questionArray, arrayIndex);
    })
}

function questionCard(questions, index) {
    const questionCard = document.createElement('div');
    const answer = document.createElement('h4');
    answer.classList.add("answer");
    answerContainer.replaceChildren();
    questionCard.classList.add('questionCard');
    questionCard.innerText = questions[index].question;
    answer.innerText = "Show Answer";
    answer.addEventListener('click', function() {
        answerCard(questions, index);
    })
    questionContainer.replaceChildren();
    questionContainer.append(questionCard)
    questionContainer.append(answer)
}

function questionInfo(question) {
    const infoCard = document.createElement('h3');
    let category = question[0].category.title.toUpperCase();
    infoCard.classList.add("infoCard");
    infoCard.innerText = `Category: ${category}   Number of Questions: ${question.length}`;
    questionInfoElement.append(infoCard);
    console.log(question[1].category.title)
    console.log(question)
}

function answerCard(questions, index) {
    const answerCard = document.createElement('p');
    answerCard.classList.add('answerCard')
    answerCard.innerText = questions[index].answer;
    answerContainer.replaceChildren();
    answerContainer.append(answerCard);
}


