class Timer {

    scene
    time
    timeLeft
    counter
    timerText

    constructor(scene, x, y, time) {
        this.scene = scene
        this.time = time
        this.create = function () {
            this.timeLeft = this.time
            this.timerText = this.createTimerText(x, y)
            this.counter = this.createCounter()
        }
        this.create()
    }

    remove() {
        this.counter.remove()
        this.timerText.destroy()
    }

    createCounter() {
        return this.scene.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    createTimerText(x, y) {
        return this.scene.add.text(x, y, this.timeLeft, {
            fontSize: '10em',
            fill: '#007BFF',
            fontFamily: 'mainFont',
            backgroundColor: '#fff',
        }).setOrigin(0.5, 0);
    }

    updateTimer() {
        this.timeLeft--
        this.timerText.setText(this.timeLeft)
        if (this.timeLeft <= 0) {
            this.scene.gameOver()
            this.remove()
        }
    }
}

export default Timer