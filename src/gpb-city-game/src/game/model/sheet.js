class Sheet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name, isGood) {
        super(scene, x, y, name)
        this.isGood = isGood
        scene.add.existing(this)
    }
}

export {Sheet}