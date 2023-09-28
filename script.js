const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const endScreen = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("time-left");

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hypertext Markup Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correctIndex: 0,
  },
  {
    question: "Which of the following is not a programming language?",
    answers: ["JavaScript", "Java", "Hypertext Markup Language"],
    correctIndex: 2,
  },
  {
    question: "What is CSS used for?",
    answers: [
      "Styling web pages",
      "Creating databases",
      "Running server-side code",
    ],
    correctIndex: 0,
  },
];

function startQuiz() {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  timerInterval = setInterval(updateTimer, 1000);
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = `${index + 1}. ${answer}`;
    button.addEventListener("click", () => checkAnswer(index));
    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correctIndex) {
    // Correct answer
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      endQuiz();
    }
  } else {
    // Incorrect answer
    timeLeft -= 10; // Subtract time penalty
    if (timeLeft <= 0) {
      timeLeft = 0;
      endQuiz();
    }
    updateTimer();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  questionScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScoreElement.textContent = timeLeft;
}

function updateTimer() {
  timeLeftElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
  timeLeft--;
}

submitScoreButton.addEventListener("click", () => {
  const initials = initialsInput.value.trim().toUpperCase();
  if (initials) {
    const score = timeLeft;
    const scoreEntry = { initials, score };
    saveScore(scoreEntry);
    initialsInput.value = "";
  }
});

function saveScore(scoreEntry) {}

startButton.addEventListener("click", startQuiz);
