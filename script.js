// Define the target answer for the game
var gameover = document.getElementsByClassName('gameover');
var gameoverScore = document.getElementById('gameover-score');const targetAnswer = 10;
let score =0;
// Generate random game elements
function generateGameElements() {
  const digits = [];
  const operators = [];

  for (let i = 0; i < 4; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  for (let i = 0; i < 4; i++) {
    operators.push(getRandomOperator(i));
  }

  return { digits, operators };
}

// Get a random operator
function getRandomOperator( i) {
  const operators = ['+', '-', '*', '/'];
  //const randomIndex = Math.floor(Math.random() * operators.length);
  return operators[i];
}

// Get the current arrangement
function getCurrentArrangement() {
  const arrangementElement = document.getElementById('arrangement');
  return arrangementElement.innerText;
}

// Add click event listeners to digits and operators
function addClickListeners() {
  const digitElements = document.querySelectorAll('.digit');
  const operatorElements = document.querySelectorAll('.operator');

  digitElements.forEach((digitElement) => {
    digitElement.addEventListener('click', () => {
      const arrangementElement = document.getElementById('arrangement');
      arrangementElement.innerText += digitElement.innerText;
    });
  });

  operatorElements.forEach((operatorElement) => {
    operatorElement.addEventListener('click', () => {
      const arrangementElement = document.getElementById('arrangement');
      arrangementElement.innerText += operatorElement.innerText;
    });
  });
}

// Function to check if the arrangement is correct
function isCorrect(arrangement, targetAnswer) {
  try {
    const result = eval(arrangement);
    return result === targetAnswer;
  } catch (error) {
    return false;
  }
}

// Handle correct answer and generate a new game
function handleCorrectAnswer() {
  const arrangementElement = document.getElementById('arrangement');
  const arrangement = getCurrentArrangement();
  const resultElement = document.getElementById('result');

  if (isCorrect(arrangement, targetAnswer)) {
    resultElement.innerText = 'Congratulations! Your answer is correct!';
    score ++;
    updateScore();
    
  } else {
    //resultElement.innerText = 'Sorry, your answer is incorrect. Please try again.';//
    window.location.href = "gameov.html";
  }

  setTimeout(() => {
    resultElement.innerText = '';
    generateNewGame();
  }, 2000);
}


function updateScore() {
  // Display the score in the HTML element with id "score"
  document.getElementById("score").textContent = `Score: ${score}`;
}


// Generate new game elements and reset the game
function generateNewGame() {
  const gameElements = generateGameElements();
  const { digits, operators } = gameElements;

  const digitsContainer = document.querySelector('.digits-container');
  const operatorsContainer = document.querySelector('.operators-container');

  digitsContainer.innerHTML = '';
  operatorsContainer.innerHTML = '';

  digits.forEach((digit) => {
    const digitElement = document.createElement('div');
    digitElement.classList.add('digit');
    digitElement.innerText = digit;
    digitsContainer.appendChild(digitElement);
  });

  operators.forEach((operator) => {
    const operatorElement = document.createElement('div');
    operatorElement.classList.add('operator');
    operatorElement.innerText = operator;
    operatorsContainer.appendChild(operatorElement);
  });

  const arrangementElement = document.getElementById('arrangement');
  arrangementElement.innerText = '';

  addClickListeners();
}

// Initialize the game on page load
window.addEventListener('DOMContentLoaded', () => {
  generateNewGame();

  const checkButton = document.getElementById('check-button');
  checkButton.addEventListener('click', () => {
    const arrangement = getCurrentArrangement();
    if (isCorrect(arrangement, targetAnswer)) {
      setResult('Congratulations! Your arrangement is correct!');
      handleCorrectAnswer();
    } else {
      //setResult('Sorry, your arrangement is incorrect. Please try again.');//
      window.location.href = "gameov.html";
    }
  });

  const nextLevelButton = document.getElementById('next-level-button');
  nextLevelButton.addEventListener('click', () => {
    generateNewGame();
  });
});

// Function to set the result message
function setResult(message) {
  const resultElement = document.getElementById('result');
  resultElement.innerText = message;
}
