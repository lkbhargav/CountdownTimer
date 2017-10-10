import React, { Component } from 'react';
import CreativeDigit, { ClockDivider } from './CreativeDigit';
import './App.css';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            customClock: false,
            secondsColor: "black"
        }
    }

    componentWillMount() {
        this.getTimeUntil(this.props.deadline);

        if(this.props.clockStyle != null && this.props.clockStyle != undefined) {
            this.setState({customClock: this.props.clockStyle});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.clockStyle != null && nextProps.clockStyle != undefined) {
            this.setState({customClock: nextProps.clockStyle});
        }
    }

    componentDidMount() {
        setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
    }

    leading0(num) {
        return (num < 10) ? '0'+num: num;
    }

    getTimeUntil(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date());
        const seconds = Math.floor((time/1000)%60);
        const minutes = Math.floor((time/1000/60)%60);
        const hours = Math.floor((time/(1000*60*60) % 24));
        const days = Math.floor(time/(1000*60*60*24));

        let secondsColor = "0,0,0";
        if(seconds <= 59 && seconds > 45) {
            secondsColor = "0,128,0"
        } else if(seconds <= 45 && seconds > 30) {
            secondsColor = "204,204,0";
        } else if(seconds <= 30 && seconds > 15) {
            secondsColor = "255,160,122";
        } else if(seconds <= 15 && seconds > 0) {
            secondsColor = "255,0,0";
        } else if(seconds === 0) {
            secondsColor = "0,0,0";
        }

        this.setState({secondsColor});

        this.setState({days, hours, minutes, seconds});
    }

    render() {
      if(this.state.customClock) {
          return (
                <div>
                      <CreativeDigit num={this.leading0(this.state.days).toString().charAt(0)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                      <CreativeDigit num={this.leading0(this.state.days).toString().charAt(1)} midLine="true" dimensions="50,35" margin="0,0,0,0" roundedCorners="25"/> &nbsp; <span className="spanStyles"> days </span> <br/>
                      <CreativeDigit num={this.leading0(this.state.hours).toString().charAt(0)} midLine="true" tiltDigit="-5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,5,0,0"/>
                      <CreativeDigit num={this.leading0(this.state.hours).toString().charAt(1)} midLine="true" tiltDigit="5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,0,0,0"/>
                      <ClockDivider dimensions="10,10" blink="true" margin="0,5,10,5"/>
                      <CreativeDigit num={this.leading0(this.state.minutes).toString().charAt(0)} midLine="true" tiltDigit="5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,5,0,0"/>
                      <CreativeDigit num={this.leading0(this.state.minutes).toString().charAt(1)} midLine="true" tiltDigit="-5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,0,0,0"/>
                      <CreativeDigit num={this.leading0(this.state.seconds).toString().charAt(0)} midLine="true" digitColor={this.state.secondsColor} tiltDigit="-5" dimensions="22,15" roundedCorners="25" linesThickness="5" margin="0,5,0,10"/>
                      <CreativeDigit num={this.leading0(this.state.seconds).toString().charAt(1)} midLine="true" digitColor={this.state.secondsColor} tiltDigit="5" dimensions="22,15" roundedCorners="25" linesThickness="5" margin="0,0,0,0"/>
                </div>
          );
        } else {
          return (
                <div>
                      <div className='Clock-days'>{this.leading0(this.state.days)} days </div>
                      <div className='Clock-hours'>{this.leading0(this.state.hours)} hours </div>
                      <div className='Clock-minutes'>{this.leading0(this.state.minutes)} minutes </div>
                      <div className='Clock-seconds'>{this.leading0(this.state.seconds)} seconds </div>
                </div>
          );
        }
    }
}

export default Clock;
