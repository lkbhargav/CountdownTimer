import React, { Component } from 'react';

class CreativeDigit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        topNum: ["111", "001", "011", "011", "101", "110", "110", "011", "111", "111"],
        bottomNum: ["111", "100", "011", "110", "100", "110", "111", "100", "111", "110"],
        middle: ["0","0","1","1","1","1","1","0","1","1"],
        num: 2,
        calculatorEffect: false,
        linesOpacity: 0.1,
        midLine: false,
        red: 0,
        green: 0,
        blue: 0,
        width: "100px",
        height: "75px",
        display: "inline-block",
        linesThickness: "10px",
        margin: ["10px", "10px", "10px", "10px"],
        roundedCorners: "10%",
        tiltDigit: "rotate(0deg)"
      };
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.num !== nextProps.num && nextProps.num) {
          this.setState({num: nextProps.num});
        }

        if(nextProps.digitColor) {
          const colors = nextProps.digitColor.split(",");
          if(colors.length > 0) {
              if(colors[0] != this.state.red || colors[1] != this.state.green || colors[2] != this.state.blue) {
                  this.setState({red: parseInt(colors[0]), green: parseInt(colors[1]), blue: parseInt(colors[2])});
              }
          }
        }
    }

    componentWillMount() {

      if(this.props.linesOpacity) {
        const linesOpacity = parseFloat(this.props.linesOpacity);
        if(linesOpacity >= 0 && linesOpacity <= 1) {
            this.setState({linesOpacity});
        }
      }

      if(this.props.tiltDigit) {
        const tiltDigit = parseInt(this.props.tiltDigit);
        if((tiltDigit > 0 && tiltDigit < 360) || (tiltDigit > -360 && tiltDigit < 0)) {
          this.setState({tiltDigit: "rotate("+tiltDigit+"deg)"});
        }
      }

      if(this.props.margin) {
        const margin = this.props.margin.split(",");
        this.setState({margin: [margin[0]+"px", margin[1]+"px", margin[2]+"px", margin[3]+"px"]});
      }

      if(this.props.linesThickness) {
          const linesThickness = parseInt(this.props.linesThickness);
          if(linesThickness > 0) {
              linesThickness = linesThickness+"px";
              this.setState({linesThickness});
          }
      }

      if(this.props.display) {
        this.setState({display: this.props.display});
      }

      if(this.props.num) {
        const num = parseInt(this.props.num);
        if(num >= 0) {
            this.setState({num});
        }
      }

      if(this.props.midLine) {
        const midLine = this.getBoolean(this.props.midLine);
        this.setState({midLine});
      }

      if(this.props.calculatorEffect) {
        const calculatorEffect = this.getBoolean(this.props.calculatorEffect);
        this.setState({calculatorEffect});
      }

      if(this.props.roundedCorners) {
        const roundedCorners = this.props.roundedCorners+"%";
        this.setState({roundedCorners});
      }

      if(this.props.digitColor) {
          const colors = this.props.digitColor.split(",");
          if(colors.length > 0) {
              this.setState({red: parseInt(colors[0]), green: parseInt(colors[1]), blue: parseInt(colors[2])});
          }
      }

      if(this.props.dimensions) {
        const dimensions = this.props.dimensions.split(",");
        if(dimensions.length > 0) {
            this.setState({width: dimensions[0]+"px", height: dimensions[1]+"px"});
        }
      }

    }

    componentDidMount() {
      if(!this.state.midLine) {
        this.setState({topNum: ["111", "001", "011", "011", "101", "110", "110", "011", "010", "111"]});
        this.setState({bottomNum : ["111", "100", "011", "110", "100", "110", "111", "100", "010", "110"]});
      }
    }

    getBoolean(bool) {
        return (bool === "true")? true : false;
    }

    getOpacity(n) {
      if(parseInt(n) === 1) {
        return 1;
      } else {
        return (this.state.calculatorEffect)?this.state.linesOpacity:0;
      }
    }

    manufactureStyle(arr, loc) {
      const style = {width: this.state.width, height: this.state.height, borderWidth: this.state.linesThickness, WebkitTransform: this.state.tiltDigit, msTransform: this.state.tiltDigit, Transform: this.state.tiltDigit};
      const value = arr[this.state.num];

      const rgbaStart = 'rgba('+this.state.red+','+this.state.green+','+this.state.blue+',';
      const rgbaEnd = ')';

      if(loc === "top") {
        style.borderLeftColor = rgbaStart+this.getOpacity(value.charAt(0))+rgbaEnd;
        style.borderTopColor = rgbaStart+this.getOpacity(value.charAt(1))+rgbaEnd;
        style.borderRightColor = rgbaStart+this.getOpacity(value.charAt(2))+rgbaEnd;
        style.borderBottom = "none";
        style.borderTopLeftRadius = this.state.roundedCorners;
        style.borderTopRightRadius = this.state.roundedCorners;
      } else if(loc === "bottom") {
        style.borderRightColor = rgbaStart+this.getOpacity(value.charAt(0))+rgbaEnd;
        style.borderBottomColor = rgbaStart+this.getOpacity(value.charAt(1))+rgbaEnd;
        style.borderLeftColor = rgbaStart+this.getOpacity(value.charAt(2))+rgbaEnd;
        style.borderBottomLeftRadius = this.state.roundedCorners;
        style.borderBottomRightRadius = this.state.roundedCorners;
        style.borderTopColor = rgbaStart+this.getOpacity(this.state.middle[this.state.num])+rgbaEnd;
        style.borderTop = (this.state.midLine)?'default':'none';
      }
      return style;
    }

    getContainerStyles() {
      return {display: this.state.display, margin: this.state.margin[0]+" "+this.state.margin[1]+" "+this.state.margin[2]+" "+this.state.margin[3]};
    }

    render() {
      return (
        <div style={this.getContainerStyles()}>
          <div className="top" style={this.manufactureStyle(this.state.topNum, "top")}></div>
          <div className="bottom" style={this.manufactureStyle(this.state.bottomNum, "bottom")}></div>
        </div>
      );
    }

}

export class ClockDivider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blink: true,
            blinkRate: 500,
            width: "25px",
            height: "25px",
            thickness: "2px",
            fillColor: "black",
            margin: ["40px", "10px", "40px", "10px"],
            appearance: "circle",
            display: "block",
            borderColor: "black",
            tiltDigit: "rotate(90deg)",
            mainDivWidth: "10px"
        };
        this.interval;
    }

    getDotStyle() {
        const borderRadius = (this.state.appearance === "circle")? "50%":(this.state.appearance === "square")? "0%":this.state.appearance+"%";
        return {margin: this.state.margin[0]+" "+this.state.margin[1]+" "+this.state.margin[2]+" "+this.state.margin[3], width: this.state.width,
        height: this.state.height, borderRadius, borderColor: this.state.borderColor, borderWidth: `this.state.thickness`, borderStyle: 'solid', display: this.state.display,
        backgroundColor: this.state.fillColor, WebkitTransform: this.state.tiltDigit, msTransform: this.state.tiltDigit, Transform: this.state.tiltDigit};
    }

    componentWillMount() {
        if(this.props.blink) {
            const blink = (this.props.blink || this.props.blink === "true");
            this.setState({blink});
        }

        if(this.props.blinkRate) {
          const blinkRate = parseInt(this.props.blinkRate);
          if(blinkRate > 0) {
            this.setState({blinkRate});
          }
        }

        if(this.props.margin) {
          const margin = this.props.margin.split(",");
          this.setState({margin: [margin[0]+"px", margin[1]+"px", margin[2]+"px", margin[3]+"px"]});
        }

        if(this.props.tiltDigit) {
          const tiltDigit = parseInt(this.props.tiltDigit);
          if((tiltDigit > 0 && tiltDigit < 360) || (tiltDigit > -360 && tiltDigit < 0)) {
            this.setState({tiltDigit: "rotate("+tiltDigit+"deg)"});
          }
        }

        if(this.props.dimensions) {
          const dimensions = this.props.dimensions.split(",");
          if(dimensions.length > 0) {
              this.setState({width: dimensions[0]+"px", height: dimensions[1]+"px"});
          }
        }

        if(this.props.appearance) {
          const appearance = this.props.appearance;
            this.setState({appearance});
        }

        if(this.props.borderColor) {
          const borderColor = this.props.borderColor;
          this.setState({borderColor});
        }

        if(this.props.fillColor) {
          const fillColor = this.props.fillColor;
          this.setState({fillColor});
        }

        const mainDivWidth =  this.stripPx(this.state.width);
        this.setState({mainDivWidth});
    }

    componentDidMount() {
      if(this.state.blink !== null && this.state.blink !== undefined && this.state.blink == "true") {
        this.interval = setInterval(() => this.toggleContainerDisplay(), this.state.blinkRate);
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.blink != null && nextProps.blink != undefined) {
          this.setState({blink: nextProps.blink});
      }

      if(nextProps.blinkRate) {
          this.setState({blinkRate: parseInt(nextProps.blinkRate)});
      }
    }

    toggleContainerDisplay() {
        if(!this.state.blink) {
            clearInterval(this.interval);
            this.state.display = "none";
        }
        const display = (this.state.display === "none")?"block":"none";
        this.setState({display});
    }

    stripPx(pixel) {
      return parseInt(pixel.substring(0, pixel.indexOf('px')));
    }

    render() {
        return (
            <div style={{display: "inline-block", width: this.state.mainDivWidth}}>
                <div style={this.getDotStyle()}>   </div>
                <div style={this.getDotStyle()}>  </div>
            </div>
        );
    }

}

export default CreativeDigit;
