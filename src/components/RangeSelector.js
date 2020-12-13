import React, { Component } from 'react';
import axios from 'axios'
import MultiSlider from "multi-slider";


class RangeSelector extends Component {
    constructor(props) {
        super(props);
        var maxValue = props.maxValue;
        var sz = props.stepSize
        var values = [props.lower / sz, props.upper / sz - props.lower / sz, maxValue / sz - props.upper / sz]

        this.state = {
            stepSize: props.stepSize,
            parameterName: props.parameterName,
            maxValue: maxValue,
            values: values,
        }
    }
    onChange = (values) => {
        this.setState({ values: values })
        var data = {}

        data[this.state.parameterName + "Min"] = values[0] * this.state.stepSize
        data[this.state.parameterName + "Max"] = (values[0] + values[1]) * this.state.stepSize

        axios.put(this.props.url + "/params", data)
    }
    render() {
        return (<div>
            <code>{this.props.displayName} in range [{this.state.values[0] * this.state.stepSize}, {(this.state.values[1] + this.state.values[0]) * this.state.stepSize})</code>
            <MultiSlider values={this.state.values} onChange={this.onChange} />
        </div>);
    }
}

export default RangeSelector;