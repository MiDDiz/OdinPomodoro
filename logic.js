//Get documents
const btnStart = document.getElementById('start_button');
const btnPause = document.getElementById('pause_button');
const spnClock = document.getElementById('clock_numbers');
const txtClock = document.getElementById('clock_numbers');
const divDecorations = document.querySelectorAll(".working-bar-horizontal");

//Initial Variables
//TODO: Get this through the page
let minutes = 24;
let seconds = 59;
var myTimer;
let paused = false;

//State true -> working. State false -> Relaxing.
let state_of_work = true;

function changeState() {
    
    if (paused){
        /*Quick Fix tbh i didnt want to spend much time implementing pause*/
        /*TODO: MUST IMPLEMENT THE LOGIC WHEN GOING OUT OF PAUSE*/
        if(state_of_work){
            spnClock.classList.replace('working-state', 'paused-state');
        divDecorations.forEach(e => {
            e.classList.replace('working-state', 'paused-state');
        });
        }
        else{
            spnClock.classList.replace('relaxed-state', 'paused-state');
            divDecorations.forEach(e => {
            e.classList.replace('relaxed-state', 'paused-state');
        });
        }
        return;
    }
	if (state_of_work) {
        spnClock.classList.replace('working-state', 'relaxed-state');
        divDecorations.forEach(e => {
            e.classList.replace('working-state', 'relaxed-state');
        });

		minutes = 4;
		seconds = 59;
	} else {
        spnClock.classList.replace('relaxed-state', 'working-state');
        divDecorations.forEach(e => {
            e.classList.replace('relaxed-state', 'working-state');
        });

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
    paused = false;
}

function pauseClock() {
    clearInterval(myTimer);
    paused = true;
    changeState();
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
