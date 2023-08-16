const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What language is used in the word '😂 Chariz'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 1
  },
  {
    question: "What language is used in the word '💅 Estetik'?",
    choice1: "Filipino",
    choice2: "English",
    answer: 1
  },
  {
    question: "What language is used in the word '😝 Simp'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 2
  },
  {
    question: "What language is used in the word '🤩 Yarn'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 1
  },
  {
    question: "What language is used in the word '😖 Yataps'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 1
  },
  {
    question: "What language is used in the word '🧂 Salty'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 2
  },
  {
    question: "What language is used in the word '😳 Naur'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 1
  },
  {
    question: "What language is used in the word '✔️ Korique'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 1
  },
  {
    question: "What language is used in the word '😵‍💫 FR'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 2
  },
  {
    question: "What language is used in the word '🐶 Dogshow'? ",
    choice1: "Filipino",
    choice2: "English",
    answer: 2
  }
];

//CONSTANTS
const INCORRECT_TAX = 5;
const CORRECT_TAX = 10;
const MAX_QUESTIONS = 10;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../quiz/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }
    else
    {
      incrementScore(CORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};

//Reward for correct choice
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};



startGame();

