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

export {randomBoolean, randomAngle, loadSvgWithScale}