class UserConfig {
    constructor({
                    playerInitLives,
                    playerInitScore,
                    levelInitTime,
                    levelInitSheetsNumber,
                    levelInitIncrementNumber,
                }) {
        this.playerInitLives = playerInitLives
        this.playerInitScore = playerInitScore
        this.levelInitTime = levelInitTime
        this.levelInitSheetsNumber = levelInitSheetsNumber
        this.levelInitIncrementNumber = levelInitIncrementNumber
    }
}

export default UserConfig