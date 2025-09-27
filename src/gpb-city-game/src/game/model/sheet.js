class Sheet extends Phaser.GameObjects.Sprite {
    isGood

    constructor(scene, x, y, name, isGood) {
        super(scene, x, y, name)
        this.isGood = isGood
        scene.add.existing(this)
    }

}

export {Sheet}