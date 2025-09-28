class Level {
    levelNumber
    sheetsNumber
    sheetsIncrement
    time

    constructor(time, sheetsNumber, sheetsIncrement) {
        this.levelNumber = 1
        this.sheetsNumber = sheetsNumber
        this.time = time
        this.sheetsIncrement = sheetsIncrement
    }

    levelUp() {
        this.levelNumber++
        this.sheetsNumber += this.sheetsIncrement
    }
}

export default Level