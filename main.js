/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')
const buttonGhost = document.querySelectorAll('.button--ghost')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".icon-next",
        prevEl: ".icon-prev",
    },
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 16,
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


// Open the modal when the "Guide" button is clicked
const guideButton = document.getElementById("guideButton");
const guideModal = document.getElementById("guideModal");
const closeButton = document.getElementsByClassName("close")[0];

guideButton.addEventListener("click", () => {
  guideModal.style.display = "block";
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
  guideModal.style.display = "none";
});

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target == guideModal) {
    guideModal.style.display = "none";
  }
});


// ============ WORD OF THE DAY ============ //
const wordOfTheDaySection = document.getElementById("word");

// Function to change the word of the day
function changeWordOfTheDay() {
  const words = [
    {
      word: "🤩 Yarn",
      definition: "Another version of 'yan'",
      example: 'Example: "Ano ba yarn?"',
      language: "Filipino",
    },
    {
      word: "💀 Amp",
      definition: "A shorter version of amp*ta",
      example: 'Example: "Bobo amp"',
      language: "Filipino",
    },

    {
      word: "🧢 Cap",
      definition: "Lies / Lying",
      example: 'Example: " No cap!"',
      language: "English",
    },
  ];

  // Get a random index to select a new word
  const randomIndex = Math.floor(Math.random() * words.length);

  // Get the selected word from the array
  const selectedWord = words[randomIndex];

  // Update the content with the new word
  wordOfTheDaySection.querySelector(".word").textContent = selectedWord.word;
  wordOfTheDaySection.querySelector(".definition").textContent = selectedWord.definition;
  wordOfTheDaySection.querySelector(".example").textContent = selectedWord.example;
  wordOfTheDaySection.querySelector(".language").textContent = selectedWord.language;
}

// Call the function once to change the word on page load
changeWordOfTheDay();

// Schedule to change the word every 24 hours (86400000 milliseconds)
setInterval(changeWordOfTheDay, 5000);


// ============ DICTIONARY ================= //
document.addEventListener('DOMContentLoaded', () => {
  const batches = document.querySelectorAll('.batch');
  const learnMoreButtons = document.querySelectorAll('.learn-more');
  const modal = document.querySelector('.modal');
  const modalWord = document.getElementById('modal-word');
  const modalDescription = document.getElementById('modal-description');
  const modalExample = document.getElementById('modal-example');
  const modalLanguage = document.getElementById('modal-language');
  const closeButton2 = document.querySelector('.close2');
  const previousButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');
  const audioPlayer = document.getElementById('modal-audio');
  const audioSourceElement = document.getElementById('audio-source');
  let currentBatchIndex = 0;
	
   function playAudio(audioSource) {
    if (audioPlayer) {
      audioSourceElement.src = audioSource;
      audioPlayer.load();
      audioPlayer.play();
    }
  }

  function showBatch(index) {
    batches.forEach((batch, i) => {
      if (i === index) {
        batch.style.display = "grid";
        batch.classList.add("active");
      } else {
        batch.style.display = "none";
        batch.classList.remove("active");
      }
    });
    
    if (currentBatchIndex === 0) {
      previousButton.style.display = 'none';
      nextButton.style.display = 'inline-block';

    } else if (currentBatchIndex === batches.length - 1) {
      previousButton.style.display = 'inline-block';
      nextButton.style.display = 'none';
      
    } else {
      previousButton.style.display = 'inline-block';
      nextButton.style.display = 'inline-block';
    }
    
    currentBatchIndex = index;
  }

  function showModal(word, description, example, language, audioSource) {
    modalWord.textContent = word;
    modalDescription.textContent = description;
    modalExample.textContent = example;
    modalLanguage.textContent = language;
    modal.style.display = 'block';
	playAudio(audioSource); 
  }

  function hideModal() {
    modal.style.display = 'none';
	if (audioPlayer) {
      audioPlayer.pause();
      audioSourceElement.src = "";
    }
  }

  learnMoreButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const word = button.dataset.word;
      const description = button.dataset.description;
      const example = button.dataset.example;
      const language = button.dataset.language;
      const audioSource = button.dataset.audio;
      showModal(word, description, example, language, audioSource);
    });
  });

  closeButton2.addEventListener('click', hideModal);

  previousButton.addEventListener('click', () => {
    const currentBatch = document.querySelector('.batch.active');
    const previousBatch = currentBatch.previousElementSibling;
    if (previousBatch && previousBatch.classList.contains('batch')) {
      currentBatchIndex--;
      showBatch(currentBatchIndex);
    }
  });

  nextButton.addEventListener('click', () => {
    const currentBatch = document.querySelector('.batch.active');
    const nextBatch = currentBatch.nextElementSibling;
    if (nextBatch && nextBatch.classList.contains('batch')) {
      currentBatchIndex++;
      showBatch(currentBatchIndex);
    }
  });

  // Show the initial batch
  showBatch(0, 1, 2, 3, 4);
  console.log("current: " + currentBatchIndex);
});

document.addEventListener('DOMContentLoaded', () => {
  const moreButton = document.querySelector(".prev-words .more");
  const lessButton = document.querySelector(".prev-words .less");
  const moreWords = document.querySelector(".prev-words .more-words");

  moreWords.style.display = "none";
  lessButton.style.display = "none";

  moreButton.addEventListener('click', () => {
    moreWords.style.transform = "translateY(-15%)";
    moreWords.style.display = "grid";
    moreButton.style.display = "none";
    lessButton.style.display = "block";
    setTimeout(() => {
      moreWords.style.transform = "translateY(-5%)";
      moreWords.style.transitionTimingFunction = "ease-in-out";
      setTimeout(() => {
        moreWords.style.transform = "translateY(0)";
      }, 50);
    }, 50);
  });

  lessButton.addEventListener('click', () => {
    moreWords.style.transform = "translateY(-5%)";
    moreWords.style.transitionTimingFunction = "ease-in-out";   
    setTimeout(() => {
      moreWords.style.transform = "translateY(-15%)";
      setTimeout(() => {
        moreWords.style.display = "none";
        moreButton.style.display = "block";
        lessButton.style.display = "none";
      }, 50);
    }, 50);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const moreButton = document.querySelector(".know-more .more");
  const lessButton = document.querySelector(".know-more .less");
  const moreWords = document.querySelector(".know-more .more-words");

  moreWords.style.display = "none";
  lessButton.style.display = "none";

  moreButton.addEventListener('click', () => {
    moreWords.style.transform = "translateY(-15%)";
    moreWords.style.display = "grid";
    moreButton.style.display = "none";
    lessButton.style.display = "block";
    setTimeout(() => {
      moreWords.style.transform = "translateY(-5%)";
      moreWords.style.transitionTimingFunction = "ease-in-out";
      setTimeout(() => {
        moreWords.style.transform = "translateY(0)";
      }, 50);
    }, 50);
  });

  lessButton.addEventListener('click', () => {
    moreWords.style.transform = "translateY(-5%)";
    moreWords.style.transitionTimingFunction = "ease-in-out";   
    setTimeout(() => {
      moreWords.style.transform = "translateY(-15%)";
      setTimeout(() => {
        moreWords.style.display = "none";
        moreButton.style.display = "block";
        lessButton.style.display = "none";
      }, 50);
    }, 50);
  });
});


// SUBMIT NEW WORD FUNCTION
document.addEventListener("DOMContentLoaded", function() {
  // Get the modal and the button to open the modal
  var modal = document.getElementById("dictionaryModal");
  var openModalButton = document.getElementById("openModalButton");

  // Get the form and the container
  var form = document.getElementById("wordForm");
  var container = document.getElementById("messageContainer");

  // Function to open the modal
  function openModal() {
    modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    // Get the values from the form inputs
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var newword = document.getElementById("newword").value;
    var meaning = document.getElementById("meaning").value;
    var example = document.getElementById("example").value;
    var language = document.getElementById("language").value;

    // Create a new message element to display the submitted details
    var messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `
	Submission of New Word <br>
      <strong>Username:</strong> ${username}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>New Word:</strong> ${newword}<br>
      <strong>Meaning:</strong> ${meaning}<br>
      <strong>Example:</strong> ${example}<br>
      <strong>Language:</strong> ${language}
    `;

    // Append the message element to the container
    container.appendChild(messageElement);

    // Scroll to the bottom of the container to show the latest message
    container.scrollTop = container.scrollHeight;

    // Reset the form fields after submission
    form.reset();

    // Close the modal after submission
    closeModal();
  }

  // Attach the openModal function to the button's click event
  openModalButton.addEventListener("click", openModal);

  // Attach the closeModal function to the modal's close button
  var closeButton = document.querySelector(".modal .closemodal");
  closeButton.addEventListener("click", closeModal);

  // Close the modal if the user clicks outside of it
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Attach the handleSubmit function to the form's submit event
  form.addEventListener("submit", handleSubmit);
});


// SCROLL REVEAL
// Wrap the initialization in a function and execute it after the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollReveal();
});

function initializeScrollReveal() {
  // Initialize the ScrollReveal library with some options
  ScrollReveal({
    reset: false,
    distance: '80px',
    duration: 2000,
    delay: 200
  });

  // Reveal some elements with different origins
  ScrollReveal().reveal('.section__title', { origin: 'top' });
  ScrollReveal().reveal('.about__description, .more, .game__title, .newsletter__description, .description_Word, .word, .image, .newsletter__form, .footer__container', { origin: 'bottom' });
  ScrollReveal().reveal('.category__img, .buttongame, .word-box, .footer__img-two', { origin: 'right' });
  ScrollReveal().reveal('.category__title, .category__description, .game__container, .footer__img-one', { origin: 'left' });
}
