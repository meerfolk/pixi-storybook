export class Module {

    constructor() {
        this.map = new Map()
    }
    add(name, handler) {
        this.map.set(name, handler())
    }

}