import React from "react"
import ReactDOM from "react-dom"
import { App } from "./src/App"
import * as PIXI from "pixi.js"
import { AppContainer } from "react-hot-loader"
import { Module } from "./src/Module";

const stage = new PIXI.Container()

const pixiHandler = (object) => {
    stage.removeChildren();
    stage.addChild(object);
}

function startPixi() {
    const renderer = PIXI.autoDetectRenderer(
        800, 
        600, 
        {
            view: document.getElementById("pixi"),
            transparent: true
        })

    animate()
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(stage);
    }    
}

let firstRun = true

const render = (mdl) => {
    ReactDOM.render(
        <AppContainer>
            <App module={mdl} pixiHandler={pixiHandler.bind(this)}/>
        </AppContainer>
        ,document.getElementById("root")
        ,() => {
            if (firstRun) {
                startPixi()
                firstRun = false
            }
        }
    )
} 

try {
    before(() => render(new Module()))
} catch(_) {
    render(new Module())
}

if (module.hot) {
    module.hot.accept("./src/App", () => {
        render(new Module())
    })
}