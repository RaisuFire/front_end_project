import { GameScene } from '../../core/game_scene'
import { BlockComb } from '../game/block_comb'
import { KeySettings as keySettings } from '../data'
import { ActionController } from '../../core/action_controller'


export class SceneMain extends GameScene {
    setup() {
        let game = this.game
        let area = this.game.area
        this.blockComb = BlockComb.instance(this.game)
        this.pushElement(area)
        this.pushElement(this.blockComb)

        // 注册“左移”按键事件
        let that = this
        let leftCode = keySettings.left.keyCode
        game.registerAction(leftCode, ActionController.new({
            key: 'left',
            begin: 200,
            interval: 100,
            callback() {
                that.blockComb.moveLeft()
            },
        }))

        // 注册“右移”按键事件
        let rightCode = keySettings.right.keyCode
        game.registerAction(rightCode, ActionController.new({
            key: 'right',
            begin: 200,
            interval: 100,
            callback() {
                that.blockComb.moveRight()
            },
        }))

        // 注册“下”按键事件
        let speedUpCode = keySettings.speedUp.keyCode
        game.registerAction(speedUpCode, ActionController.new({
            key: 'drop',
            begin: 200,
            interval: 100,
            callback() {
                that.blockComb.drop()
            },
        }))

        // 注册“上”按键事件
        let rotateCode = keySettings.rotate.keyCode
        game.registerAction(rotateCode, ActionController.new({
            key: 'drop',
            begin: 200,
            interval: 100,
            callback() {
                that.blockComb.rotate()
            },
        }))


    }

    draw() {
        super.draw()

        if(this.blockComb.isBlocked()) {
            this.blockComb.occupy()
            this.game.area.update()
            this.blockComb.init()
        }
    }

    update() {

        this.blockComb.update()
        // super.update()
    }

}
