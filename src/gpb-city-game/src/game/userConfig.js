class UserConfig {
    init
    player
    scale
    level

    constructor(initFunction) {
        this.init = function () {
            ({player: this.player, scale: this.scale, level: this.level} = initFunction())
        }
    }
}

export default UserConfig