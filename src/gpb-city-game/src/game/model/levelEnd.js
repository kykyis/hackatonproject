import {createUiSelectWithSprite, textParams} from "../utils.js";

class LevelEnd {

    scene
    blackout
    uiRectangle
    mainText
    scoreText
    button

    constructor(scene) {
        this.scene = scene
    }

    create(mainText, mainTextColor, scoreText, buttonText, buttonAction) {
        this.scene.disableListeners()
        this.blackout = this.createBlackout(mainTextColor)
        this.uiRectangle = this.createUiRectangle()
        this.mainText = this.createMainText(mainText, mainTextColor)
        this.scoreText = this.createScoreText(scoreText)
        this.button = this.createButton(buttonText, buttonAction)
    }

    remove() {
        this.scene.enableListeners()
        this.blackout.destroy()
        this.uiRectangle.destroy()
        this.mainText.destroy()
        this.scoreText.destroy()
        this.button.destroy()
    }

    createBlackout(color) {
        const scene = this.scene
        const width = scene.xbot * 2
        const height = scene.ybot * 2
        return scene.add
            .rectangle(0, 0, width, height, parseInt(color.slice(1), 16), 0.2)
            .setOrigin(0, 0)
    }

    createUiRectangle() {
        const scene = this.scene
        const width = scene.xmid
        const height = scene.ymid
        return scene.add
            .sprite(width, height, 'uiRectangle')
            .setOrigin(0.5)
    }

    createMainText(text, textColor) {
        const scene = this.scene
        const width = scene.xbot / 2
        const height = scene.ymid * 0.75
        return scene.add.text(width, height, text, textParams(this.scene, {
            textColor: textColor, textMult: 2
        })).setOrigin(0.5)
    }

    createScoreText(text) {
        const scene = this.scene
        const width = scene.xbot / 2
        const height = scene.ymid
        return scene.add.text(width, height, `Очки: ${text}`, textParams(this.scene, {
            textColor: '#007BFF',
            textMult: 1.5
        })).setOrigin(0.5)
    }

    createButton(text, buttonAction) {
        const scene = this.scene
        const width = scene.xbot / 2
        const height = scene.ymid * 1.25
        return createUiSelectWithSprite({
            scene: scene, sprite: 'uiSelect', x: width, y: height, text, textColor: '#FFF',
            action: () => {
                this.remove()
                buttonAction()
            }
        })
    }


}

export default LevelEnd