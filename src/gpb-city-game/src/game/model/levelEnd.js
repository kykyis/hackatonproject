import {createUiSelect, createUiSelectWithSprite, textParams} from "../utils.js";

class LevelEnd {

    scene
    blackout
    uiRectangle
    levelEndText
    scoreText
    button
    mainMenuButton

    constructor(scene) {
        this.scene = scene
    }

    create(mainText, mainTextColor, scoreText, buttonText, buttonAction) {
        this.scene.disableListeners()
        const y = this.scene.ymid

        this.blackout = this.createBlackout(mainTextColor)
        this.uiRectangle = this.createUiRectangle()
        this.scoreText = this.createScoreText(scoreText, y * 0.7)
        this.levelEndText = this.createLevelEndText(mainText, mainTextColor, y * 0.95)
        this.button = this.createButton(buttonText, buttonAction, y * 1.2)
        this.mainMenuButton = this.createMainMenuButton(y * 1.3)
    }

    remove() {
        this.scene.enableListeners()
        this.blackout.destroy()
        this.uiRectangle.destroy()
        this.scoreText.destroy()
        this.levelEndText.destroy()
        this.button.destroy()
        this.mainMenuButton.destroy()
    }

    createBlackout(color) {
        const scene = this.scene
        const x = scene.xbot
        const y = scene.ybot
        return scene.add
            .rectangle(0, 0, x, y, parseInt(color.slice(1), 16), 0.2)
            .setOrigin(0, 0)
    }

    createUiRectangle() {
        const scene = this.scene
        const x = scene.xmid
        const y = scene.ymid
        return scene.add
            .sprite(x, y, 'uiRectangle')
            .setOrigin(0.5)
    }

    createScoreText(text, y) {
        const scene = this.scene
        const x = scene.xmid
        const scoreText = scene.add.text(x, y, `Очки: ${text}`, textParams(this.scene, {
            textMult: 2,
            textFont: 'mainFontBold'
        })).setOrigin(0.5)
        const gradient = scoreText.context.createLinearGradient(0, 0, 0, scoreText.height)
        gradient.addColorStop(0, '#6088DB')
        gradient.addColorStop(1, '#2C52CD')
        scoreText.setFill(gradient)
        return scoreText
    }

    createLevelEndText(text, textColor, y) {
        const scene = this.scene
        const x = scene.xmid
        return scene.add.text(x, y, text, textParams(this.scene, {
            textColor: textColor, textMult: 1.5
        })).setOrigin(0.5)

    }

    createButton(text, buttonAction, y) {
        const scene = this.scene
        const x = scene.xmid
        return createUiSelectWithSprite({
            scene, sprite: 'uiSelect', x, y, text, textColor: '#FFF',
            action: () => {
                this.remove()
                buttonAction()
            }
        })
    }

    createMainMenuButton(y) {
        const scene = this.scene
        const x = scene.xmid
        return createUiSelect({
            scene, x, y, text: 'В меню', textColor: '#007BFF',
            action: () => scene.scene.start(scene.userConfig.scenes.mainMenuSceneName)
        })
    }


}

export default LevelEnd