import Phaser from 'phaser'
import {notEnoughMoney} from "../animations.js";
import {createGradientText, initXYCoordinates, loadSvgWithScale, textParams} from "../utils.js";

class UpgradeScene extends Phaser.Scene {
    handUpgrades = {
        'handLVL1': 1,
        'handLVL2': 2,
        'handLVL3': 3,
        'handLVL4': 4,
        'handLVL5': 5,
    }

    handNames = {
        'handLVL1': 'Умная\nкарта',
        'handLVL2': 'Для\nсамозанятых',
        'handLVL3': 'Карта\nгода',
        'handLVL4': 'Для\nавтолюбителей',
        'handLVL5': 'Премиальная\nSupreme',
    }


    constructor(name, userConfig) {
        super(name)
        this.userConfig = userConfig
        this.currentHand = this.handUpgrades[userConfig.session.userHand]
    }

    preload() {

        loadSvgWithScale(this, 'cardLVL1', 'sprites/card/cardLVL1.svg', 219, 139, 0.1)
        loadSvgWithScale(this, 'cardLVL2', 'sprites/card/cardLVL2.svg', 219, 139, 0.1)
        loadSvgWithScale(this, 'cardLVL3', 'sprites/card/cardLVL3.svg', 219, 139, 0.1)
        loadSvgWithScale(this, 'cardLVL4', 'sprites/card/cardLVL4.svg', 219, 139, 0.1)
        loadSvgWithScale(this, 'cardLVL5', 'sprites/card/cardLVL5.svg', 219, 139, 0.1)

        loadSvgWithScale(this, 'left', 'sprites/ui/left.svg', 55, 55, 0.05)
        loadSvgWithScale(this, 'right', 'sprites/ui/right.svg', 55, 55, 0.05)
        loadSvgWithScale(this, 'placeholder', 'sprites/ui/placeholder.svg', 51, 51, 0.05)

        loadSvgWithScale(this, 'close', 'sprites/ui/close.svg', 51, 51, 0.05)
    }

    create() {
        initXYCoordinates(this)
        const scene = this
        const hands = this.handUpgrades
        const handNames = this.handNames
        const userHands = this.userConfig.session.userHands
        const userHand = this.userConfig.session.userHand
        const x = this.xmid
        const y = this.ymid
        const elements = []
        this.add.rectangle(this.xtop, this.ytop, this.xbot, this.ybot, 0x2C52CD, 0.2).setOrigin(0, 0)
        const uiRectangle = this.add.sprite(this.xmid, y, 'uiRectangle').setOrigin(0.5)
        const yProduct = y * 0.9
        const placeholder = this.add.sprite(this.xmid, yProduct, 'placeholder').setOrigin(0.5)
        const width = uiRectangle.displayWidth * 0.85
        Object.entries(hands).forEach(([hand, lvl]) => {
            const price = userHands.includes(hand)
                ? userHand === hand
                    ? 'Выбрано'
                    : 'Выбрать'
                : lvl * 100
            elements.push(new Element({
                scene, x, y, price, width, elements, lvl,
                name: handNames[hand],
                innerName: hand,
                description: 'Увеличение очков Х' + lvl,
                sprite: 'cardLVL' + lvl,

            }).hide())
        });

        this.list = new ElementList(elements)
        const arrowX = (this.xbot - placeholder.displayWidth) / 2.05
        this.add.sprite(arrowX, yProduct, 'left').setInteractive().on('pointerdown', () => this.list.prev()).setOrigin(1, 0.5)
        this.add.sprite(this.scale.width - arrowX, yProduct, 'right').setInteractive().on('pointerdown', () => this.list.next()).setOrigin(0, 0.5)

        this.add.sprite((this.scale.width + uiRectangle.displayWidth) / 2.05, (this.scale.height - uiRectangle.displayHeight) / 1.90, 'close').setInteractive().on('pointerdown', () =>
            this.scene.start(this.userConfig.scenes.mainMenuSceneName)).setOrigin(0.5, 0.5)
    }
}


class ElementList {
    constructor(items) {
        this.items = items
        this.lastItem = items.length - 1
        this.currentItem = 0
        this.items[0].show()
    }


    next() {
        this.switch(1)
    }

    prev() {
        this.switch(-1)
    }

    switch(num) {
        this.items[this.currentItem].hide()
        this.currentItem += num
        if (this.currentItem < 0) {
            this.currentItem = this.lastItem
        } else if (this.currentItem > this.lastItem) {
            this.currentItem = 0
        }
        this.items[this.currentItem].show()
    }
}

class Element {

    constructor({scene, x, y, width, name, innerName, price, description, sprite, elements, lvl}) {
        const wordWrap = {width, useAdvancedWrap: false}
        this.scene = scene
        this.name = createGradientText(scene.add.text(x, y * 0.55, name, textParams(scene, {wordWrap})).setOrigin(0.5, 0))
        this.sprite = scene.add.sprite(x, y * 0.9, sprite).setOrigin(0.5)
        const priceY = y * 1.05
        this.priceText = this.createPrice(x, priceY, price)
        this.chosen = this.createChosen(x, priceY)
        this.bought = this.createBought(x, priceY)
        this.innerName = innerName
        this.description = scene.add.text(x, y * 1.25, description, textParams(scene, {
            wordWrap,
            fill: '#007BFF',
            textMult: 0.8
        })).setOrigin(0.5, 0.5)
        this.price = price
        this.showPriceOrBoughtOrChosen(price)
        this.elements = elements
        this.lvl = lvl
    }

    show() {
        this.sprite.setVisible(true)
        this.name.setVisible(true)
        this.description.setVisible(true)
        this.showPriceOrBoughtOrChosen()
        return this
    }

    hide() {
        this.sprite.setVisible(false)
        this.name.setVisible(false)
        this.description.setVisible(false)
        this.priceText.setVisible(false)
        this.bought.setVisible(false)
        this.chosen.setVisible(false)
        return this
    }

    showPriceOrBoughtOrChosen(price) {
        this.priceText.setVisible(false)
        this.bought.setVisible(false)
        this.chosen.setVisible(false)
        if (this.price === 'Выбрано') {
            this.chosen.setVisible(true)
        } else if (this.price === 'Выбрать') {
            this.bought.setVisible(true)
        } else {
            this.priceText.setVisible(true)
        }
    }

    createPrice(x, y, price) {
        return this.scene.add.text(x, y, price, textParams(this.scene, {fill: '#007BFF'})).setInteractive().on('pointerdown', () => this.buy()).setOrigin(0.5, 0.5)
    }

    createChosen(x, y) {
        return this.scene.add.text(x, y, 'Выбрано', textParams(this.scene, {fill: '#007BFF'})).setOrigin(0.5, 0.5)
    }

    createBought(x, y) {
        return this.scene.add.text(x, y, 'Выбрать', textParams(this.scene, {fill: '#007BFF'})).setInteractive().on('pointerdown', () => this.chose()).setOrigin(0.5, 0.5)
    }

    buy() {
        if (this.scene.userConfig.session.totalScore >= this.price) {
            this.scene.userConfig.session.totalScore -= this.price
            this.scene.userConfig.session.userHands.push(this.innerName)
            this.priceText.setVisible(false)
            this.chose()
        } else {
            notEnoughMoney(this.scene, this.priceText)
        }
    }

    chose() {
        this.priceText.setVisible(false)
        this.bought.setVisible(false)
        this.chosen.setVisible(true)
        const currentHand = this.currHand()
        currentHand.price = 'Выбрать'
        this.price = 'Выбрано'
        this.scene.userConfig.session.userHand = this.innerName
        this.scene.userConfig.session.multiplier = this.lvl
    }

    currHand() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i]
            if (e.innerName === this.scene.userConfig.session.userHand) return e
        }
    }
}

export default UpgradeScene