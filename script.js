const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const congratsMessageContainer = document.getElementById('congrats-message');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');

let currentQuestionIndex = 0;
let quizData = [];

async function fetchQuizData() {
  const response = await fetch("https://opentdb.com/api.php?amount=5&category=23&difficulty=easyr"); // Fetching 10 questions from the Science: Computers category
  const data = await response.json();
  quizData = data.results.map((question) => {
    const formattedQuestion = {
      question: question.question,
      a: question.correct_answer,
      b: question.incorrect_answers[0],
      c: question.incorrect_answers[1],
      d: question.incorrect_answers[2],
      correct: "a"
    };
    return formattedQuestion;
  });
  shuffle(quizData);
  buildQuiz();
  showQuestion(currentQuestionIndex);
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
  displayCongratsMessage(score, quizData.length);
}

function displayCongratsMessage(score, total) {
  let message = "";

  if (score === total) {
    message = "Congratulations! You got all the answers correct!";
  } else if (score > total / 2) {
    message = "Good job! You scored more than half.";
  } else {
    message = "Better luck next time! Keep practicing.";
  }

  congratsMessageContainer.innerHTML = message;
  congratsMessageContainer.classList.remove('hidden');
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

fetchQuizData();

previousButton.addEventListener('click', () => {
  currentQuestionIndex--;
  showQuestion(currentQuestionIndex);
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  showQuestion(currentQuestionIndex);
});

submitButton.addEventListener('click', showResults);
