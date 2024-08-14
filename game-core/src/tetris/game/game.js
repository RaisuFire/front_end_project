import { CoreGame } from '../../core/game'
import { BlockCol, KeySettings } from '../data'
import { SceneMain } from '../scene/main'
import { Area } from './area'

export default class Game extends CoreGame{
    constructor(callback) {
        super('#id-canvas', KeySettings)

        this.callbackRun = callback
        this.setup()
        this.__start()
    }

    setup() {
        this.blockSize = this.canvas.width / BlockCol
        this.area = Area.instance(this)
    }

    drawBlockByPosition(x, y, color) {
        let bs = this.blockSize
        this.ctx.fillRect(x, y, bs, bs)
    }

    drawBlockByIndex(rowIndex, colIndex, color) {
        let bs = this.blockSize
        let x = rowIndex * bs
        let y = colIndex * bs
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, bs, bs)
    }

    __start() {
        this.replaceScene(SceneMain)
        this.callbackRun(this)
    }
}
