import React, { Component } from 'react';
import axios from 'axios'
import RangeSelector from './RangeSelector'
import ValueSelector from './ValueSelector'

class Params extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            mounted: false,

        }
    }
    componentDidMount = () => {
        console.log("url: " + this.props.url)
        axios.get(this.props.url + "/mode").then((resp) => {
            var newUrl = this.props.url + "/" + resp.data.activeMode
            this.setState({ url:  newUrl});
            axios.get(newUrl + "/ui").then((resp) => {

                this.setState({
                    elements: resp.data.elements,
                    mounted: true,
                });
            }, (resp) => {
                console.log("loading failed: " + resp)
            })
        })

    }

    render() {
        if (this.state.mounted) {
            return (
                <div>
                    {this.state.elements.map((element) => {
                        var stepSize = element.hasOwnProperty("stepSize") ? element.stepSize : 1;
                        if (element.type === "range") {
                            return (
                                <RangeSelector
                                    key={element.parameterName}
                                    displayName={element.displayName}
                                    parameterName={element.parameterName}
                                    lower={element.lower}
                                    upper={element.upper}
                                    maxValue={element.max}
                                    stepSize={stepSize}
                                    url={this.state.url}
                                    height={20}
                                />
                            )
                        } else if (element.type === "value") {
                            return (
                                <ValueSelector
                                    key={element.parameterName}
                                    displayName={element.displayName}
                                    parameterName={element.parameterName}
                                    current={element.current}
                                    maxValue={element.max}
                                    stepSize={stepSize}
                                    url={this.state.url}
                                    height={20}
                                />

                            )
                        } else {
                            return (<div></div>)
                        }
                    })}
                </div>
            );
        }
        else {
            return (
                <div>loading interface...</div>
            )
        }
    }
}

export default Params;