import React, { Component } from 'react';
import axios from 'axios'
import Rect from './Rect'

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

    handleChangedColors(key, newColor) {
        console.log(this)
        var i = this.state.colors.findIndex(key);
        this.state.colors[i] = newColor
        console.log(this.state.colors);
    };

    render() {
        return (<div>
            {this.state.colors.map(color => {
                return (<Rect submitColorPalette={this.handleChangedColors} color={color} key={color} />)
            })}
            <div onClick={() => console.log(this.state.colors)}>log colors</div>
        </div>);
    }
}

export default Colors;