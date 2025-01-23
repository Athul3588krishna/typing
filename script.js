const typingText = "In the tranquil village of Tanalur, nestled within Kerala's lush landscape...";
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const congratsPage = document.getElementById('congratsPage');
const userInput = document.getElementById('userInput');
const result = document.getElementById('result');
const timerDisplay = document.getElementById('timer');
const congratsMessage = document.getElementById('congratsMessage');
const finalResult = document.getElementById('finalResult');
const accuracyDisplay = document.getElementById('accuracyDisplay');
const mistakesDisplay = document.getElementById('mistakesDisplay');

let correctChars = 0;
let totalChars = typingText.length;
let mistakes = 0;
let timer;
let timeLeft = 15 * 60; // 15 minutes in seconds

function goToPage2() {
  const name = document.getElementById('name').value.trim();
  const course = document.getElementById('course').value.trim();

  if (name === "" || course === "") {
    alert("Please fill in your name and course!");
    return;
  }

  page1.style.display = "none";
  page2.style.display = "block";
  userInput.disabled = false; // Enable typing area

  const userNameDisplay = document.getElementById('userNameDisplay');
  userNameDisplay.innerHTML = `Hello, <strong>${name}</strong>! Start typing the text below:`;

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      userInput.disabled = true;
      result.innerHTML = "<h3>Time's up!</h3><p>Your results have been recorded.</p>";
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function checkTyping() {
  const typedText = userInput.value;
  const currentCharIndex = typedText.length - 1;

  if (currentCharIndex < 0) {
    return; // Avoid checking when nothing is typed
  }

  const currentChar = typedText[currentCharIndex];
  const expectedChar = typingText[currentCharIndex];

  // Check if the current character is correct
  if (currentChar === expectedChar) {
    correctChars++;
    // Highlight correct input in green
    userInput.style.backgroundColor = "#eaffea"; // Light green
  } else {
    mistakes++;
    // Remove incorrect character and provide feedback
    userInput.value = typedText.slice(0, -1); // Remove last incorrect character
    userInput.style.backgroundColor = "#ffe6e6"; // Light red
  }

  // Update live statistics
  updateStats();

  // End typing when the entire text matches
  if (typedText === typingText) {
    clearInterval(timer);
    showCongratulations();
  }
}

function updateStats() {
  const accuracy = ((correctChars / (correctChars + mistakes)) * 100).toFixed(2);
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
  mistakesDisplay.textContent = `Mistakes: ${mistakes}`;
}

function submitTyping() {
  clearInterval(timer); // Stop the timer
  userInput.disabled = true; // Disable typing

  const accuracy = ((correctChars / (correctChars + mistakes)) * 100).toFixed(2);

  result.innerHTML = `
    <h3>Results</h3>
    <p><strong>Correct Characters:</strong> ${correctChars}</p>
    <p><strong>Incorrect Characters:</strong> ${mistakes}</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
  `;
}

function showCongratulations() {
  const name = document.getElementById('name').value.trim();
  const course = document.getElementById('course').value.trim();

  page2.style.display = "none";
  congratsPage.style.display = "block";

  const accuracy = ((correctChars / (correctChars + mistakes)) * 100).toFixed(2);

  congratsMessage.innerHTML = `Congratulations <strong>${name}</strong> from <strong>${course}</strong>! You have perfectly completed the typing competition.`;
  finalResult.innerHTML = `
    <h3>Your Results</h3>
    <p><strong>Correct Characters:</strong> ${correctChars}</p>
    <p><strong>Incorrect Characters:</strong> ${mistakes}</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
  `;
}

// Disable pasting in the input field
userInput.addEventListener('paste', (e) => {
  e.preventDefault();
  alert("Pasting is not allowed!");
});
