"use strict";
$(document).ready(function() {
	resetTimer();
	var pomodoro = initializePomodoroTimer();
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
		pomodoroWorkingStyle();
	}

	function notify(message) {
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
	pomodoroWorkingStyle();
	pomodoro.start(Timer.convertToSeconds(0, workingMinues, 0), Timer.convertToSeconds(0, restMinutes, 0));
}

function stopPomodoro(pomodoro) {
	pomodoro.stop();
	pomodoroWorkingStyle();
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
function pomodoroWorkingStyle() {
	$('.pomodoro').css('background-color', '');
	$('.button').removeClass('green-btn');
	$('.pomodoro-title').text('WORK');
}

function pomodoroRestStyle() {
	$('.pomodoro').css('background-color', '#1FDC37');
	$('.button').addClass('green-btn');
	$('.pomodoro-title').text('REST');
}

function resetTimer() {
	Notification.requestPermission();
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