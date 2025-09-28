class Hand extends Phaser.GameObjects.Sprite {
    originalX
    originalY
    originalScaleX
    originalScaleY
    sprite = name

    constructor(scene, x, y, name) {
        super(scene, x, y, name)
        this.originalScaleX = this.scaleX
        this.originalScaleY = this.scaleY
        this.originalX = x
        this.originalY = y
        this.sprite = name
        scene.add.existing(this)
    }
}

export default Hand