import {
    createGradientText,
    createUiSelectWithSprite,
    initMusic,
    initXYCoordinates,
    loadSvgWithScale,
    textParams
} from '../utils.js'
import Phaser from 'phaser'

class MainMenuScene extends Phaser.Scene {
    userConfig
    gameSceneName
    tutorialSceneName
    upgradeSceneName
    music

    constructor(name, userConfig) {
        super(name)
        this.userConfig = userConfig
    }

    preload() {
        loadSvgWithScale(this, 'uiSelect', 'sprites/ui/uiSelect.svg', 199, 37, 0.05)
        loadSvgWithScale(this, 'uiRectangle', 'sprites/ui/uiRectangle.svg', 395, 477, 0.5)

        loadSvgWithScale(this, 'book', 'sprites/background/book.svg', 192, 123, 0.2)
        loadSvgWithScale(this, 'calc', 'sprites/background/calc.svg', 114, 143, 0.2)
        loadSvgWithScale(this, 'pen', 'sprites/background/pen.svg', 171, 131, 0.1)
        loadSvgWithScale(this, 'handLVL1', 'sprites/hand/handLVL1.svg', 296, 424, 0.5)
        loadSvgWithScale(this, 'handLVL2', 'sprites/hand/handLVL2.svg', 296, 424, 0.5)
        loadSvgWithScale(this, 'handLVL3', 'sprites/hand/handLVL3.svg', 296, 424, 0.5)
        loadSvgWithScale(this, 'handLVL4', 'sprites/hand/handLVL4.svg', 296, 424, 0.5)
        loadSvgWithScale(this, 'handLVL5', 'sprites/hand/handLVL5.svg', 296, 424, 0.5)
        loadSvgWithScale(this, 'default', 'sprites/terminal/default.svg', 179, 387, 0.25)
        loadSvgWithScale(this, 'green', 'sprites/terminal/green.svg', 179, 387, 0.25)
        loadSvgWithScale(this, 'red', 'sprites/terminal/red.svg', 179, 387, 0.25)
        loadSvgWithScale(this, 'bsheet', 'sprites/sheet/bsheet.svg', 213, 292, 0.9)
        loadSvgWithScale(this, 'gsheet', 'sprites/sheet/gsheet.svg', 214, 292, 0.9)
        loadSvgWithScale(this, 'heart', 'sprites/heart.svg', 37, 35, 0.05)
        loadSvgWithScale(this, 'timer', 'sprites/timer/timer.svg', 82, 82, 0.1)
        this.load.font('mainFont', 'fonts/SFProText-Bold.ttf')
        this.load.font('mainFontBold', 'fonts/SFProText-Heavy.ttf')
        this.load.font('additional', 'fonts/IBMPlexMono-SemiBold.ttf')
        this.load.audio('music', 'audio/music.mp3')
        this.load.audio('goodBeep', 'audio/goodBeep.mp3')
        this.load.audio('badBeep', 'audio/badBeep.mp3')

        this.load.text('goodNames', 'csv/goodNames.csv')
        this.load.text('badNames', 'csv/badNames.csv')
    }

    create() {
        const cfg = this.userConfig
        initXYCoordinates(this)
        initMusic(this, 'music', 0.02, true)
        const y = this.ymid
        this.add.rectangle(this.xtop, this.ytop, this.xbot, this.ybot, 0x2C52CD, 0.2).setOrigin(0, 0)
        this.add.sprite(this.xmid, y, 'uiRectangle').setOrigin(0.5)
        this.buttonWithSprite(cfg.scenes.gameSceneName, 'Играть', y * 0.7)
        createGradientText(this.add.text(this.xmid, y * 0.8, `Баланс очков: ${this.userConfig.session.totalScore}`, textParams(this, {})).setOrigin(0.5, 0.5))
        createGradientText(this.add.text(this.xmid, y * 0.87, `Рекорд: ${this.userConfig.session.best}`, textParams(this, {})).setOrigin(0.5, 0.5))
        this.buttonWithSprite(cfg.scenes.tutorialSceneName, 'Как играть?', y * 1.1)
        this.buttonWithSprite(cfg.scenes.upgradeSceneName, 'Улучшения', y * 1.225)
    }

    buttonWithSprite(sceneName, text, y) {
        return createUiSelectWithSprite({
            scene: this,
            sprite: 'uiSelect',
            x: this.xmid,
            y: y,
            text: text,
            textColor: '#FFF',
            action: () => this.scene.start(sceneName)
        })
    }
}

export default MainMenuScene