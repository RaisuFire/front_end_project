import { EventController } from './event_controller'

export class CoreGame {
    constructor(selectors, keySettings) {
        this.canvas = document.querySelector(selectors)
        this.ctx = this.canvas.getContext('2d')

        this.process = null
        this.setupEventController(keySettings)
        this.paused = false
        this.fps = 20
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    setupEventController(keySettings) {
        this.eventCtrler = EventController.instance(this, keySettings)
    }

    setPauseKeyCode(keyCode) {
        this.eventCtrler.setPauseKeyCode(keyCode)
    }

    isPaused() {
        return this.paused
    }

    // 注册相应键码的事件
    registerAction(keyCode, controller) {
        this.eventCtrler.registerController(keyCode, controller)
    }

    removeAllActions() {
        this.eventCtrler.removeAllCallbacks()
    }

    // 游戏场景替换
    replaceScene(Scene, name) {
        // cancel the registered functions
        // this.removeAllActions()
        this.sceneName = name
        this.scene = Scene.instance(this)
        // Scene.new will:
        //      1st: create a singular instance at the first time or
        //      2nd: just initialize the instance
        this.eventCtrler.init()
    }

    draw() {
        this.scene.draw()
    }

    update() {
        this.scene.update()
    }

    clear() {
    }

    runloop() {
        this.clear()
        this.draw()
        this.update()
        this.process = setTimeout(() => {
            this.runloop()
        }, 1000 / this.fps)
    }

    run() {
        this.process = setTimeout(() => {
            this.runloop()
        }, 1000 / this.fps)
    }
}
