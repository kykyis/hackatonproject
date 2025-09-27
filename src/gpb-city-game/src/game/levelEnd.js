class LevelEnd {

    scene
    blackout
    mainText
    scoreText
    button

    constructor(scene) {
        this.scene = scene
    }

    create(mainText, mainTextColor, scoreText, buttonText, buttonAction) {
        this.scene.disableListeners()
        this.blackout = this.createBlackout()
        this.mainText = this.createMainText(mainText, mainTextColor)
        this.scoreText = this.createScoreText(scoreText)
        this.button = this.createButton(buttonText, buttonAction)
    }

    remove() {
        this.scene.enableListeners()
        this.blackout.destroy()
        this.mainText.destroy()
        this.scoreText.destroy()
        this.button.destroy()
    }

    createBlackout() {
        const scene = this.scene
        const width = scene.xbot * 2
        const height = scene.ybot * 2
        return scene.add
            .rectangle(0, 0, width, height, 1, 0.9)
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerdown', () => {
            })
    }

    createMainText(text, color) {
        const scene = this.scene
        const width = scene.xbot / 2
        const height = scene.ybot / 3
        return scene.add
            .text(width, height, text, this.textParams(color))
            .setOrigin(0.5)
    }

    createScoreText(text) {
        const scene = this.scene
        const width = scene.xbot / 2
        const height = scene.ybot / 2
        return scene.add
            .text(width, height, text, this.textParams('#FFF'))
            .setOrigin(0.5)
    }

    createButton(text, buttonAction) {
        const scene = this.scene
        const width = scene.xbot / 2
        const height = scene.ybot / 1.5
        return scene.add
            .text(width, height, text, this.textParams('#007BFF', '#000', 20, 10))
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.remove()
                buttonAction()
            })
    }

    textParams(color, bgColor = 'transparent', paddingX = 0, paddingY = 0) {
        return {
            fontSize: '10em',
            fill: color,
            fontFamily: 'mainFont',
            backgroundColor: bgColor,
            padding: {
                x: paddingX,
                y: paddingY
            }
        }
    }
}

export default LevelEnd