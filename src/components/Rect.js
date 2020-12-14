import React, { Component } from 'react';
import PropTypes from "prop-types";
import { ChromePicker } from "react-color";
class Rect extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        color: PropTypes.string,
        submitColorPalette: PropTypes.func,
    }
    static defaultProps = {
        width: 20,
        height: 20,
    }
    state = {
        color: this.props.color,
        displayColorPicker: false
    }
    toggleColorPicker = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }
    handleClose = () => {
        this.setState({ displayColorPicker: false })

    };
    handleChange = (color) => {
        this.setState({ color: color.hex })
        this.props.submitColorPalette(this.props.key, color.hex)
    }
    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <div style={{ display: "inline-block" }}>
                <div
                    style={{ width: this.props.width, height: this.props.height, backgroundColor: this.state.color, display: "inline-block" }}
                    onClick={this.toggleColorPicker}
                />
                { this.state.displayColorPicker ? <div style={popover}>
                    <div style={cover} onClick={this.handleClose} />
                    <ChromePicker color={this.state.color} onChangeComplete={this.handleChange} disableAlpha={true} />
                </div> : null}
            </div>);
    }
}

export default Rect;