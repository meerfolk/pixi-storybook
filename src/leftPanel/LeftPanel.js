import React from "react"

const divStyle = {
    width: "200px",
    height: "100vh",
    marginRight: "20px",
    background: "#ddd"
}

export class LeftPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            current: null
        }
    }

    componentWillReceiveProps(props) {
        if (this.state.current != null) {
            props.itemClickHandler(this.state.current)
        }
    }

    render() {
        return(
            <div style={divStyle}>
                {this.renderListItems(this.props.items, this.props.itemClickHandler)}
            </div>
        )
    }

    renderListItems(items, clickHandler) {
        return Array.from(items.keys()).map((item, index) => (
            <div style={{cursor: "pointer", background: this.state.current == item ? "green" : null}}
                key={index}
                onClick={() => {this.setState({current: item}, () => clickHandler(item))}}>
                {item}
            </div>
        ))
    }

}