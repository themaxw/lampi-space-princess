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
            colors: ["#FCBD7E", "#0F0F0F"]
        }
    }
    onChange = (values) => {
        this.setState({ values: values })
        data[this.state.parameterName] = { current: values[0] }
        axios.put(this.props.url + "/params", data)
    }
    render() {
        return (<div>
            <code>{this.props.displayName} is {this.state.values[0]}</code>

            <MultiSlider
                values={this.state.values}
                onChange={this.onChange}
                height={20}
                trackSize={5}
                handleSize={8}
                handleInnerDotSize={2}
                colors={this.state.colors}
                bg={"#0F0F0F"}

            />

        </div>);
    }
}

export default ValueSelector;