import React, { Component } from 'react';
import axios from 'axios'
import MultiSlider from "multi-slider";
import PropTypes from "prop-types";

class RangeSelector extends Component {
    static propTypes = {
        lower: PropTypes.number,
        upper: PropTypes.number,
        maxValue: PropTypes.number,
        stepSize: PropTypes.number,
        parameterName: PropTypes.string,
        displayName: PropTypes.string,
    }

    constructor(props) {
        super(props);
        var maxValue = props.maxValue;
        var sz = props.stepSize;
        var values = [
            props.lower / sz,
            props.upper / sz - props.lower / sz,
            maxValue / sz - props.upper / sz];

        this.state = {
            stepSize: props.stepSize,
            parameterName: props.parameterName,
            maxValue: maxValue,
            values: values,
            colors: ["#6b4118", "#FCBD7E", "#0F0F0F"]
        };
    }
    onChange = (values) => {
        this.setState({ values: values })
        var data = {}
        var parameterName = this.state.parameterName

        var min = values[0] * this.state.stepSize;
        var max = (values[0] + values[1]) * this.state.stepSize;
        data[parameterName] = { min: min, max: max }

        axios.put(this.props.url + "/params", data)
    }
    render() {
        return (<div>
            <code>{this.props.displayName} in range [{this.state.values[0] * this.state.stepSize}, {(this.state.values[1] + this.state.values[0]) * this.state.stepSize})</code>
            <MultiSlider
                values={this.state.values}
                onChange={this.onChange}
                colors={this.state.colors}
                trackSize={5}
                height={20}
                handleSize={8}
                bg={"#0F0F0F"}
                handleInnerDotSize={2} />
        </div>);
    }
}

export default RangeSelector;