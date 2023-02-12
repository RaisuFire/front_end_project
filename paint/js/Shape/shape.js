class Shape {
    constructor (paint) {
        this.paint = paint
        this.state = State.Create
    }

    setState(state) {
        this.state = state
    }

    log() {
        let str = this.constructor.name
        let propertys = Object.getOwnPropertyNames(this)
        for (let p of propertys) {
            str += ":{ " + `${p} : ${this[p]}` + "}"
        }
        console.log(str)
    }

    render(ctx) {
        // let ctx = this.paint.context

    }

}