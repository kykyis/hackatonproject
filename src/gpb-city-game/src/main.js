import Phaser from 'phaser'
import './css/styles.scss'
import GameScene from "./gameScene.js";
import UserConfig from "./game/userConfig.js";
import Player from "./game/model/player.js";
import Scale from "./game/model/scale.js";
import Level from "./game/model/level.js";


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#DB9C7F',
    antialias: true,
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: new GameScene('Game', new UserConfig(() => {
        return {
            player: new Player(3, 0),
            scale: new Scale(1, 0.5, 0.4, 0.33),
            level: new Level(15, 3, 1),
        }
    })),
}

const game = new Phaser.Game(config)

