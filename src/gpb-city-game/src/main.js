import Phaser from 'phaser'
import './css/styles.scss'
import {GameScene} from "./gameScene.js";


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#efefef',
    antialias: true,
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: new GameScene('Game', () => {
        return {
            userScale: {
                bg: 1,
                hand: 0.5,
                sheet: 0.45,
            },
            sheets: {
                number: 10,
            },
            player: {
                life: 3,
                score: 0
            }
        };
    }),
}

const game = new Phaser.Game(config)

