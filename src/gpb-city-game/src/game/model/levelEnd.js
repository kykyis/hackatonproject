import {createGradientText, createUiSelect, createUiSelectWithSprite, textParams} from "../utils.js";

class LevelEnd {
    constructor(scene) {
        this.scene = scene
    }

    create(mainText, mainTextColor, scoreText, buttonText, buttonAction) {
        this.scene.disableListeners()
        const y = this.scene.ymid
        const x = this.scene.xmid
        this.blackout = this.createBlackout(mainTextColor)
        this.uiRectangle = this.createUiRectangle(x, y)
        this.scoreText = this.createScoreText(scoreText, x, y * 0.7)
        this.levelEndText = this.createLevelEndText(mainText, mainTextColor, x, y * 0.95)
        this.button = this.createButton(buttonText, buttonAction, x, y * 1.2)
        this.mainMenuButton = this.createMainMenuButton(x, y * 1.3)
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
        return this.scene.add.rectangle(0, 0, this.scene.xbot, this.scene.ybot, parseInt(color.slice(1), 16), 0.2).setOrigin(0, 0)
    }

    createUiRectangle(x, y) {
        return this.scene.add.sprite(x, y, 'uiRectangle').setOrigin(0.5)
    }

    createScoreText(text, x, y) {
        return createGradientText(this.scene.add.text(x, y, `Очки: ${text}`, textParams(this.scene, {
            textFont: 'mainFontBold',
            textMult: 2
        }))).setOrigin(0.5)
    }

    createLevelEndText(text, textColor, x, y) {
        return this.scene.add.text(x, y, text, textParams(this.scene, {
            fill: textColor,
            textMult: 1.5
        })).setOrigin(0.5)
    }

    createButton(text, buttonAction, x, y) {
        return createUiSelectWithSprite({
            scene: this.scene,
            sprite: 'uiSelect',
            x, y, text,
            textColor: '#FFF',
            action: () => {
                this.remove()
                buttonAction()
            }
        })
    }

    createMainMenuButton(x, y) {
        return createUiSelect({
            scene: this.scene,
            x, y,
            text: 'В меню',
            textColor: '#007BFF',
            action: () => {
                this.scene.scene.start(this.scene.userConfig.scenes.mainMenuSceneName)
            }
        })
    }
}

export default LevelEnd