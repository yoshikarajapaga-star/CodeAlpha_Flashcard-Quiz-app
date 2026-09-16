let defaultCards = [
    {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language"
    },
    {
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does JavaScript add to a website?",
        answer: "Interactivity and dynamic behavior"
    }
];

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || defaultCards;

let currentCard = 0;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const cardNumberElement = document.getElementById("cardNumber");
const showAnswerButton = document.getElementById("showAnswerBtn");
const progressBar = document.getElementById("progressBar");
const progressText=document.getElementById("progressText");

function saveCards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayCard() {
    questionElement.textContent = flashcards[currentCard].question;
    answerElement.textContent = "";
    cardNumberElement.textContent =
        `${currentCard + 1} / ${flashcards.length}`;

    showAnswerButton.textContent = "Show Answer";
    const progress = ((currentCard + 1) / flashcards.length) * 100;
progressBar.style.width = progress + "%";
progressText.textContent =
    `Study Progress: ${Math.round(progress)}%`;
}

function showAnswer() {
    answerElement.textContent = flashcards[currentCard].answer;
    showAnswerButton.textContent = "Answer Shown";
}

function nextCard() {
    if (currentCard < flashcards.length - 1) {
        currentCard++;
        displayCard();
    }
}

function previousCard() {
    if (currentCard > 0) {
        currentCard--;
        displayCard();
    }
}

function addCard() {
    const question = prompt("Enter the question:");
    const answer = prompt("Enter the answer:");

    if (question && answer) {
        flashcards.push({
            question: question,
            answer: answer
        });

        saveCards();

        currentCard = flashcards.length - 1;
        displayCard();
    }
}

function editCard() {
    const newQuestion = prompt(
        "Edit the question:",
        flashcards[currentCard].question
    );

    const newAnswer = prompt(
        "Edit the answer:",
        flashcards[currentCard].answer
    );

    if (newQuestion && newAnswer) {
        flashcards[currentCard].question = newQuestion;
        flashcards[currentCard].answer = newAnswer;

        saveCards();
        displayCard();
    }
}

function deleteCard() {
    if (flashcards.length === 1) {
        alert("You need at least one flashcard.");
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete this card?"
    );

    if (confirmDelete) {
        flashcards.splice(currentCard, 1);

        if (currentCard >= flashcards.length) {
            currentCard = flashcards.length - 1;
        }

        saveCards();
        displayCard();
    }
}

displayCard();