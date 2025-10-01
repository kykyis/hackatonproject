const randomBoolean = (prob = 0.5) => {
    return Math.random() >= 1 - prob
}

const randomAngle = () => {
    return ((Math.random() * 2) - 1) * 15
}

const loadSvgWithScale = (scene, name, url, ow, oh, mult = 1) => {
    const sw = scene.scale.width
    const sh = scene.scale.height
    const svgScale = Math.max(sw / ow, sh / oh)
    scene.load.svg(name, url, {scale: svgScale * mult})
}

const initXYCoordinates = (scene) => {
    scene.ybot = scene.scale.height
    scene.xbot = scene.scale.width
    scene.ymid = scene.ybot / 2
    scene.xmid = scene.xbot / 2
    scene.ytop = 0
    scene.xtop = 0
}

const createUiSelectWithSprite = ({scene, sprite, x, y, text, textMult, textColor, action}) => {
    const container = scene.add.container()
    const button = scene.add.sprite(x, y, sprite).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', action)
    const textButton = createUiSelect({scene, x, y, text, textMult, textColor, action})
    return container.add([button, textButton])
}
const createUiSelect = ({scene, x, y, text, textMult, textColor, action}) => {
    return scene.add.text(x, y, text, textParams(scene, {
        textColor,
        textMult
    })).setInteractive().on('pointerdown', action).setOrigin(0.5, 0.5)
}

const textParams = (scene, {
    fill = null,
    textMult = 1,
    backgroundColor = 'transparent',
    paddingX = 0,
    paddingY = 0,
    fontFamily = 'mainFont',
    wordWrap = null,
    align = 'center'
}) => {

    return {
        fontFamily, backgroundColor, fill, wordWrap, align,
        fontSize: calculateFontSize(scene) * textMult + 'px',
        padding: {
            x: paddingX,
            y: paddingY
        },
    }

}

const createGradientText = (text, firstColor = '#6088DB', firstStart = 0, secondColor = '#2C52CD', secondStart = 1) => {
    const gradient = text.context.createLinearGradient(0, 0, 0, text.height)
    gradient.addColorStop(firstStart, firstColor)
    gradient.addColorStop(secondStart, secondColor)
    text.setFill(gradient)
    return text
}

const calculateFontSize = (scene) => {
    return scene.scale.width * 0.02 * window.devicePixelRatio
}

const initMusic = (scene, name, volume = 1, loop = true) => {
    if (!scene.music) {
        scene.music = scene.sound.add(name)
        scene.music.play({loop: loop, volume: volume})
    }
}

const initWindowSize = () => {
    const h = window.innerHeight
    const w = window.innerWidth
    const k = Math.max(h / w, w / h)
    const isSquare = k < 1.3
    const height = Math.max(h, w)
    const width = isSquare
        ? h * 0.65
        : Math.min(h, w)
    return {height, width}
}

export {
    randomBoolean,
    randomAngle,
    loadSvgWithScale,
    initXYCoordinates,
    textParams,
    initMusic,
    createUiSelectWithSprite,
    createUiSelect,
    initWindowSize,
    createGradientText
}