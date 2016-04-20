describe('PomodoroTimer', function() {
	function initPomodoro(done) {
		var pomodoro = new PomodoroTimer(1, 1, function() {}, function() {},
			function() {}, function() { if(done) done() });
		return pomodoro;
	}
	var pomodoro;

	afterEach(function() {
		pomodoro.stop();
	});

	describe('start', function() {
		this.timeout(3000);
		it('should start timeout of 1s working and 1s of free time', function(done) {
			pomodoro = initPomodoro(done);
			pomodoro.start();
		});
	});

	describe('stop', function() {
		it('should stop timeout', function() {
			pomodoro = initPomodoro();
			pomodoro.start();
			pomodoro.stop();
		});
	});

	describe('continue', function() {
		it('should continue timeout', function(done) {
			this.timeout(3000);
			pomodoro = initPomodoro(done);
			pomodoro.start();
			pomodoro.stop();
			pomodoro.continue();
		});
	});

});