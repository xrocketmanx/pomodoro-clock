
/**
 * Has workingTime and freeTime timers that
 * working one after another in loop
 * @class
 * @param {Number}   working         working timeout seconds
 * @param {Number}   free            free timeout seconds
 * @param {Function} workingAction   actions every seconds of working time
 * @param {Function} freeAction      actions every seconds of free time
 * @param {Function} workingCallback actions after working time
 * @param {Function} freeCallback    actions after free time
 */
function PomodoroTimer(working, free, workingAction, freeAction, workingCallback, freeCallback) {
	var workingTimer = new Timer(working, workingAction, function() {
		if (workingCallback) workingCallback();
		freeTimer.start();
	});
	var freeTimer = new Timer(free, freeAction, function() {
		if (freeCallback) freeCallback();
		workingTimer.start();
	}); 

	/**
	 * Starts timer with initial parameters or
	 * with function params if they are not ommited
	 * (all parameters are optional)
	 * @param  {Number} working working timeout seconds
	 * @param  {Number} free    free timeout seconds
	 */
	this.start = function(working, free) {
		if (working && free) {
			workingTimer.setTimeout(working);
			freeTimer.setTimeout(free);
		}

		workingTimer.start();
	};

	/**
	 * Continues working of timer
	 */
	this.continue = function() {
		if (workingTimer.getSeconds()) {
			workingTimer.continue();
		} else if (freeTimer.getSeconds()){
			freeTimer.continue();
		}
	};

	/**
	 * Stops timer
	 */
	this.stop = function() {
		workingTimer.stop();
		freeTimer.stop();
	};
}