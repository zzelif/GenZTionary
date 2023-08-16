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
    question: "Complete the sentence: '____, naubos na baon ko.'",
    choice1: "🗣 Awit",
    choice2: "🤔 Bano",
    choice3: "👭 Bes",
    choice4: "🌈 Baks",
    answer: 1
  },
  {
    question: "Complete the sentence: 'Dino-_____ mo ‘ko eh!'",
    choice1: "🐶 Dogshow",
    choice2: "👎 Cheugy",
    choice3: "🤠 Clout chaser",
    choice4: "✋ Catch these hands",
    answer: 1
  },
  {
    question: "Complete the sentence: 'Ang dami mong ____.'",
    choice1: "🔥 Drag",
    choice2: "👤 Doxx",
    choice3: "😩 Deadass",
    choice4: "👄 Ebas",
    answer: 4
  },
  {
    question: "Complete the sentence: '____, 'di ako papayag.'",
    choice1: "💥 GTFO",
    choice2: "😳 Naur",
    choice3: "😱 FML",
    choice4: "✨ Expose thread",
    answer: 2
  },
  {
    question: "Complete the sentence: '____ kaaaa!'",
    choice1: "👵 Hag",
    choice2: "⏰ H hours",
    choice3: "🎯 Eme / Emz",
    choice4: "🐴 Hauf",
    answer: 4
  },
  {
    question: "Complete the sentence: ‘Di ka talaga namin gusto ____.'",
    choice1: "👅 Liborda",
    choice2: "🛡 Kupal",
    choice3: "🪦 KYS",
    choice4: "😵‍💫 FR",
    answer: 4
  },
  {
    question: "Complete the sentence: 'Oh tapos, ____?'",
    choice1: "😳 NAAAUUURR",
    choice2: "😗 NGL",
    choice3: "😛 Not you tho",
    choice4: "👍 SML",
    answer: 4
  },
  {
    question: "Complete the sentence: 'Oh you bought that girl flowers? Stop being a ____ bro hahaha'",
    choice1: "🧠 R word",
    choice2: "😝 Simp",
    choice3: "👄 Rapsa",
    choice4: "🍆 Ratbu",
    answer: 2
  },
  {
    question: "Complete the sentence: 'Sino na naman ka-____ mo?'",
    choice1: "🤣 Sksksksksksksks",
    choice2: "💁‍♀️ SKL",
    choice3: "🔫 Warla",
    choice4: "👍🏼 SML",
    answer: 3
  },
  {
    question: "Complete the sentence: 'Kakalungkot naman ____.'",
    choice1: "💪 Sakalam",
    choice2: "⚱️ Reincarnate",
    choice3: "🤡 Ratio'd",
    choice4: "🤩 Yarn",
    answer: 4
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

