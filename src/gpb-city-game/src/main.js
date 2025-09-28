import Phaser from 'phaser'
import './css/styles.scss'
import GameScene from "./game/scene/gameScene.js";
import UserConfig from "./game/userConfig.js";
import TutorialScene from "./game/scene/tutorialScene.js";
import MainMenuScene from "./game/scene/mainMenuScene.js";

const userConfig = new UserConfig({
    playerInitLives: 3,
    playerInitScore: 0,
    levelInitTime: 15,
    levelInitSheetsNumber: 3,
    levelInitIncrementNumber: 1,
    scaleSheet: 0.4,
    scaleHand: 0.5,
    scaleBg: 1,
    scaleHeart: 0.33
})
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#7A7A7A',
    antialias: true,
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: [
        new MainMenuScene('Menu', 'Game', 'Tutorial', 'Upgrade', userConfig),
        new TutorialScene('Tutorial', userConfig),
        new GameScene('Game', userConfig)
    ],
}

const game = new Phaser.Game(config)

