class UserConfig {
    constructor({
                    playerInitLives,
                    playerInitScore,
                    levelInitTime,
                    levelInitSheetsNumber,
                    levelInitIncrementNumber,
                    session,
                    scenes
                }) {
        this.playerInitLives = playerInitLives
        this.playerInitScore = playerInitScore
        this.levelInitTime = levelInitTime
        this.levelInitSheetsNumber = levelInitSheetsNumber
        this.levelInitIncrementNumber = levelInitIncrementNumber
        this.session = session
        this.scenes = scenes
    }
}

export default UserConfig