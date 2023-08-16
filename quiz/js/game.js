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
    question: "Used to refer to someone who follows mainstream or unoriginal trends; can be used as a derogatory term",
    choice1: "👌 Basic",
    choice2: "🤔 Bano",
    choice3: "👭 Bes",
    choice4: "🌈 Baks",
    answer: 1
  },
  {
    question:
      "Someone who posts controversial things to get attention",
    choice1: "😂 Chariz",
    choice2: "👎 Cheugy",
    choice3: "🤠 Clout chaser",
    choice4: "✋ Catch these hands",
    answer: 3
  },
  {
    question: "Shorthand for delikado or dangerous",
    choice1: "🔥 Drag",
    choice2: "👤 Doxx",
    choice3: "😩 Deadass",
    choice4: "👀 Deliks",
    answer: 4
  },
  {
    question: "Friends with benefits; slang for someone you have a casual sexual relationship with",
    choice1: "💥 GTFO",
    choice2: "💋 Fubu / FWB",
    choice3: "😱 FML",
    choice4: "✨ Expose thread",
    answer: 2
  },
  {
    question:
      "Slang, depends on the context, usually like thingy",
    choice1: "👵 Hag",
    choice2: "⏰ H hours",
    choice3: "🎯 Eme / Emz",
    choice4: "🐴 Hauf",
    answer: 3
  },
  {
    question: "Unruly behavior typically attributed to bad drivers",
    choice1: "👅 Liborda",
    choice2: "🛡 Kupal",
    choice3: "🪦 KYS",
    choice4: "🍠 Kamote",
    answer: 4
  },
  {
    question: "A put down",
    choice1: "😳 NAAAUUURR",
    choice2: "😗 NGL",
    choice3: "😛 Not you tho",
    choice4: "😰 Obob",
    answer: 4
  },
  {
    question: "A person who is lacking attention",
    choice1: "🧠 R word",
    choice2: "👩 Pick me girl",
    choice3: "👄 Rapsa",
    choice4: "🍆 Ratbu",
    answer: 2
  },
  {
    question:
      "Derogatory term for someone who does way too much for the person they have a crush on",
    choice1: "🤣 Sksksksksksksks",
    choice2: "💁‍♀️ SKL",
    choice3: "😝 Simp",
    choice4: "👍🏼 SML",
    answer: 3
  },
  {
    question: "You've done something embarrassing",
    choice1: "💪 Sakalam",
    choice2: "⚱️ Reincarnate",
    choice3: "🤡 Ratio'd",
    choice4: "🕹 Roblox oof",
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
