
$(document).ready(function() {
	resetTimer();
	notify("Hello");
	var pomodoro = new PomodoroTimer(null, null, onTick, onTick);
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

function startPomodoro(pomodoro) {
	var workingMinues = getWorkingMinutes();
	var restMinutes = getRestMinutes();
	updateLocalStorage(workingMinues, restMinutes);
	pomodoro.start(Timer.convertToSeconds(0, workingMinues, 0), Timer.convertToSeconds(0, restMinutes, 0));
}

function stopPomodoro(pomodoro) {
	pomodoro.stop();
}

function pausePomodoro(pomodoro) {
	pomodoro.stop();
}

function continuePomodoro(pomodoro) {
	pomodoro.continue();
}

function onTick(seconds) {
	var minutes = Timer.getMinutesFromTime(seconds).toLocaleString('en-US', { minimumIntegerDigits: 2 });
	var secs = Timer.getSecondsFromTime(seconds).toLocaleString('en-US', { minimumIntegerDigits: 2 });
	$('.time').text(minutes + ':' + secs);
}

function notify(message) {
	Notification.requestPermission();
	var notification = new Notification(message);
}

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