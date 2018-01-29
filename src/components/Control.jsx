import React, { Component } from 'react';
import '../scss/Control.css';

export default class extends Component {
    constructor() {
        super();
        this.state = {
            capturedControl: false,
        };

        this.style = this.style.bind(this);
        this.captureControl = this.captureControl.bind(this);
        this.moveControl = this.moveControl.bind(this);
        this.finishControl = this.finishControl.bind(this);
    }
    style() {
        return {
            position: 'absolute',
            top: this.state.top,
            left: this.state.left,
        };
    }
    captureControl(e) {
        this.setState({
            capturedControl: true
        });
    }
    moveControl(e) {
        if (!this.state.capturedControl) return;
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }

        const R = 100; // radius of path
        const absoluteO = new Point(420, 350); //coordinates of circle (top left corner)
        const O = new Point( 100, 100 ); // coordinates of circle center (relative to absoluteO)
        const A = new Point( e.pageX - absoluteO.x, e.pageY - absoluteO.y ); // coordinates of mouse (relative to absoluteO)


        const OA = Math.sqrt(Math.pow(O.x - A.x, 2) + Math.pow(O.y - A.y, 2));
        const k = R / OA;

        const real = new Point();
        real.x = O.x + (A.x - O.x) * k;
        real.y = O.y + (A.y - O.y) * k;

        this.setState({
            top: real.y - 20,
            left: real.x - 20,
        });

        const relativeO = new Point(0, 0);
        const relativeReal = new Point(real.x - 100, real.y - 100);

        const tg = (relativeO.y - relativeReal.y)/(relativeO.x - relativeReal.x);
        const partOfCoordinates =
            relativeReal.x > 0 ?
                ( relativeReal.y > 0 ? 1 : 4 ) :
                ( relativeReal.y > 0 ? 2 : 3 ); // 1 || 2 || 3 || 4

        let angle = Math.atan(tg); //+ partOfCoordinates * 2 * Math.PI;
        switch(partOfCoordinates) {
            case 2:
                angle = Math.PI - angle;
                break;
            case 3:
                angle = Math.PI + angle;
                break;
            case 4:
                angle = 2 * Math.PI - angle;
                break;
        }

        /**
         * 1 - angle
         * 2 - PI - angle
         * 3 - PI + angle
         * 4 - 2PI - angle
         */

        // console.log(Math.atan(tg) * 180 / Math.PI, partOfCoordinates);
        // console.log(angle);
        const level = Math.atan(tg) / (2 * Math.PI);
        console.log(angle);
        this.props.bright(angle / (2 * Math.PI));
    }
    finishControl(e) {
        this.setState({ capturedControl: false });
    }
    render() {
        return (<div className="Control"
                     style={this.style()}
                     onDragStart={() => false}
                     onMouseDown = { this.captureControl }></div>);
    }
}