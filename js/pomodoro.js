"use strict";
$(document).ready(function() {
	resetTimer();
	var pomodoro = initializePomodoroTimer();
	$('#start-button').click(function() {
		startPomodoro(pomodoro);
	});
	$('#continue-button').click(function() {
		continuePomodoro(pomodoro);
	});
	$('#stop-button').click(function() {
		stopPomodoro(pomodoro);
	});
	$('#pause-button').click(function() {
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
	}

	function onRestEnd() {
		notify("Rest ended, it`s time for work!");
	}

	function notify(message) {
		Notification.requestPermission();
		var notification = new Notification(message);
	}
}

/****
Event Handlers
****/
function startPomodoro(pomodoro) {
	$('.pomodoro-start').css('display', 'none');
	var workingMinues = getWorkingMinutes();
	var restMinutes = getRestMinutes();
	updateLocalStorage(workingMinues, restMinutes);
	pomodoro.start(Timer.convertToSeconds(0, workingMinues, 0), Timer.convertToSeconds(0, restMinutes, 0));
}

function stopPomodoro(pomodoro) {
	pomodoro.stop();
	$('.pomodoro-start').css('display', 'block');
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
function resetTimer() {
	if (!(localStorage.workingMinues && localStorage.restMinutes)) {
		updateLocalStorage(25, 5);
	}
	setWorkingMinutes(localStorage.workingMinues);
	setRestMinutes(localStorage.restMinutes);
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