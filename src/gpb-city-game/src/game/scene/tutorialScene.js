import {
    createGradientText,
    createUiSelectWithSprite,
    initXYCoordinates,
    loadSvgWithScale,
    textParams
} from '../utils.js'
import Phaser from 'phaser'

class TutorialScene extends Phaser.Scene {
    constructor(name, userConfig) {
        super(name)
        this.userConfig = userConfig
    }

    preload() {
        loadSvgWithScale(this, 'cardTutorial', 'sprites/card/cardLVL1.svg', 219, 139, 0.1)
        loadSvgWithScale(this, 'gsheetTutorial', 'sprites/tutorial/gsheet.svg', 158, 137, 0.17)
        loadSvgWithScale(this, 'bsheetTutorial', 'sprites/tutorial/bsheet.svg', 166, 137, 0.17)
        loadSvgWithScale(this, 'terminalTutorial', 'sprites/terminal/default.svg', 179, 387, 0.15)
        loadSvgWithScale(this, 'heartsTutorial', 'sprites/tutorial/hearts.svg', 117, 34, 0.1)
    }

    create() {
        const cfg = this.userConfig
        initXYCoordinates(this)
        const scene = this
        const x = this.xmid
        const y = this.ymid
        this.add.rectangle(this.xtop, this.ytop, this.xbot, this.ybot, 0x2C52CD, 0.2).setOrigin(0, 0)
        const uiRectangle = this.add.sprite(this.xmid, y, 'uiRectangle').setOrigin(0.5)
        const width = uiRectangle.displayWidth * 0.85
        const page5 = new TutorialPage({
            scene, x, y, width,
            mainText: 'Следи за временем и береги жизни',
            image: 'heartsTutorial',
            text: 'Докажи, что ты самый внимательный и быстрый защитник карт!',
            buttonText: 'Играть',
            action: () => this.scene.start(this.userConfig.scenes.mainMenuSceneName)
        }).hide()
        const page4 = new TutorialPage({
            scene, x, y, width,
            mainText: 'Терминал и бонусы',
            image: 'terminalTutorial',
            text: 'Прокачивай продукты Газпромбанка в терминале!\nПолучай больше очков и другие бонусы!',
            buttonText: 'Отлично',
            nextPage: page5
        }).hide()
        const page3 = new TutorialPage({
            scene, x, y, width,
            mainText: 'Фальшивые счета',
            image: 'bsheetTutorial',
            text: 'Могут отличаться цветом, содержать опечатки и иную валюту.\nСвайпай их вверх!',
            buttonText: 'Принял',
            nextPage: page4
        }).hide()
        const page2 = new TutorialPage({
            scene, x, y, width,
            mainText: 'Настоящие счета',
            image: 'gsheetTutorial',
            text: 'Белые, без опечаток и в рублях.\nСвайпай их вниз!',
            buttonText: 'Понял',
            nextPage: page3
        }).hide()
        const page1 = new TutorialPage({
            scene, x, y, width,
            mainText: 'Добро пожаловать, герой Газпромбанка!',
            image: 'cardTutorial',
            text: 'Твоя задача — протестировать карту и защищать её от мошенников.',
            buttonText: 'Дальше',
            nextPage: page2
        })
    }

}

class TutorialPage {

    constructor({
                    scene,
                    x,
                    y,
                    width,
                    mainText,
                    image,
                    text,
                    buttonText,
                    nextPage = null,
                    action = () => this.next(nextPage)
                }) {
        const wordWrap = {width, useAdvancedWrap: false}
        this.mainText = createGradientText(scene.add.text(x, y * 0.55, mainText, textParams(scene, {wordWrap})).setOrigin(0.5, 0))
        this.image = scene.add.sprite(x, y * 0.875, image).setOrigin(0.5, 0.5)
        this.text = scene.add.text(x, y * 1.2, text, textParams(scene, {
            wordWrap,
            fill: '#007BFF',
            textMult: 0.8
        })).setOrigin(0.5, 0.5)
        this.button = this.createButton(scene, x, y * 1.4, buttonText, action)
    }

    next(nextPage) {
        this.hide()
        nextPage.show()
    }

    hide() {
        Object.values(this).forEach(element => element.setVisible(false))
        return this
    }

    show() {
        Object.values(this).forEach(element => element.setVisible(true))
        return this
    }

    createButton(scene, x, y, text, action) {
        return createUiSelectWithSprite({
            scene, x, y, text, action,
            sprite: 'uiSelect',
            textColor: '#FFF',
        })
    }
}

export default TutorialScene