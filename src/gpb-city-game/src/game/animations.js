import {randomAngle} from "../utils.js";

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
    scene.tweens.add({
        targets: scene.hand,
        scaleY: 0.8,
        scaleX: 1.1,
        angle: -5,
        duration: 100,
        ease: 'Sine.easeInOut',
        yoyo: true,
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

export {moveSheet, attachCard, pulseCamera}