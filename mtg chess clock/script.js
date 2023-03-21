// Get all the buttons and elapsed time elements
const buttons = document.querySelectorAll('.life-counter button');
const elapsedTimes = document.querySelectorAll('.elapsed-time');
const passPriorityButtons = document.querySelectorAll('.pass-priority');
const startTimerButtons = document.querySelectorAll('.start-timer');
const stopTimerButton = document.querySelector('.stop-timer');

// Keep track of the intervals for each player
const intervals = [null, null, null, null];

//Track of anti-clockwise button
let antiClockwiseOn = false;

// Loop through each button and add an event listener
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the current player element and life total element
    const playerEl = button.closest('.player');
    const lifeTotalEl = playerEl.querySelector('.life-total');

    // Get the current life total and convert to a number
    let lifeTotal = parseInt(lifeTotalEl.textContent);

    // Increase or decrease the life total based on the button clicked
    if (button.classList.contains('plus-life')) {
      lifeTotal += 1;
    } else {
      lifeTotal -= 1;
    }

    // Update the life total element with the new value
    lifeTotalEl.textContent = lifeTotal;
  });
});

// Loop through each start timer button and add an event listener
startTimerButtons.forEach((startTimerButton, index) => {
  startTimerButton.addEventListener('click', () => {
    // Stop any existing intervals
    intervals.forEach(interval => clearInterval(interval));
    
    // Set the start time to the current time
    const startTime = new Date().getTime();

    // Set the interval ID in the intervals array
    intervals[index] = setInterval(() => {
      const elapsedTime = new Date().getTime() - startTime;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      const milliseconds = elapsedTime % 1000;

      // Update the elapsed time element with the new value
      elapsedTimes[index].textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }, 10);

    // Add the "priority" class to the current player element
    const currentPlayerEl = startTimerButton.closest('.player');
    currentPlayerEl.classList.add('priority');
  });
});


//listener for anticlockwise toggle
const antiClockwiseButton = document.querySelector('.anti-clockwise');
antiClockwiseButton.addEventListener('click', () => {
  antiClockwiseOn = !antiClockwiseOn;
  console.log(`Anti-clockwise is now ${antiClockwiseOn}`);
});

// Loop through each pass priority button and add an event listener
let index = 0;
passPriorityButtons.forEach((button, i) => {
  button.addEventListener('click', () => {
    console.log('passPriority clicked'); // added console log
    // Stop the timer for the current player
    clearInterval(intervals[index]);

    // Get the current player element and the next player element
    const currentPlayerEl = button.closest('.player');
    const nextPlayerEl = antiClockwiseOn ? currentPlayerEl.previousElementSibling || currentPlayerEl.parentNode.lastElementChild : currentPlayerEl.nextElementSibling || currentPlayerEl.parentNode.firstElementChild;

    // Add the "priority" class to the next player element and remove it from the current player element
    nextPlayerEl.classList.add('priority');
    currentPlayerEl.classList.remove('priority');

    // Update the index to the next player
    index = antiClockwiseOn ? (i + 3) % 4 : (i + 1) % 4;

    // Start the timer for the next player
    startTimerButtons[index].click();
  });
});

// Add an event listener to the stop timer button
stopTimerButton.addEventListener('click', () => {
  // Stop all the timers
  intervals.forEach(interval => {
    clearInterval(interval);
  });
});
