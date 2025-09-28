import {randomAngle} from './utils.js';

const moveSheet = (scene, sheet, y) => {
    scene.tweens.add({
        angle: randomAngle(),
        targets: sheet,
        y: y,
        duration: 500,
        ease: 'Power2',
        onComplete: function () {
            sheet.destroy(); // удаляем объект после анимации
        }
    });
}

const attachCard = (scene) => {
    const hand = scene.hand
    scene.tweens.add({
        targets: hand,
        scaleX: 1.1,
        scaleY: 0.8,
        x: scene.xbot * 0.4,
        y: scene.ybot,
        angle: -5,
        duration: 150,
        ease: 'Sine.easeInOut',
        repeat: 0,
        onComplete: () => backHand(scene)
    });
}

const backHand = (scene) => {
    const hand = scene.hand
    scene.tweens.add({
        targets: hand,
        scaleX: hand.originalScaleX,
        scaleY: hand.originalScaleY,
        x: hand.originalX,
        y: hand.originalY,
        angle: 0,
        duration: 150,
        ease: 'Sine.easeInOut',
        repeat: 0
    });
}

const pulseCamera = (scene) => {
    scene.tweens.add({
        targets: scene.cameras.main,
        zoom: 1.01,
        duration: 100,
        yoyo: true,
        repeat: 1
    });
}

const flashTerminalScreen = (scene, color) => {
    scene.terminal.setTexture(color)
    scene.time.delayedCall(150, () => {
        scene.terminal.setTexture('default')
    })
}

export {moveSheet, attachCard, pulseCamera, flashTerminalScreen}