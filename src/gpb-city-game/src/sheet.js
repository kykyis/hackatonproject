class Sheet extends Phaser.GameObjects.Sprite {
    scene
    isGood

    constructor(scene, x, y, name, isGood) {
        super(scene, x, y, name)
        this.scene = scene
        this.scene.add.existing(this)
        this.isGood = isGood
    }


}

export {Sheet}