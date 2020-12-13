import React, { Component } from 'react';
import axios from 'axios'
import MultiSlider from "multi-slider";

class ValueSelector extends Component {
    constructor(props) {
        super(props);
        var maxValue = props.maxValue;
        var values = [props.current, maxValue - props.current]
        this.state = {
            parameterName: props.parameterName,
            maxValue: maxValue,
            values: values,
        }
    }
    onChange = (values) => {
        this.setState({ values: values })
        var data = {}
        data[this.state.parameterName] = values[0]
        axios.put(this.props.url + "/params", data)
    }
    render() {
        return (<div>
            <code>{this.props.displayName} is {this.state.values[0]}</code>

            <MultiSlider values={this.state.values} onChange={this.onChange} />
        </div>);
    }
}

export default ValueSelector;