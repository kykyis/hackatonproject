import Phaser from 'phaser'
import {Sheet} from './game/model/sheet.js'
import {loadSvgWithScale, randomAngle, randomBoolean} from "./utils.js";
import {attachCard, moveSheet, pulseCamera} from "./game/animations.js";
import Timer from "./game/timer.js";
import LevelEnd from "./game/levelEnd.js";

class GameScene extends Phaser.Scene {

    //abstract
    userConfig
    level
    player
    timer
    currentSheet


    //visible
    bg
    hand
    sheets
    hearts
    scoreText
    levelEnd

    //xy
    xtop
    ytop
    xmid
    ymid
    xbot
    ybot
    s

    constructor(name, userConfig) {
        super(name)
        this.init({userConfig: userConfig})
    }

    init(data) {
        if (data && data.userConfig) {
            this.userConfig = data.userConfig
            this.userConfig.init()
            this.player = this.userConfig.player;
            this.level = this.userConfig.level
        }
    }

    preload() {
        loadSvgWithScale(this, 'bg', 'sprites/bg.svg', 393, 852, this.userConfig.scale.bg)
        loadSvgWithScale(this, 'hand', 'sprites/hand.svg', 432, 567, this.userConfig.scale.hand)
        loadSvgWithScale(this, 'bsheet', 'sprites/bsheet.svg', 304, 414, this.userConfig.scale.sheet)
        loadSvgWithScale(this, 'gsheet', 'sprites/gsheet.svg', 304, 414, this.userConfig.scale.sheet)
        loadSvgWithScale(this, 'heart', 'sprites/heart.svg', 304, 414, this.userConfig.scale.heart)
        this.load.font('mainFont', 'fonts/PixelifySans-Regular.ttf')
        this.load.audio('music', 'audio/music.mp3');
    }

    create() {
        this.ybot = this.scale.height
        this.xbot = this.scale.width
        this.ymid = this.ybot / 2
        this.xmid = this.xbot / 2
        this.ytop = 0
        this.xtop = 0
        this.createBackGround(this.xtop, this.ytop)
        this.createSheets(this.xmid, this.ymid, this.level.sheetsNumber)
        this.createHand(this.xmid, this.ybot * 0.8)
        this.createHearts(this.xbot, this.ytop, this.player.lives)
        this.createScoreText(this.xtop, this.ytop)
        this.timer = new Timer(this, this.xmid, this.ybot / 10, this.level.time)
        this.levelEnd = new LevelEnd(this)
        this.music = this.sound.add('music')
        this.music.play({loop: true})
        this.enableListeners()
    }

    createBackGround(x, y) {
        this.bg = this.add.sprite(x, y, 'bg').setOrigin(0)
    }

    createHand(x, y) {
        this.hand = this.add.sprite(x, y, 'hand')
    }

    createSheets(x, y, sheetNum) {
        this.sheets = []
        for (let i = 0; i < sheetNum; i++) {
            const isGood = randomBoolean(0.5)
            const sheet = isGood
                ? new Sheet(this, x, y, 'gsheet', true)
                : new Sheet(this, x, y, 'bsheet', false)
            sheet.angle = randomAngle()
            this.sheets.push(sheet)
        }
        this.currentSheet = this.sheets.pop()
    }

    createHearts(x, y, livesCount) {
        this.hearts = []
        for (let i = 0; i < livesCount; i++) {
            const heart = this.add.sprite(x, y, 'heart').setOrigin(1, 0)
            x -= heart.displayWidth
            this.hearts.push(heart)
        }
    }

    createScoreText(x, y) {
        this.scoreText = this.add.text(x, y, this.userConfig.player.score, {
            fontSize: '10em',
            fill: '#2C52CD',
            backgroundColor: '#fff',
            fontFamily: 'mainFont',
        }).setOrigin(0, 0);
    }

    enableListeners() {
        let startY
        this.input.on('pointerdown', (pointer) => startY = pointer.y)
        this.input.on('pointerup', (pointer) => {
            const endY = pointer.y;
            const deltaY = endY - startY;
            if (Math.abs(deltaY) > 30 && this.currentSheet) {
                deltaY > 0
                    ? this.swipe(this.currentSheet, this.scale.height + this.currentSheet.displayHeight)
                    : this.swipe(this.currentSheet, 0 - this.currentSheet.displayHeight)
            }
        })
    }

    disableListeners() {
        this.input.off('pointerdown')
        this.input.off('pointerup')
    }

    swipe(sheet, y) {
        if (y > 0) attachCard(this)
        moveSheet(this, sheet, y)
        this.sheets.length > 0
            ? this.currentSheet = this.sheets.pop()
            : this.currentSheet = null
        this.updateScore(y, sheet.isGood)
        if (!this.currentSheet && this.hearts.length > 0) {
            this.nextLevel()
        }
    }

    updateScore(direction, good) {
        if ((direction < 0 && !good) || (direction > 0 && good)) {
            this.scoreText.setText(++this.player.score);
        } else {
            this.loseLife();
        }
    }

    loseLife() {
        this.hearts.pop().destroy()
        if (this.hearts.length === 0) {
            this.gameOver()
        }
    }

    gameOver() {
        pulseCamera(this)
        this.timer.remove()
        this.scoreText.destroy()
        this.levelEnd.create('game over', '#970000', this.player.score, 'заново', () => this.restartGame())
    }

    restartGame() {
        this.music.stop()
        this.scene.restart({userConfig: this.userConfig})
    }

    nextLevel() {
        this.timer.remove()
        this.levelEnd.create('успех!', '#007BFF', this.player.score, 'продолжить', () => this.continueGame())
    }

    continueGame() {
        this.level.levelUp()
        this.createSheets(this.xmid, this.ymid, this.level.sheetsNumber)
        this.timer.create()
        this.updatePositions()
    }

    updatePositions() {
        this.children.bringToTop(this.hand)
        this.children.bringToTop(this.scoreText)
        this.children.bringToTop(this.timerText)
        this.hearts.forEach(h => this.children.bringToTop(h))
    }
}

export default GameScene