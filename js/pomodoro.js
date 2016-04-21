"use strict";
$(document).ready(function() {
	registerSounds();
	resetTimer();
	var pomodoro = initializePomodoroTimer();
	$('#working-minutes, #rest-minutes').keydown(validateNumber);
	$('#start').click(function() {
		startPomodoro(pomodoro);
	});
	$('#continue').click(function() {
		continuePomodoro(pomodoro);
	});
	$('#stop').click(function() {
		stopPomodoro(pomodoro);
	});
	$('#pause').click(function() {
		pausePomodoro(pomodoro);
	});
});

function initializePomodoroTimer() {
	return new PomodoroTimer(null, null, onTick, onTick, onWorkEnd, onRestEnd);

	function onTick(seconds) {
		var minutes = Timer.getMinutesFromTime(seconds).toLocaleString('en-US', { minimumIntegerDigits: 2 });
		var secs = Timer.getSecondsFromTime(seconds).toLocaleString('en-US', { minimumIntegerDigits: 2 });
		$('.time').text(minutes + ':' + secs);
	}

	function onWorkEnd() {
		notify("Work ended, you need some rest!");
		pomodoroRestStyle();
	}

	function onRestEnd() {
		notify("Rest ended, it`s time for work!");
		pomodoroWorkStyle();
	}

	function notify(message) {
		spawnNotification(message);
		createjs.Sound.play('notify');
	}

	function spawnNotification(message) {
		var options = {
			body: message,
			icon: 'img/notify-ico.png'
		}
		var notification = new Notification('Pomodoro', options);
	}
}

/****
Event Handlers
****/
function startPomodoro(pomodoro) {
	var workingMinues = getWorkingMinutes();
	var restMinutes = getRestMinutes();
	updateLocalStorage(workingMinues, restMinutes);
	pomodoroWorkStyle();
	pomodoro.start(Timer.convertToSeconds(0, workingMinues, 0), Timer.convertToSeconds(0, restMinutes, 0));
	$('.pomodoro-start').slideUp(500);
}

function stopPomodoro(pomodoro) {
	pomodoro.stop();
	$('.pomodoro-start').slideDown(500);
}

function pausePomodoro(pomodoro) {
	pomodoro.stop();
}

function continuePomodoro(pomodoro) {
	pomodoro.continue();
}

/****
DOM working
****/
function pomodoroWorkStyle() {
	$('.pomodoro').removeClass('green').addClass('red');
	$('.pomodoro-title').text('WORK');
}

function pomodoroRestStyle() {
	$('.pomodoro').removeClass('red').addClass('green');
	$('.pomodoro-title').text('REST');
}

function validateNumber(event) {
	if (event.keyCode !== 8 && (event.keyCode < 48 || event.keyCode > 57)) {
		event.preventDefault();
	}
}

function resetTimer() {
	Notification.requestPermission();
	if (!(localStorage.workingMinues && localStorage.restMinutes)) {
		updateLocalStorage(25, 5);
	}
	setWorkingMinutes(localStorage.workingMinues);
	setRestMinutes(localStorage.restMinutes);
}

function registerSounds() {
	createjs.Sound.registerSound('sounds/notify.mp3', 'notify');
	createjs.Sound.alternateExtensions = ['mp3'];
}

function updateLocalStorage(workingMinues, restMinutes) {
	localStorage.workingMinues = workingMinues;
	localStorage.restMinutes = restMinutes;
}

function getWorkingMinutes() {
	return $('#working-minutes').val();
}

function setWorkingMinutes(minutes) {
	$('#working-minutes').val(minutes);
}

function getRestMinutes() {
	return $('#rest-minutes').val();
}

function setRestMinutes(minutes) {
	$('#rest-minutes').val(minutes);
}
