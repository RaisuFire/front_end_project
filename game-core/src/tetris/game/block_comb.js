import { BlockColor, BlockType } from '../data'

export class BlockComb {
    constructor(game) {
        this.game = game
        this.init()
    }

    static instance(game) {
        this.i = this.i || new this(game)
        return this.i
    }

    init() {
        // let canvas = this.game.canvas
        this.x = 0
        this.y = 0
        this.color = BlockColor.occupied
        this.retired = false
        this.updateCD = 10
        this.maxUpdateCD = 10
        this.coors = this.randBlockType()
    }



    move(offset) {
        if (this.retired) {
            return
        }

        this.x += offset
    }

    moveLeft() {
        this.move(-1)
    }

    moveRight() {
        this.move(1)
    }

    drop() {
        if(!this.isBlocked()) {
            this.updateY()
        }
    }

    rotate() {
        // 方块退休时不能旋转
        if (this.retired) {
            return
        }

        // get rotated coordinates
        let newCoors = this.rotateCoors(this.coors)
        let area = this.game.area


        this.coors = newCoors
    }

    rotateCoors(coors) {
        let newCoors = coors.map(c => [-c[1], c[0]])
        let m = newCoors.sort(function (c1, c2) {
            return c1[0] === c2[0] ? c1[1] - c2[1] : c1[0] - c2[0]
        })[0]

        // ensure the first one coor with 0 as x coordinate
        let offsetX = m[0]
        let offsetY = m[1]
        let xDiff = this.coorDiff(coors, 0)

        if (xDiff === 3) {
            offsetX -= 1
            offsetY += 1
        }
        return newCoors.map(c => [c[0] - offsetX, c[1] - offsetY])
    }

    coorDiff(coors, index) {
        var array = coors.map(c => {
            return c[index]
        })

        return Math.max(...array) - Math.min(...array)
    }

    randBlockType() {
        return BlockType[Math.floor(Math.random() * BlockType.length)]
    }

    isBlocked() {
        let area = this.game.area
        for (let c of this.coors) {
            try {
                if (this.y + c[1] + 1 === area.row ||
                    area.board[this.y + c[1] + 1][this.x + c[0]].occupied)
                    return true
            } catch (err) {
                console.error("isBlocked err: ", err)
            }
        }
        return false
    }

    // 占据游戏画板
    occupy() {
        let board = this.game.area.board
        for (let c of this.coors) {
            try {
                let block = board[this.y + c[1]][this.x + c[0]]
                block.occupied = true
                block.color = BlockColor.occupied
            } catch(ex) {

            }
        }
    }

    retire() {
        this.retired = true
        this.color = BlockColor.indicate
    }

    draw() {
        for(let c of this.coors) {
            this.game.drawBlockByIndex(this.x + c[0], this.y + c[1], this.color)
        }
    }

    updateY() {
        this.isBlocked() ? this.retire() : this.y++
    }

    update() {
        if(this.updateCD <= 0) {

            this.updateY()
            this.updateCD = this.maxUpdateCD
        } else {
            this.updateCD--
        }
    }
}
