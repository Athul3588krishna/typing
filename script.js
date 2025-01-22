const typingText = "The quick brown fox jumps over the lazy dog, while the curious cat watches from the window, waiting for the right moment to pounce. As the sun sets over the horizon, the bustling city slows down, and the lights flicker on, casting long shadows across the streets. People from all walks of life make their way home, weaving through the crowded sidewalks, as the distant hum of traffic and the occasional honk of a car horn fill the air. In the distance, a train whistle can be heard, signaling its departure from the station, as the night begins to settle in with a calm stillness, offering a brief respite before another busy day.";
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const congratsPage = document.getElementById('congratsPage');
const userInput = document.getElementById('userInput');
const result = document.getElementById('result');
const timerDisplay = document.getElementById('timer');
const congratsMessage = document.getElementById('congratsMessage');
const finalResult = document.getElementById('finalResult');

let correctChars = 0;
let totalChars = typingText.length;
let mistakes = 0;
let timer;
let timeLeft = 30 * 60; // 30 minutes in seconds

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
  
  // Display the user's name at the top of the typing page
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

  if (currentChar !== expectedChar) {
    mistakes++;
    userInput.value = typedText.slice(0, -1); // Remove incorrect character
  } else {
    correctChars++;
  }

  if (typedText === typingText) {
    clearInterval(timer);
    showCongratulations();
  }
}

function submitTyping() {
  clearInterval(timer); // Stop the timer
  userInput.disabled = true; // Disable typing

  const accuracy = ((correctChars / (correctChars + mistakes)) * 100).toFixed(2);
  const incorrectChars = mistakes;

  result.innerHTML = `
    <h3>Results</h3>
    <p><strong>Correct Characters:</strong> ${correctChars}</p>
    <p><strong>Incorrect Characters:</strong> ${incorrectChars}</p>
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
