import Phaser from 'phaser'
import {Sheet} from '../model/sheet.js'
import {initXYCoordinates, randomAngle, randomBoolean, textParams} from '../utils.js'
import {attachCard, flashTerminalScreen, moveSheet, pulseCamera} from '../animations.js'
import Timer from '../model/timer.js'
import LevelEnd from '../model/levelEnd.js'
import Player from '../model/player.js'
import Level from '../model/level.js'
import Hand from '../model/hand.js'

class GameScene extends Phaser.Scene {
    constructor(name, userConfig = null) {
        super(name)
        this.userConfig = userConfig
    }

    create() {
        const cfg = this.userConfig
        const offset = 20
        initXYCoordinates(this)
        this.goodBeepSound = this.sound.add('goodBeep')
        this.badBeepSound = this.sound.add('badBeep')
        this.player = new Player(cfg.playerInitLives, cfg.playerInitScore)
        this.level = new Level(cfg.levelInitTime, cfg.levelInitSheetsNumber, cfg.levelInitIncrementNumber)
        this.bg = this.createBackGround(this.xmid, this.ymid)
        this.createSheets(this.xmid, this.ymid, this.level.sheetsNumber)
        this.terminal = this.createTerminal(this.xmid, this.ymid, this.player.score)
        this.hand = this.createHand(this.xmid, this.ybot)
        this.timer = new Timer(this, this.xbot - offset, this.ytop + offset, this.level.time, () => this.gameOverEvent())
        this.createHearts(this.xbot - offset * 2 - this.timer.placeHolder.displayWidth, this.ytop + offset + this.timer.placeHolder.displayHeight / 4, this.player.lives)
        this.levelEnd = new LevelEnd(this)
        this.enableListeners()
    }

    createBackGround(x, y) {
        const cfg = this.userConfig
        const bg = this.add.container()
        const bgColor = this.add.rectangle(x, y, this.xbot, this.ybot, 0xC3D1D7, 1)
        const pen = this.add.sprite(0, y * 0.1, 'pen').setAngle(-60).setOrigin(0.5)
        const book = this.add.sprite(this.xbot * 0.925, y * 0.1, 'book').setAngle(0).setOrigin(0.5)
        const calc = this.add.sprite(this.xtop, y * 0.6, 'calc').setAngle(45).setOrigin(1)
            .setInteractive().on('pointerdown', () => this.scene.start(cfg.scenes.mainMenuSceneName))
        return bg.add([bgColor, pen, calc, book])
    }

    createTerminal(x, y, score = 0) {
        const terminal = this.add.sprite(x * 0.45, y * 1.6, 'default').setAngle(-15)
        this.scoreText = this.add.text(x * 0.45, y * 1.6, score.toString(), textParams(this, {
            textColor: '#FFF',
            paddingX: 60,
            paddingY: 50
        })).setOrigin(0.5, 0.97).setAngle(-15)
        return terminal
    }

    createHand(x, y) {
        return new Hand(this, x * 1.5, y * 0.8, this.userConfig.session.userHand)
    }

    createSheets(x, y, sheetNum) {
        this.sheets = []
        for (let i = 0; i < sheetNum; i++) {
            const isGood = randomBoolean(0.5)
            const sheet = isGood
                ? new Sheet(this, x, y * 0.8, 'gsheet', true)
                : new Sheet(this, x, y * 0.8, 'bsheet', false)
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

    enableListeners() {
        let startY
        this.input.on('pointerdown', (pointer) => startY = pointer.y)
        this.input.on('pointerup', (pointer) => {
            const endY = pointer.y
            const deltaY = endY - startY
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
            this.nextLevelEvent()
        }
    }

    updateScore(direction, good) {
        if ((direction < 0 && !good) || (direction > 0 && good)) {
            this.goodBeepSound.play({volume: 0.01})
            flashTerminalScreen(this, 'green')
            this.player.score += this.userConfig.session.multiplier
            this.userConfig.session.totalScore += this.userConfig.session.multiplier
            this.scoreText.setText((this.player.score).toString())
        } else {
            this.badBeepSound.play({volume: 0.01})
            flashTerminalScreen(this, 'red')
            this.loseLife()
        }
    }


    loseLife() {
        this.hearts.pop().destroy()
        if (this.hearts.length === 0) {
            this.gameOverEvent()
        }
    }

    gameOverEvent() {
        pulseCamera(this)
        this.timer.remove()
        this.scoreText.destroy()
        this.levelEnd.create('Game Over', '#970000', this.player.score, 'Заново', () => this.restartGame())
    }

    nextLevelEvent() {
        this.timer.remove()
        this.levelEnd.create('Level Up', '#007BFF', this.player.score, 'Продолжить', () => this.nextGame())
    }

    restartGame() {
        this.scene.restart()
    }

    nextGame() {
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