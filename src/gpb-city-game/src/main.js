import Phaser from 'phaser'
import './css/styles.scss'
import GameScene from "./game/scene/gameScene.js";
import UserConfig from "./game/userConfig.js";
import TutorialScene from "./game/scene/tutorialScene.js";
import MainMenuScene from "./game/scene/mainMenuScene.js";
import {initWindowSize} from "./game/utils.js";
import UpgradeScene from "./game/scene/upgradeScene.js";

const userConfig = new UserConfig({
    playerInitLives: 3,
    playerInitScore: 0,
    levelInitTime: 30,
    levelInitSheetsNumber: 15,
    levelInitIncrementNumber: 3,
    session: {
        userHand: 'handLVL1',
        userHands: ['handLVL1'],
        multiplier: 1,
        totalScore: 500,
        best: 0
    },
    scenes: {
        mainMenuSceneName: 'Menu',
        tutorialSceneName: 'Tutorial',
        gameSceneName: 'Game',
        upgradeSceneName: 'Upgrade'
    }
})

const {height, width} = initWindowSize()
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#7A7A7A',
    antialias: true,
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.FIT,
        height: height,
        width: width
    },
    scene: [
        new MainMenuScene(userConfig.scenes.mainMenuSceneName, userConfig),
        new GameScene(userConfig.scenes.gameSceneName, userConfig),
        new TutorialScene(userConfig.scenes.tutorialSceneName, userConfig),
        new UpgradeScene(userConfig.scenes.upgradeSceneName, userConfig),
    ],
}


const game = new Phaser.Game(config)
