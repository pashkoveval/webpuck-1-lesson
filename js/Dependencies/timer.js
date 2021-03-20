import {Howl} from 'howler';

let myTimer;
const h = document.getElementById('h');
const m = document.getElementById('m');
const s = document.getElementById('s');
const timerClock = document.getElementById('timerClock');
const start = document.querySelector('.startt');
const stopt = document.querySelector('.stop');
const inputsBlock = document.querySelector('.inputs');
const error = document.querySelector('.error');

let sound = new Howl({
	src: ['../audio/ring.mp3']
});

let inputs = [h, m, s];

inputs.forEach(el => {
	el.addEventListener('input', () => {
		getTime();
	});
});

start.addEventListener('click', () => {
	if (h.value != 0 || m.value != 0 || s.value != 0) {
		clock();
		inputsBlock.style.display = 'none';
		stopt.style.display = 'block';
		start.style.display = 'none';
		error.innerHTML = '';
	} else {
		error.innerHTML = `
        <span class="datecalc-res-red">Введите время для таймера!</span>
        `;
	}
});
stopt.addEventListener('click', () => {
	stopt.style.display = 'none';
	start.style.display = 'block';
	inputsBlock.style.display = 'flex';
	sound.stop();
	clearInterval(myTimer);
	timerClock.innerHTML = '00:00:00';
	inputs.forEach(el => {
		el.value = '';
	});
	error.innerHTML = '';
});


function getTime() {
	return (+h.value * 3600) + (+m.value * 60) + +s.value;
}

function clock() {
	let c = getTime();
	myClock();
	myTimer = setInterval(myClock, 1000);


	function myClock() {

		let seconds = c % 60;
		let secondsInMinutes = (c - seconds) / 60;
		let minutes = secondsInMinutes % 60;
		let hours = (secondsInMinutes - minutes) / 60;
		console.clear();
		if (hours < 10) {
			hours = '0' + hours;
		}

		if (minutes < 10) {
			minutes = '0' + minutes;
		}

		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		timerClock.innerHTML = hours + ':' + minutes + ':' + seconds;

		if (c == 0) {
			sound.play();
			clearInterval(myTimer);
			error.innerHTML = `
        <span class="datecalc-res-red">БРРРРРР!</span>
        `;
		}
		c--;
	}
}