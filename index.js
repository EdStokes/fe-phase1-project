
const trivaCategory = `https://jservice.io/api/categories?count=13`;

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
title.textContent = "Trivia";
titleElement.append(title);

// get the categories form the API
function getCategories() {
    fetch(trivaCategory)
        .then(res => res.json())
        .then(categories => renderCategoryOptions(categories));
}

// render the categories to the top of the screen
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

// get the questions from the API based on the category selected
function getQuestionsByCategory(categoryId) {
    const selectedCategory = categoryId;
    answerContainer.replaceChildren();
    questionContainer.replaceChildren();
    questionInfoElement.replaceChildren();
    fetch(`https://jservice.io/api/clues?category=${selectedCategory}`)
        .then(res => res.json())
        .then(questions => renderQuestions(questions));
}

// place the question into an array
function renderQuestions(questions) {
    const questionArray = [];
    const nextButton = document.createElement('button');
    nextButton.classList.add("nextButton");
    questions.forEach(question => {
        questionArray.push(question);
    })
    nextButton.classList.add("nextButton");
    let arrayIndex = 0;
    nextButton.innerText = "Start Questions"
    questionInfoElement.appendChild(nextButton)
    questionInfo(questionArray, arrayIndex)
    nextButton.addEventListener('click', () => {
        arrayIndex += 1;
        nextButton.innerText = "Next Question"
        questionCard(questionArray, arrayIndex);
    })
}

//display the question on the screen
function questionCard(questions, index) {
    const questionCard = document.createElement('div');
    const answer = document.createElement('button');
    const currentQuestionNumber = document.createElement('h3');
    const replaceQuestion = questionInfoElement.children[1];
    currentQuestionNumber.innerText =  `Current Question Number: ${index}`
    answer.classList.add("answer");
    answerContainer.replaceChildren();
    questionCard.classList.add('questionCard');
    questionCard.innerText = questions[index].question;
    answer.innerText = "Show Answer";
    answer.addEventListener('mouseover', function () {
        answerCard(questions, index);
    })
    questionContainer.replaceChildren();
    questionContainer.append(questionCard)
    questionCard.append(answer)
    questionInfoElement.append(currentQuestionNumber)
    questionInfoElement.replaceChild(currentQuestionNumber, replaceQuestion)
}

//create an infor bar to display category and question infor
function questionInfo(question, index) {
    const categoryInfo = document.createElement('h3');
    const category = question[0].category.title.toUpperCase();
    const currentQuestionNumber = document.createElement('h3');
    const questionsInCategory = document.createElement('h3');
    categoryInfo.innerText = `Category: ${category}`;
    currentQuestionNumber.innerText = `Current Question Number: ${index}`
    questionsInCategory.innerText = `Number of Questions to Answer: ${question.length - 1}`
    questionInfoElement.append(currentQuestionNumber)
    questionInfoElement.append(questionsInCategory)
    questionInfoElement.append(categoryInfo)
}

//show the answer to the question
function answerCard(questions, index) {
    const answerCard = document.createElement('p');
    answerCard.classList.add('answerCard')
    answerCard.innerText = questions[index].answer;
    answerContainer.replaceChildren();
    answerContainer.append(answerCard);
}


