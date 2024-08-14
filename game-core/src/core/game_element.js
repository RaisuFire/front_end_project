export class GameElement {
    constructor (game) {
        this.game = game
        this.setup()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        this.i.init()
        return this.i
    }

    static new(...args) {
        return new this(...args)
    }

    setup() {}

    init() {}

    // 直接触发所有子元素的 draw
    draw() {}

    update() {}
}
