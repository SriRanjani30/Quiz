const quizData = [
  {
    question: "What is the capital of France?",
    a: "Paris",
    b: "Madrid",
    c: "Rome",
    correct: "a"
  },
  {
    question: "What is 2 + 2?",
    a: "3",
    b: "4",
    c: "5",
    correct: "b"
  },
  {
    question: "Which is the largest planet in our solar system?",
    a: "Earth",
    b: "Saturn",
    c: "Jupiter",
    correct: "c"
  }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');

let currentQuestionIndex = 0;

function buildQuiz() {
  const output = [];

  quizData.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (const option in currentQuestion) {
      if (option !== 'correct' && option !== 'question') {
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${option}">
            ${currentQuestion[option]}
          </label>`
        );
      }
    }

    output.push(
      `<div class="question-container ${questionNumber === 0 ? '' : 'hidden'}">
        <div class="question">${currentQuestion.question}</div>
        <div class="answers">${answers.join('')}</div>
      </div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let score = 0;

  quizData.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correct) {
      score++;
      answerContainers[questionNumber].style.color = 'lightgreen';
    } else {
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  resultsContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

function showQuestion(index) {
  const questionContainers = document.querySelectorAll('.question-container');
  questionContainers.forEach((container, idx) => {
    container.classList.toggle('hidden', idx !== index);
  });

  previousButton.style.display = index === 0 ? 'none' : 'inline-block';
  nextButton.style.display = index === quizData.length - 1 ? 'none' : 'inline-block';
  submitButton.classList.toggle('hidden', index !== quizData.length - 1);
}

buildQuiz();
showQuestion(currentQuestionIndex);

previousButton.addEventListener('click', () => {
  currentQuestionIndex--;
  showQuestion(currentQuestionIndex);
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  showQuestion(currentQuestionIndex);
});

submitButton.addEventListener('click', showResults);
