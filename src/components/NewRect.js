import React, { Component } from 'react';
import PropTypes from "prop-types";
import { ChromePicker } from "react-color";
import addIcon from './add.svg'

class NewRect extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        color: PropTypes.string,
        addNewColor: PropTypes.func,

        index: PropTypes.number
    }
    static defaultProps = {
        width: "30px",
        height: "30px",
        color: "#1b1f22"
    }
    state = {
        color: this.props.color,
        displayColorPicker: false
    }
    toggleColorPicker = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }
    handleClose = () => {
        this.setState({ displayColorPicker: false });
        this.props.addNewColor(this.state.color);


    };
    handleChange = (color) => {
        this.setState({ color: color.hex });
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
                    style={{ width: this.props.width, height: this.props.height, backgroundColor: this.props.color, display: "inline-block" }}
                    onClick={this.toggleColorPicker}
                >
                    <img src={addIcon} alt="add new color" />
                </div>
                { this.state.displayColorPicker ?
                    <div style={popover}>
                        <div style={cover} onClick={this.handleClose} />
                        <ChromePicker color={this.state.color} onChangeComplete={this.handleChange} disableAlpha={true} />
                    </div> : null}
            </div>);
    }
}

export default NewRect;