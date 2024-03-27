class MiniV {
    #root = undefined
    #v = undefined
    #app = undefined
    #stateArr = []
    #stateKey = -1
    constructor() {

    }

    useState = (v) => {
        this.#stateKey++
        if (this.#stateArr[this.#stateKey] === undefined) {
            this.#stateArr.push(v)
        }
        const currentV = this.#stateArr[this.#stateKey]
        const fuKey = this.#stateKey
        const updated = (fu) => {
            this.#stateArr[fuKey] = typeof fu === 'function' ? fu(currentV) : fu
            this.#stateKey = -1
            this.render()


        }
        return [currentV, updated]
    }
    creatRoot = (root) => {
        this.#root = root
        return this
    }
    render = (app) => {
        this.#app = app || this.#app
        this.#root.innerHTML = ''
        this.#root.innerHTML = this.#app()
        // this.#root.appendChild(this.#app())
    }
}
const _MiniV = new MiniV()
const { useState } = _MiniV

export {
    useState
}

export default _MiniV