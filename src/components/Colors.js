import React, { Component } from 'react';
import axios from 'axios'
import Rect from './Rect'
import NewRect from './NewRect'

class Colors extends Component {
    constructor(props) {
        super(props);
        this.state = { colors: [] }
    };

    componentDidMount = () => {
        console.log("url: " + this.props.url)
        axios.get(this.props.url + "/colors").then((resp) => {

            this.setState({
                colors: resp.data.colors,
                mounted: true,
            });
        }, (resp) => {
            console.log("loading failed: " + resp)
        })
    };

    handleChangedColors = (index, newColor) => {
        const newColors = this.state.colors.slice();
        newColors[index] = newColor;
        this.setState({ colors: newColors });
    };

    addNewColor = (color) => {
        this.setState({ colors: [...this.state.colors, color] });
        this.sendPalette();
    };

    removeColor = (index) => {
        this.setState({ colors: this.state.colors.filter((_, i) => i !== index) })
        this.sendPalette();
    };

    sendPalette = () => {
        axios.put(this.props.url + "/colors", this.state.colors);
    };
    render() {
        return (<div>
            {this.state.colors.map((color, index) => {
                return (<Rect
                    submitColorPalette={this.sendPalette}
                    changeColors={this.handleChangedColors}
                    removeColor={this.removeColor}
                    color={color}
                    key={index}
                    index={index}
                />)
            })}
            <NewRect
                addNewColor={this.addNewColor}
            />
        </div>);
    }
}

export default Colors;