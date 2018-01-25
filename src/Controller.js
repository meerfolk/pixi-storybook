import { DisplayObject, Container, Graphics } from "pixi.js"

export class Controller extends Container {

    constructor(obj: DisplayObject) {
        super()
        this.addChild(obj)
        this.bodrer = new Graphics()
        this.addChild(this.bodrer)
        this.interactive = true
        this.on("mousedown", this._downHandler)
        this.on("mouseup", this._upHanler)
        this.on("mousemove", this._moveHandler)
        this.baseObj = obj
    }

    _moveHandler(e) {
        if (e.data.originalEvent.buttons === 1 
            && e.data.originalEvent.ctrlKey && this._obj) {
            let dX = this._x - e.data.global.x
            this._obj.position.x -= dX
            let dY = this._y - e.data.global.y
            this._obj.position.y -= dY
            this._x = e.data.global.x
            this._y = e.data.global.y
        }
    }

    _upHanler() {
        if (this._obj === null) {
            return
        }
        console.log({x: this._obj.position.x, y: this._obj.position.y})
        this._obj = null
    }

    _downHandler(e) {
        if (e.data.originalEvent.ctrlKey) {
            this._obj = this._findObject(this.baseObj, e.data.global.x, e.data.global.y)
            this._drawBorder(this._obj)
            this._x = e.data.global.x
            this._y = e.data.global.y
        }
    }

    _drawBorder(obj) {
        if (!obj) {
            return
        }
        let b = obj.getBounds()
        this.removeChild(this.bodrer)
        let g = new Graphics()
        g.beginFill(0xFF0000)
        g.drawRect(b.x, b.y, b.width, b.height)
        g.endFill()
        g.alpha = 0.2
        this.bodrer = g
        this.addChild(this.bodrer);
    }

    _findObject(obj, x, y) {
        let result 
        for(let index in obj.children) {
            let item = obj.children[obj.children.length - index - 1]
            if (!item.visible) {
                continue
            }
            let b = item.getBounds()
            if (x > b.x && y > b.y && x < (b.x + b.width) && y < (b.y + b.height)) {
                result = item
            }
            if (item.children.length > 0) {
                result = this._findObject(item, x, y)
            }
            if (result) {
                break
            }
        }
        return result
    }
}