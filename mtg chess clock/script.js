// Get all the buttons and elapsed time elements
const buttons = document.querySelectorAll('.life-counter button');
const elapsedTimes = document.querySelectorAll('.elapsed-time');
const passPriorityButtons = document.querySelectorAll('.pass-priority');
const startTimerButtons = document.querySelectorAll('.start-timer');
const stopTimerButton = document.querySelector('.stop-timer');

// Keep track of the intervals for each player
const intervals = [null, null, null, null];

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
  // Start the stopwatch when the start timer button is clicked
  startTimerButton.addEventListener('click', () => {
    // If the stopwatch is already running, stop it
    if (intervals[index]) {
      clearInterval(intervals[index]);
    }

    // Set the start time to the current time
    const startTime = new Date().getTime();

    // Update the elapsed time every 10 milliseconds
    intervals[index] = setInterval(() => {
      const elapsedTime = new Date().getTime() - startTime;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      const milliseconds = elapsedTime % 1000;

      // Update the elapsed time element with the new value
      elapsedTimes[index].textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }, 10);
  });
});

// Loop through each pass priority button and add an event listener
passPriorityButtons.forEach((passPriorityButton, index) => {
  passPriorityButton.addEventListener('click', () => {
    // Stop the timer for the current player
    clearInterval(intervals[index]);

    // Get the current player element and the next player element
    const currentPlayerEl = passPriorityButton.closest('.player');
    const nextPlayerEl = currentPlayerEl.nextElementSibling || currentPlayerEl.parentNode.firstElementChild;

    // Add the "priority" class to the next player element and remove it from the current player element
    nextPlayerEl.classList.add('priority');
    currentPlayerEl.classList.remove('priority');

    // Start the timer for the next player
    const nextIndex = (index + 1) % 4;
    startTimerButtons[nextIndex].click();
  });
});

// Add an event listener to the stop timer button
stopTimerButton.addEventListener('click', () => {
  // Stop all the timers
  intervals.forEach(interval => {
    clearInterval(interval);
  });
});
