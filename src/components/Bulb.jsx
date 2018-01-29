import React, { Component } from 'react';
import '../scss/Bulb.css';

export default class Bulb extends Component {
    constructor() {
        super();
        this.state = {
            brightness: 1
        };

        this.updateBrightness = this.updateBrightness.bind(this);
    }

    style() {
        return {
            opacity: this.state.brightness
        };
    }

    updateBrightness(level) {
        if (level >= 0 && level <= 1)
            this.setState({ brightness: level });
    }

    render() {
        return (
            <div className="Bulb" style={this.style()}>{
                React.cloneElement(this.props.children, {
                    bright: this.updateBrightness
                })
            }</div>
        );
    }
}