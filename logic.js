//Get documents
const btnStart = document.getElementById('start_button');
const btnPause = document.getElementById('pause_button');
const wrpClock = document.getElementById('clock_wrapper');
const txtClock = document.getElementById('clock_numbers');

//Initial Variables
//TODO: Get this through the page
let minutes = 24;
let seconds = 59;
var myTimer;

//State true -> working. State false -> Relaxing.
let state_of_work = true;

function changeState() {
	if (state_of_work) {
		wrpClock.classList.replace('clock_working', 'clock_relaxing');
		minutes = 4;
		seconds = 59;
	} else {
		wrpClock.classList.replace('clock_relaxing', 'clock_working');
		minutes = 24;
		seconds = 59;
	}
	state_of_work = !state_of_work;
}

function showTime(parSeconds) {
	if (seconds < 10) {
		parSeconds = '0' + seconds;
	}
	let sanitizedTime = minutes + ':' + parSeconds;
	txtClock.textContent = sanitizedTime;
}

function manageSeconds() {
	console.log(minutes + ':' + seconds);
	seconds -= 1;
	if (seconds < 0) {
		seconds = 59;
		minutes -= 1;
		if (minutes < 0) {
			changeState();
		}
	}
	showTime(seconds);
}

function startClock() {
	myTimer = setInterval(() => {
		manageSeconds();
	}, 1000);
}

function pauseClock() {
	clearInterval(myTimer);
}

btnStart.addEventListener('click', () => {
	startClock();
	btnStart.disabled = true;
});

btnPause.addEventListener('click', () => {
	pauseClock();
	console.log('PAUSA');
	btnStart.disabled = false;
});
