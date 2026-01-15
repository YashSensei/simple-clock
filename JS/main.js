// ==================== THEME TOGGLE ====================
function toggleClass() {
    const body = document.querySelector('body');
    body.classList.toggle('light');
    body.style.transition = '0.3s linear';
}

// ==================== TAB NAVIGATION ====================
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetTab) {
                section.classList.add('active');
            }
        });
    });
});

// ==================== ALARM (defined first since clock uses checkAlarms) ====================
var alarms = [];
var alarmIdCounter = 0;
const alarmSound = document.querySelector('#alarm-sound');

const alarmHoursInput = document.querySelector('#alarm-hours');
const alarmMinutesInput = document.querySelector('#alarm-minutes');
const alarmSetBtn = document.querySelector('#alarm-set');
const alarmItems = document.querySelector('#alarm-items');

function formatAlarmTime(hours, minutes) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

function renderAlarms() {
    alarmItems.innerHTML = '';

    if (alarms.length === 0) {
        alarmItems.innerHTML = '<li class="no-alarms">No alarms set</li>';
        return;
    }

    alarms.forEach(alarm => {
        const li = document.createElement('li');
        li.className = 'alarm-item';
        li.innerHTML = `
            <span class="alarm-time">${formatAlarmTime(alarm.hours, alarm.minutes)}</span>
            <button class="alarm-delete" data-id="${alarm.id}">Delete</button>
        `;
        alarmItems.appendChild(li);
    });

    // Add delete event listeners
    document.querySelectorAll('.alarm-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            alarms = alarms.filter(a => a.id !== id);
            renderAlarms();
        });
    });
}

alarmSetBtn.addEventListener('click', () => {
    const hours = parseInt(alarmHoursInput.value);
    const minutes = parseInt(alarmMinutesInput.value);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        alert('Please enter a valid time');
        return;
    }

    alarms.push({
        id: alarmIdCounter++,
        hours: hours,
        minutes: minutes,
        triggered: false
    });

    renderAlarms();
});

function checkAlarms(currentTime) {
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    alarms.forEach(alarm => {
        if (!alarm.triggered &&
            alarm.hours === currentHours &&
            alarm.minutes === currentMinutes &&
            currentSeconds === 0) {

            alarm.triggered = true;

            // Play alarm sound
            alarmSound.currentTime = 0;
            alarmSound.play();

            // Show notification
            setTimeout(() => {
                alert(`Alarm! It's ${formatAlarmTime(alarm.hours, alarm.minutes)}`);
                // Remove triggered alarm
                alarms = alarms.filter(a => a.id !== alarm.id);
                renderAlarms();
            }, 100);
        }
    });

    // Reset triggered flag at the start of each minute
    if (currentSeconds === 1) {
        alarms.forEach(alarm => {
            alarm.triggered = false;
        });
    }
}

// Initialize alarm list
renderAlarms();

// ==================== ANALOG CLOCK ====================
const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');
const digitalTime = document.querySelector('#digital-time');

function updateClock() {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;

    // Update digital time display
    digitalTime.textContent = day.toLocaleTimeString();

    // Check alarms
    checkAlarms(day);
}

setInterval(updateClock, 1000);
updateClock();

// ==================== STOPWATCH ====================
let stopwatchInterval = null;
let stopwatchTime = 0;
let stopwatchRunning = false;
let lapCount = 0;

const stopwatchDisplay = document.querySelector('#stopwatch-time');
const stopwatchStartBtn = document.querySelector('#stopwatch-start');
const stopwatchStopBtn = document.querySelector('#stopwatch-stop');
const stopwatchResetBtn = document.querySelector('#stopwatch-reset');
const stopwatchLapBtn = document.querySelector('#stopwatch-lap');
const lapList = document.querySelector('#lap-list');

function formatStopwatchTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
}

stopwatchStartBtn.addEventListener('click', () => {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        const startTime = Date.now() - stopwatchTime;

        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);

        stopwatchStartBtn.disabled = true;
        stopwatchStopBtn.disabled = false;
        stopwatchLapBtn.disabled = false;
    }
});

stopwatchStopBtn.addEventListener('click', () => {
    if (stopwatchRunning) {
        stopwatchRunning = false;
        clearInterval(stopwatchInterval);

        stopwatchStartBtn.disabled = false;
        stopwatchStopBtn.disabled = true;
        stopwatchResetBtn.disabled = false;
    }
});

stopwatchResetBtn.addEventListener('click', () => {
    stopwatchTime = 0;
    lapCount = 0;
    updateStopwatchDisplay();
    lapList.innerHTML = '';
    stopwatchResetBtn.disabled = true;
    stopwatchLapBtn.disabled = true;
});

stopwatchLapBtn.addEventListener('click', () => {
    if (stopwatchRunning) {
        lapCount++;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${formatStopwatchTime(stopwatchTime)}`;
        lapList.insertBefore(lapItem, lapList.firstChild);
    }
});

// ==================== TIMER ====================
let timerInterval = null;
let timerTime = 0;
let timerRunning = false;
let timerPaused = false;

const timerSetup = document.querySelector('#timer-setup');
const timerDisplayDiv = document.querySelector('#timer-display');
const timerTimeDisplay = document.querySelector('#timer-time');
const timerHoursInput = document.querySelector('#timer-hours');
const timerMinutesInput = document.querySelector('#timer-minutes');
const timerSecondsInput = document.querySelector('#timer-seconds');
const timerStartBtn = document.querySelector('#timer-start');
const timerPauseBtn = document.querySelector('#timer-pause');
const timerResumeBtn = document.querySelector('#timer-resume');
const timerCancelBtn = document.querySelector('#timer-cancel');
const presetBtns = document.querySelectorAll('.preset-btn');

function formatTimerTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerTimeDisplay.textContent = formatTimerTime(timerTime);
}

function startTimer() {
    const hours = parseInt(timerHoursInput.value) || 0;
    const minutes = parseInt(timerMinutesInput.value) || 0;
    const seconds = parseInt(timerSecondsInput.value) || 0;

    timerTime = hours * 3600 + minutes * 60 + seconds;

    if (timerTime <= 0) return;

    timerRunning = true;
    timerPaused = false;

    timerSetup.style.display = 'none';
    timerDisplayDiv.style.display = 'block';
    timerStartBtn.style.display = 'none';
    timerPauseBtn.style.display = 'inline-block';
    timerCancelBtn.style.display = 'inline-block';

    updateTimerDisplay();

    timerInterval = setInterval(() => {
        if (timerTime > 0) {
            timerTime--;
            updateTimerDisplay();
        } else {
            timerComplete();
        }
    }, 1000);
}

function timerComplete() {
    clearInterval(timerInterval);
    timerRunning = false;

    // Play alarm sound
    alarmSound.currentTime = 0;
    alarmSound.play();

    // Flash the display
    timerDisplayDiv.classList.add('timer-complete');

    setTimeout(() => {
        timerDisplayDiv.classList.remove('timer-complete');
        resetTimerUI();
        alert('Timer Complete!');
    }, 3000);
}

function resetTimerUI() {
    timerSetup.style.display = 'block';
    timerDisplayDiv.style.display = 'none';
    timerStartBtn.style.display = 'inline-block';
    timerPauseBtn.style.display = 'none';
    timerResumeBtn.style.display = 'none';
    timerCancelBtn.style.display = 'none';
}

timerStartBtn.addEventListener('click', startTimer);

timerPauseBtn.addEventListener('click', () => {
    if (timerRunning && !timerPaused) {
        timerPaused = true;
        clearInterval(timerInterval);
        timerPauseBtn.style.display = 'none';
        timerResumeBtn.style.display = 'inline-block';
    }
});

timerResumeBtn.addEventListener('click', () => {
    if (timerPaused) {
        timerPaused = false;
        timerResumeBtn.style.display = 'none';
        timerPauseBtn.style.display = 'inline-block';

        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                updateTimerDisplay();
            } else {
                timerComplete();
            }
        }, 1000);
    }
});

timerCancelBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPaused = false;
    timerTime = 0;
    resetTimerUI();
});

// Timer presets
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const time = parseInt(btn.dataset.time);
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        timerHoursInput.value = hours;
        timerMinutesInput.value = minutes;
        timerSecondsInput.value = seconds;
    });
});
