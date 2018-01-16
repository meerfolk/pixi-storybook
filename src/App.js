import React from "react"
import { Module } from "./Module"
import { LeftPanel } from "./leftPanel/LeftPanel"

export class App extends React.Component {

    constructor(props) {
        super(props)
        if (declareAll) {
            declareAll(this.props.module)
        }
    }

    componentWillReceiveProps(props) {
        if (declareAll) {
            declareAll(props.module)
        }
    }

    render() {
        return(
            <div style={{display: "flex"}}>
                <LeftPanel items={this.props.module.map} itemClickHandler={this.buttonClickHandler.bind(this)}/>
                <div >
                    <canvas id="pixi"/>
                </div>
            </div>
        )
    }

    buttonClickHandler(item) {
        let obj = this.props.module.map.get(item)
        if (obj) {
            this.props.pixiHandler(obj)
        }
    }
    
}

