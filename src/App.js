import React, { Component } from 'react';
import Bulb from './components/Bulb';
import Control from './components/Control';
import './scss/App.css';

class App extends Component {
    constructor() {
        super();
        this.control = this.control.bind(this);
        this.finishControl = this.finishControl.bind(this);
    }
    control(e) {
        this.ControlComponent.moveControl(e);
    }
    finishControl(e) {
        this.ControlComponent.finishControl(e);
    }
  render() {
    return (
      <div className="App"
           onDragStart={() => false}
           onMouseMove={ this.control }
           onMouseUp = { this.finishControl } >
          <Bulb><Control ref={(control) => (this.ControlComponent = control)} /></Bulb>
      </div>
    );
  }
}

export default App;
