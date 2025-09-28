import {createUiSelectWithSprite, initMusic, initXYCoordinates, loadSvgWithScale} from '../utils.js'
import Phaser from 'phaser'

class MainMenuScene extends Phaser.Scene {
    userConfig
    gameSceneName
    tutorialSceneName
    upgradeSceneName

    constructor(name, gameSceneName, tutorialSceneName, upgradeSceneName, userConfig) {
        super(name)
        this.gameSceneName = gameSceneName;
        this.tutorialSceneName = tutorialSceneName;
        this.upgradeSceneName = upgradeSceneName;
        this.userConfig = userConfig
    }

    preload() {
        loadSvgWithScale(this, 'uiSelect', 'sprites/ui/uiSelect.svg', 199, 37, 0.065)
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
        loadSvgWithScale(this, 'bsheet', 'sprites/sheet/bsheets/bsheet1.svg', 213, 292, 0.4)
        loadSvgWithScale(this, 'gsheet', 'sprites/sheet/gsheet.svg', 214, 292, 0.4)
        loadSvgWithScale(this, 'heart', 'sprites/heart.svg', 37, 35, 0.05)
        loadSvgWithScale(this, 'timer', 'sprites/timer/timer.svg', 82, 82, 0.1)
        this.load.font('mainFont', 'fonts/SFProText-Semibold.ttf')
        this.load.audio('music', 'audio/music.mp3');
        this.load.audio('swipe', 'audio/swipe.mp3');
        this.load.audio('goodBeep', 'audio/goodBeep.mp3');
        this.load.audio('badBeep', 'audio/badBeep.mp3');

    }

    create() {
        initXYCoordinates(this)
        this.music = initMusic(this, 'music', 0.02, true)
        this.add
            .rectangle(this.xtop, this.ytop, this.xbot, this.ybot, 0x2C52CD, 0.2)
            .setOrigin(0, 0)
        this.add.sprite(this.xmid, this.ymid, 'uiRectangle').setOrigin(0.5)
        createUiSelectWithSprite({
            scene: this,
            sprite: 'uiSelect',
            x: this.xmid,
            y: this.ymid * 0.75,
            text: 'Играть',
            textColor: '#FFF',
            action: () => this.startScene(this.gameSceneName)
        })

        createUiSelectWithSprite({
            scene: this,
            sprite: 'uiSelect',
            x: this.xmid,
            y: this.ymid,
            text: 'Как играть?',
            textColor: '#FFF',
            action: () => this.startScene(this.gameSceneName)
        })

        createUiSelectWithSprite({
            scene: this,
            sprite: 'uiSelect',
            x: this.xmid,
            y: this.ymid * 1.25,
            text: 'Улучшения',
            textColor: '#FFF',
            action: () => this.startScene(this.gameSceneName)
        })
    }

    startScene(sceneName) {
        this.scene.start(sceneName)
    }
}

export default MainMenuScene