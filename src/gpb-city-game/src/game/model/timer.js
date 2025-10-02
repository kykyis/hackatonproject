import {textParams} from '../utils.js'

class Timer {
    constructor(scene, x, y, time, timerEvent) {
        this.scene = scene
        this.time = time
        this.timerEvent = timerEvent
        this.x = x
        this.y = y
        this.create()
    }

    create() {
        this.timeLeft = this.time
        this.placeHolder = this.createPlaceHolder(this.x, this.y)
        this.timerText = this.createTimerText(this.x, this.y)
        this.counter = this.createCounter()
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

    createPlaceHolder(x, y) {
        return this.scene.add.sprite(x, y, 'timer').setOrigin(1, 0)
    }

    createTimerText(x, y) {
        x -= this.placeHolder.displayWidth / 2
        y += this.placeHolder.displayHeight / 2
        return this.scene.add.text(x, y, this.timeLeft, textParams(this.scene, {textColor: '#FFF'})).setOrigin(0.5, 0.5)
    }

    updateTimer() {
        this.timerText.setText(--this.timeLeft)
        if (this.timeLeft <= 0) {
            this.timerEvent()
            this.remove()
        }
    }
}

export default Timer