import {
    getRandomCurrencySymbol,
    getRandomItem,
    getRandomNumber,
    randomAngle,
    randomBoolean,
    textParams
} from '../utils.js'

class SheetCreator {

    static createSheet(scene, x, y, goodNames, badNames) {
        // return new SheetContainer(scene, x, y, )
        const data = SheetCreator.goodOrBadSheet(goodNames, badNames)
        const sheetContainer = scene.add.container(0, 0);
        const {sheet, text, price} = createSheetWithText(scene, x, y, data,)
        sheetContainer.sheet = sheet
        sheetContainer.isGood = data.isGood
        sheetContainer.add([sheet, text, price])
        return sheetContainer
    }

    static goodOrBadSheet(goodNames, badNames) {
        const prob = 0.8
        let isGood = randomBoolean(prob)
        let sprite, price
        const text = isGood ? getRandomItem(goodNames)[0] : getRandomItem(badNames)[0]
        if (randomBoolean(prob) > 0.5) {
            sprite = 'gsheet'
        } else {
            sprite = 'bsheet'
            isGood = false
        }
        if (randomBoolean(prob) > 0.5) {
            price = getRandomNumber(30) * 100 + '₽'
        } else {
            price = getRandomNumber(30) * 100 + getRandomCurrencySymbol()
            isGood = false
        }
        return {isGood, text, price, sprite}
    }


}


class SheetContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, {sprite, isGood, text}) {
        super(scene)
        this.isGood = isGood
        console.log(scene, x, y, sprite, isGood, text)
        this.add(new Sheet(scene, x, y, sprite))
        this.add(scene.add.text())
        scene.add.existing(this)
    }
}

class Sheet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite)
        scene.add.existing(this)
    }
}

const createSheetWithText = (scene, x, y, data) => {
    const angle = randomAngle()
    const sheet = new Sheet(scene, x, y, data.sprite).setOrigin(0.5)
    const quarterHeight = sheet.displayHeight / 4
    const textY = y - quarterHeight * 1.25
    const priceY = y - quarterHeight * 0.5
    const text = scene.add.text(x, textY, data.text, textParams(scene, {
        fill: '#2C52CD',
        textMult: 1,
        fontFamily: 'additional'
    })).setOrigin(0.5)
    const price = scene.add.text(x, priceY, data.price, textParams(scene, {
        fill: '#2C52CD',
        textMult: 1.5,
        fontFamily: 'additional'
    })).setOrigin(0.5)
    sheet.angle = angle
    text.angle = angle
    price.angle = angle
    const angleRad = Phaser.Math.DegToRad(angle)
    const textOffsetX = text.x - sheet.x
    const textOffsetY = text.y - sheet.y
    const textNewX = textOffsetX * Math.cos(angleRad) - textOffsetY * Math.sin(angleRad)
    const textNewY = textOffsetX * Math.sin(angleRad) + textOffsetY * Math.cos(angleRad)
    text.setPosition(sheet.x + textNewX, sheet.y + textNewY)
    const priceOffsetX = price.x - sheet.x
    const priceOffsetY = price.y - sheet.y
    const priceNewX = priceOffsetX * Math.cos(angleRad) - priceOffsetY * Math.sin(angleRad)
    const priceNewY = priceOffsetX * Math.sin(angleRad) + priceOffsetY * Math.cos(angleRad)
    price.setPosition(sheet.x + priceNewX, sheet.y + priceNewY)
    return {sheet, text, price}
}

export default SheetCreator