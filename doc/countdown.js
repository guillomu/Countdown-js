var ring = new Audio('sound/microwave.mp3');
var buttonText = document.getElementById('button-text');
var circle = document.getElementById('circle');
var countdown = 0;
var startCountdown = 0;
var myTimerSpeed = 10;
var myTimer;
var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;

var start = document.getElementById('start');
var stop = document.getElementById('stop');
var resume =document.getElementById('resume');
var reset =document.getElementById('reset');



/* -------------- ONCLICK START -------------- */
start.onclick = function(){
	console.log('Start Timer');

	buttonText.textContent = 'Stop';
	stop.style.display = 'inline';
	reset.style.display = 'inline';
	start.style.display = 'none';

	startCountdown = setTime();
	countdown = startCountdown;

	circle.style.animation = 'countdown ' + countdown/100 + 's linear 1 forwards reverse';
	myTimer = setInterval(timerTick, myTimerSpeed);
}

/* -------------- ONCLICK STOP -------------- */
stop.onclick = function(){
	console.log('Pause Timer');
	circle.style.animationPlayState = 'paused';

	clearInterval(myTimer);

	buttonText.textContent = 'Resume';
	stop.style.display = 'none';
	resume.style.display = 'inline';
}

/* -------------- ONCLICK RESUME -------------- */
resume.onclick = function(){
	console.log('Resume Timer');
	circle.style.animationPlayState = 'running';

	myTimer = setInterval(timerTick, myTimerSpeed);

	buttonText.textContent = 'Stop';
	resume.style.display = 'none';
	stop.style.display = 'inline';
}

/* -------------- ONCLICK RESET -------------- */
reset.onclick = function(){
	console.log('Reset Timer');
	
	clearTimer();

	days = Math.floor(startCountdown / (100 * 60 * 60 * 24));
	hours = Math.floor((startCountdown % (100 * 60 * 60 * 24)) / (100 * 60 * 60));
	minutes = Math.floor((startCountdown % (100 * 60 * 60)) / (100 * 60));
	seconds = Math.floor((startCountdown % (100 * 60)) / 100);

	document.forms["setTime"].elements["days"].value = days;
	document.forms["setTime"].elements["hours"].value = hours;
	document.forms["setTime"].elements["minutes"].value = minutes;
	document.forms["setTime"].elements["seconds"].value = seconds;

}

/* -------------- INTERVAL TICKS -------------- */
function timerTick(){
	countdown--;

	days = Math.floor(countdown / (100 * 60 * 60 * 24));
	hours = Math.floor((countdown % (100 * 60 * 60 * 24)) / (100 * 60 * 60));
	minutes = Math.floor((countdown % (100 * 60 * 60)) / (100 * 60));
	seconds = Math.floor((countdown % (100 * 60)) / 100);


	document.forms["setTime"].elements["days"].value = (days < 0) ? 0 : days;
	document.forms["setTime"].elements["hours"].value = (hours < 0) ? 0 : hours;
	document.forms["setTime"].elements["minutes"].value = (minutes < 0) ? 0 : minutes;
	document.forms["setTime"].elements["seconds"].value = (seconds < 0) ? 0 : seconds;


	console.log('countdown = '+ parseInt(countdown/100));

	// Si le minuteur est terminer on arrete setInterval et l'animation css
	if(countdown <= 0){
		clearTimer();
		buttonText.textContent = 'Done!';
		buttonText.style.animation = 'blink 3s linear infinite';

		ring.play();
		
		setTimeout(function(){ buttonText.style.animation = 'none'; buttonText.textContent = 'Start'; }, 3000);
	} 
}

/* -------------- CLEAR -------------- */
function clearTimer(){
	clearInterval(myTimer);

	buttonText.textContent = 'Start';
	circle.style.animation = 'none';
	start.style.display = 'inline';
	stop.style.display = 'none';
	resume.style.display = 'none';
	reset.style.display = 'none';
}

/* -------------- SET TIME -------------- */
function setTime(){
	days = parseInt(document.forms["setTime"].elements["days"].value);
	hours = parseInt(document.forms["setTime"].elements["hours"].value);
	minutes = parseInt(document.forms["setTime"].elements["minutes"].value);
	seconds = parseInt(document.forms["setTime"].elements["seconds"].value);

	if(isNaN(days) || days < 0){ days = 0;}
	if(isNaN(hours) || hours < 0){ hours = 0;}
	if(isNaN(minutes) || minutes < 0){ minutes = 0;}
	if(isNaN(seconds) || seconds < 0){ seconds = 0;}

	return ((days*86400)+(hours*3600)+(minutes*60)+seconds)*100;
}