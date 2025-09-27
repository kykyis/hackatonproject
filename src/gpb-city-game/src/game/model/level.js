class Level {
    number
    sheetsNumber
    sheetsIncrement
    time

    constructor(time, sheetsNumber, sheetsIncrement) {
        this.level = 1
        this.sheetsNumber = sheetsNumber
        this.time = time
        this.sheetsIncrement = sheetsIncrement
    }

    levelUp() {
        this.level++
        this.sheetsNumber += this.sheetsIncrement
    }
}

export default Level