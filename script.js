let timer;
let elapsedTime = 0;
let isRunning = false;
let startTime;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const lapButton = document.getElementById('lap');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 100);
    }
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime + Date.now() - startTime);
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerText = 'Lap ' + laps.length + ': ' + lapTime;
        lapsContainer.appendChild(lapElement);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    display.innerText = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 100);
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + '.' + millisecondsFormatted;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
