import React, { Component } from 'react';
import CreativeDigit, { ClockDivider } from './CreativeDigit';

class ActualClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          old: this.props.time,
          digitColor: "0,0,0",
          blink: true,
          blinkRate: 500
        }
        this.interval;
    }

    componentWillMount() {
        this.startStopwatch(this.props.time);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.runStopwatch(), 1000);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.old !== nextProps.time) {
          this.startStopwatch(this.props.time);
          clearInterval(this.interval);
          this.setState({digitColor: "0,0,0"});
          this.interval = setInterval(() => this.runStopwatch(), 1000);
        }
    }

    runStopwatch() {
      if(this.state.old !== this.props.time) {
        this.setState({old: this.props.time});
        this.startStopwatch(this.props.time);
      }
      let days = this.state.days;
      let hours = this.state.hours;
      let minutes = this.state.minutes;
      let seconds = this.state.seconds;
      if(days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
        if(seconds > 0) {
          seconds--;
        } else if(seconds == 0) {
          seconds = 59;
          if(minutes > 0) {
            minutes--;
          } else if(minutes == 0) {
            minutes = 59;
            if(hours > 0) {
              hours--;
            } else if(hours == 0) {
              hours = 23;
              if(days > 0) {
                days--;
              }
            }
          }
        }
      } else {
        alert("Stopwatch ran till its last breath as you set!");
        this.setState({old: '', digitColor: "0,0,0", blink: false});
        clearInterval(this.interval);
      }

      if(days == 0 && minutes == 0 && hours == 0 && seconds > 30 && seconds < 60) {
          const digitColor = "255,128,25";
          const blinkRate = 250;
          this.setState({digitColor, blinkRate});
      } else if(days == 0 && minutes == 0 && hours == 0 && seconds <= 30 && seconds > 0) {
          const digitColor = "255,0,0";
          const blinkRate = 125;
          this.setState({digitColor, blinkRate});
      }

      this.setState({days, hours, minutes, seconds});
    }

    leading0(num) {
        return (num < 10 && num.toString().length == 1) ? '0'+num: num;
    }

    setDefault(num) {
      return (isNaN(num)) ? 0 : num;
    }

    startStopwatch(time) {
      const days = this.leading0(this.setDefault((time[time.indexOf('d')-2])+""+(time[time.indexOf('d')-1])).toString().trim());
      const hours = this.leading0(this.setDefault((time[time.indexOf('h')-2])+""+(time[time.indexOf('h')-1])).toString().trim());
      const minutes = this.leading0(this.setDefault((time[time.indexOf('m')-2])+""+(time[time.indexOf('m')-1])).toString().trim());
      const seconds = this.leading0(this.setDefault((time[time.indexOf('s')-2])+""+(time[time.indexOf('s')-1])).toString().trim());

      this.setState({days, hours, minutes, seconds});
    }

    render() {
      return(
        <div>
          <div>
            <div>{this.leading0(this.state.days)} days </div>
            <div>{this.leading0(this.state.hours)} hours </div>
            <div>{this.leading0(this.state.minutes)} minutes </div>
            <div>{this.leading0(this.state.seconds)} seconds </div>
          </div>
          <CreativeDigit />
          <CreativeDigit num={this.leading0(this.state.hours).toString().charAt(0)} dimensions="150,110" calculatorEffect="true" midLine="true" linesOpacity="0.1" linesThickness="25" digitColor={this.state.digitColor} roundedCorners="25"/>
          <CreativeDigit num={this.leading0(this.state.hours).toString().charAt(1)} dimensions="150,110" calculatorEffect="true" midLine="true" linesOpacity="0.1" linesThickness="25" digitColor={this.state.digitColor} roundedCorners="25"/>
          <ClockDivider blink={this.state.blink} blinkRate="250" dimensions="32, 32" appearance="20" tiltDigit="0" margin="50,10,50,10" borderColor="black" fillColor="darkgray"/>
          <CreativeDigit num={this.leading0(this.state.minutes).toString().charAt(0)} dimensions="150,110" tiltDigit="5" margin="10,30,10,30" calculatorEffect="false"  midLine="false" linesOpacity="0.1" linesThickness="25" digitColor={this.state.digitColor} roundedCorners="25"/>
          <CreativeDigit num={this.leading0(this.state.minutes).toString().charAt(1)} dimensions="150,110" tiltDigit="-5" calculatorEffect="false"  midLine="false" linesOpacity="0.1" linesThickness="25" digitColor={this.state.digitColor} roundedCorners="25"/>
          <CreativeDigit num={this.leading0(this.state.seconds).toString().charAt(0)} dimensions="80,65" tiltDigit="-5" calculatorEffect="true" midLine="false" linesOpacity="0.1" linesThickness="15" digitColor={this.state.digitColor} roundedCorners="25"/>
          <CreativeDigit num={this.leading0(this.state.seconds).toString().charAt(1)} dimensions="80,65" tiltDigit="5"  calculatorEffect="true" midLine="false" linesOpacity="0.1" linesThickness="15" digitColor={this.state.digitColor} roundedCorners="25"/>
        </div>
      );
    }
}

export default ActualClock;
