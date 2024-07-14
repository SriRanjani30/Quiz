// Define quiz questions and answers
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
const submitButton = document.getElementById('submit');

// Function to display quiz questions
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
      `<div class="question">${currentQuestion.question}</div>
      <div class="answers">${answers.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

// Function to show results after quiz submission
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

// Display quiz on page load
buildQuiz();

// Event listener for quiz submission
submitButton.addEventListener('click', showResults);
