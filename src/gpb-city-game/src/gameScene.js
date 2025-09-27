import Phaser from 'phaser'
import {Sheet} from './sheet.js'

class GameScene extends Phaser.Scene {
    userConfig = {
        userScale: {
            bg: null,
            hand: null,
            sheet: null,
        },
        sheets: {
            number: null,
        },
        player: {
            life: null,
            score: null
        }
    }
    sheets = []
    hearts = []
    currentSheet
    hand
    scoreText

    constructor(name, configFunction) {
        super(name)
        this.init({configFunction: configFunction})
    }

    createNewConfig = () => {
    }

    init(data) {
        if (data && data.configFunction) {
            this.createNewConfig = data.configFunction
            this.userConfig = this.createNewConfig(); // вызываем функцию
            this.player = this.userConfig.player;
        }
    }


    preload() {
        this.loadSvgWithScale('bg', 'sprites/bg.svg', 393, 852, 1)
        this.loadSvgWithScale('hand', 'sprites/hand.svg', 432, 567, this.userConfig.userScale.hand)
        this.loadSvgWithScale('bsheet', 'sprites/bsheet.svg', 304, 414, this.userConfig.userScale.sheet)
        this.loadSvgWithScale('gsheet', 'sprites/gsheet.svg', 304, 414, this.userConfig.userScale.sheet)
        this.loadSvgWithScale('heart', 'sprites/heart.svg', 304, 414, 0.3)
        this.load.font('PixelifySans', 'fonts/PixelifySans-Regular.ttf')
        this.load.audio('music', 'audio/music.mp3');

    }

    create() {
        this.music = this.sound.add('music');
        this.music.play({loop: true})
        const width = this.scale.width
        const height = this.scale.height
        const xmid = width / 2
        const ymid = height / 2
        const ybot = height
        this.createBackGround()
        this.createSheets(xmid, ymid, this.userConfig.sheets.number)
        this.createHearts(width, 0, this.userConfig.player.life)
        this.createHand(xmid, ybot - (height * 0.2))
        this.createScoreText(0, 0)
        this.createTimer(xmid, height / 10, 15)
        this.listenSwipes()
    }

    createTimer(x, y, time) {
        this.timerText = this.add.text(x, y, `Time: ${time}`, {
            fontSize: '10em',
            fill: '#007BFF',
            fontFamily: 'PixelifySans',
            backgroundColor: '#fff',
        }).setOrigin(0.5, 0);

        this.countdown = time;

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        if (this.timer && this.timerText) {
            this.countdown--
            this.timerText.setText(`Time: ${this.countdown}`)

            if (this.countdown <= 0) {
                this.gameOver()
                this.removeTimer()
            }
        }

    }

    removeTimer() {
        this.timer.remove()
        this.timerText.destroy()
    }

    createHearts(x, y, livesCount) {
        this.hearts = []
        for (let i = 0; i < livesCount; i++) {
            const heart = this.add.sprite(x, y, 'heart').setOrigin(1, 0)
            x -= heart.displayWidth
            this.hearts.push(heart)
        }
    }

    createBackGround() {
        this.add.sprite(0, 0, 'bg').setOrigin(0)
    }

    createSheets(x, y, sheetNum) {
        this.sheets = []
        for (let i = 0; i < sheetNum; i++) {
            const isGood = this.isGoodSheet()
            const sheet = isGood
                ? new Sheet(this, x, y, 'gsheet', true)
                : new Sheet(this, x, y, 'bsheet', false)
            sheet.angle = this.randomAngle()
            this.sheets.push(sheet)
        }
        this.currentSheet = this.sheets.pop()
    }

    listenSwipes() {
        let startY
        this.input.on('pointerdown', (pointer) => startY = pointer.y)
        this.input.on('pointerup', (pointer) => {
            const endY = pointer.y;
            const deltaY = endY - startY;
            if (Math.abs(deltaY) > 30 && this.currentSheet !== undefined) { // 30 пикселей — порог
                if (deltaY < 0) {
                    this.swipeUp(this.currentSheet)
                } else {
                    this.swipeDown(this.currentSheet)
                }
            }
        })
    }

    createHand(x, y) {
        this.hand = this.add.sprite(x, y, 'hand')
    }

    createScoreText(x, y) {
        this.scoreText = this.add.text(x, y, this.userConfig.player.score, {
            fontSize: '10em',
            fill: '#2C52CD',
            backgroundColor: '#fff',
            fontFamily: 'PixelifySans',
        }).setOrigin(0, 0);
    }

    isGoodSheet() {
        return Math.random() >= 0.5
    }

    swipeUp(sheet) {
        this.swipe(sheet, 0 - sheet.displayHeight)
    }

    swipeDown(sheet) {
        this.attachCard()
        this.swipe(sheet, this.scale.height + sheet.displayHeight)
    }

    swipe(sheet, y) {
        this.currentSheet = this.sheets.pop()
        this.tweens.add({
            angle: this.randomAngle(),
            targets: sheet,
            y: y,
            duration: 500,
            ease: 'Power2',
            onComplete: function () {
                sheet.destroy(); // удаляем объект после анимации
            }
        });
        this.updateScore(y, sheet.isGood)
        if (this.currentSheet === undefined) {
            this.nextLevel()
        }
    }

    randomAngle() {
        return ((Math.random() * 2) - 1) * 15
    }

    attachCard() {
        this.tweens.add({
            targets: this.hand,
            scaleY: 0.8,
            scaleX: 1.1,
            angle: -5,
            duration: 100,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 0
        });
    }

    updateScore(direction, good) {
        if ((direction < 0 && !good) || (direction > 0 && good)) {
            this.updateScoreText();
        } else {
            this.loseLife();
        }
    }

    loseLife() {
        this.hearts.pop().destroy()
        if (this.hearts.length === 0) {
            this.scoreText.destroy()
            this.gameOver()
        }
    }

    updateScoreText() {
        this.player.score++
        this.scoreText.setText(this.player.score);
    }

    gameOver() {
        this.removeTimer()
        this.cameras.main.shake(500)

        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 1, 0.9)
            .setOrigin(0, 0)
            .setDepth(100);

        this.add.text(this.scale.width / 2, this.scale.height / 3, 'Game Over', {
            fontSize: '10em',
            fill: '#ff0000',
            fontFamily: 'PixelifySans'
        }).setOrigin(0.5).setDepth(101);

        this.add.text(this.scale.width / 2, this.scale.height / 2, `Score: ${this.player.score}`, {
            fontSize: '10em',
            fill: '#ffffff',
            fontFamily: 'PixelifySans'
        }).setOrigin(0.5).setDepth(101);

        const restartButton = this.add.text(this.scale.width / 2, this.scale.height / 1.5, 'Restart', {
            fontSize: '10em',
            fill: '#ffffff',
            fontFamily: 'PixelifySans',
            backgroundColor: '#007BFF', // синий фон
            padding: {x: 20, y: 10}
        }).setOrigin(0.5).setDepth(101)

        restartButton
            .setInteractive()
            .on('pointerdown', () => this.restartGame())
    }

    restartGame() {
        this.music.stop()
        this.scene.restart({configFunction: this.createNewConfig})
    }

    continueGame() {
        const width = this.scale.width
        const height = this.scale.height
        const xmid = width / 2
        const ymid = height / 2
        this.userConfig.sheets.number += 5
        this.createSheets(xmid, ymid, this.userConfig.sheets.number)
        this.createTimer(xmid, height / 10, 15)
        this.updatePositions()
    }

    updatePositions() {
        this.children.bringToTop(this.hand)
        this.children.bringToTop(this.scoreText)
        this.children.bringToTop(this.timerText)
        this.hearts.forEach(h => this.children.bringToTop(h))
    }

    nextLevel() {
        this.removeTimer()

        const darkRectangle = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 1, 0.9)
            .setOrigin(0, 0)
            .setDepth(100);

        const nextLevelText = this.add.text(this.scale.width / 2, this.scale.height / 3, 'Next Level!', {
            fontSize: '10em',
            fill: '#007BFF',
            fontFamily: 'PixelifySans'
        }).setOrigin(0.5).setDepth(101);

        const playerScoreText = this.add.text(this.scale.width / 2, this.scale.height / 2, `Score: ${this.player.score}`, {
            fontSize: '10em',
            fill: '#ffffff',
            fontFamily: 'PixelifySans'
        }).setOrigin(0.5).setDepth(101);

        const continueButtion = this.add.text(this.scale.width / 2, this.scale.height / 1.5, 'Continue', {
            fontSize: '10em',
            fill: '#ffffff',
            fontFamily: 'PixelifySans',
            backgroundColor: '#007BFF', // синий фон
            padding: {x: 20, y: 10}
        }).setOrigin(0.5).setDepth(101)

        continueButtion
            .setInteractive()
            .on('pointerdown', () => {
                darkRectangle.destroy()
                nextLevelText.destroy()
                playerScoreText.destroy()
                continueButtion.destroy()
                this.continueGame()
            })
    }

    loadSvgWithScale(name, url, ow, oh, mult = 1) {
        const sw = this.scale.width
        const sh = this.scale.height
        const svgScale = Math.max(sw / ow, sh / oh)
        this.load.svg(name, url, {scale: svgScale * mult})
    }
}

export {GameScene}