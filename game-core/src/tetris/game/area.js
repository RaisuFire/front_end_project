import { BlockCol, BlockColor, BlockRow } from '../data'

export function Block() {
    let o = {
        color: BlockColor.default,
        occupied: false,
    }
    return o
}

export class Area {
    constructor(game) {
        this.game = game
        this.board = []
        this.row = BlockRow
        this.col = BlockCol

        this.init()
    }

    static instance(game) {
        this.i = this.i || new this(game)
        return this.i
    }

    init() {
        let r = this.row
        for(let i = 0; i < r; i++) {

            this.board[i] = []
            let c = this.col
            for(let j = 0; j < c; j++) {

                let b = Block()
                this.board[i][j] = b
            }
        }
    }

    lineIsFull(line) {
        return line.map(b => {
            return b.occupied
        }).reduce((prev, cur) => {
            return prev && cur
        })
    }

    // 设置一整行的方块
    setLine(lineIndex, color, occupied) {
        let line = this.board[lineIndex]
        for(let i = 0; i < this.col; i++) {
            let block = line[i]
            block.color = color
            block.occupied = occupied
        }
    }

    clearFullLines(lines) {
        let ls = lines
        ls.forEach((li) => {
            let deleted = this.board.splice(li, 1)[0]
            this.board.unshift(deleted)
        })
    }

    draw() {
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.col; j++) {
                let b = this.board[i][j]
                this.game.drawBlockByIndex(j, i, b.color)
            }
        }
    }

    update() {
        let lines = []
        for(let i = 0; i < this.row; i++) {
            if(this.lineIsFull(this.board[i])) {
                lines.push(i)
            }
        }

        lines.map(li => {
            this.setLine(li, BlockColor.default, false)
        })

        this.clearFullLines(lines)

    }

}
