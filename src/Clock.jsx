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
            secondsColor: "black",
            lastDay: false,
            lastDayMessage: ""
        };
        this.interval;
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
        this.interval = setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
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
        if(Date.parse(new Date()) > Date.parse(deadline) && (Date.parse(new Date()) - Date.parse(deadline)) < 86400000) {
            const lastDay = true;
            const lastDayMessage = "Today is the day you have been waiting for..!";
            this.setState({lastDay, lastDayMessage});
        } else if(Date.parse(new Date()) > Date.parse(deadline) && (Date.parse(new Date()) - Date.parse(deadline)) > 86400000) {
            const lastDay = true;
            const days = parseInt((Date.parse(new Date()) - Date.parse(deadline))/86400000);
            const months = parseInt(days/30);
            const years = parseInt(months/12);
            const lastDayMessage = "It's been "+years+" years (or) "+months+" months (or) "+days+" days since the deadline has passed!";
            this.setState({lastDay, lastDayMessage});
        } else {
            this.setState({lastDay: false});
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
    }

    render() {

    const hour0 = <CreativeDigit num={this.leading0(this.state.hours).toString().charAt(0)} midLine="true" calculatorEffect="true" linesOpacity=".03" tiltDigit="-5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,5,0,0"/>;
    const hour1 = <CreativeDigit num={this.leading0(this.state.hours).toString().charAt(1)} midLine="true" calculatorEffect="true" linesOpacity=".03" tiltDigit="5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,0,0,0"/>;
    const divider0 = <ClockDivider dimensions="10,10" blink="false" margin="0,5,10,5"/>;
    const minutes0 = <CreativeDigit num={this.leading0(this.state.minutes).toString().charAt(0)} midLine="true" calculatorEffect="true" linesOpacity=".03" tiltDigit="5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,5,0,0"/>;
    const minutes1 = <CreativeDigit num={this.leading0(this.state.minutes).toString().charAt(1)} midLine="true" calculatorEffect="true" linesOpacity=".03" tiltDigit="-5" dimensions="35,25" roundedCorners="25" linesThickness="5" margin="0,0,0,0"/>;
    const seconds0 = <CreativeDigit num={this.leading0(this.state.seconds).toString().charAt(0)} midLine="true" digitColor={this.state.secondsColor} calculatorEffect="true" linesOpacity=".03" tiltDigit="-5" dimensions="22,15" roundedCorners="25" linesThickness="5" margin="0,5,0,10"/>;
    const seconds1 = <CreativeDigit num={this.leading0(this.state.seconds).toString().charAt(1)} midLine="true" digitColor={this.state.secondsColor} calculatorEffect="true" linesOpacity=".03" tiltDigit="5" dimensions="22,15" roundedCorners="25" linesThickness="5" margin="0,0,0,0"/>;

    if(!this.state.lastDay) {
      if(this.state.customClock && this.leading0(this.state.days).toString().length <= 2) {
          return (
                <div>
                      <CreativeDigit num={this.leading0(this.state.days).toString().charAt(0)} midLine="true" calculatorEffect="true" linesOpacity=".03" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                      <CreativeDigit num={this.leading0(this.state.days).toString().charAt(1)} midLine="true" calculatorEffect="true" linesOpacity=".03" dimensions="50,35" margin="0,0,0,0" roundedCorners="25"/> &nbsp; <span className="spanStyles"> days </span>
                      <div className="divideUs"> </div>
                      {hour0}
                      {hour1}
                      {divider0}
                      {minutes0}
                      {minutes1}
                      {seconds0}
                      {seconds1}
                </div>
          );
        } else if(this.state.customClock && this.leading0(this.state.days).toString().length == 3) {
            return (
                  <div>
                        <CreativeDigit num={this.leading0(this.state.days).toString().charAt(0)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                        <CreativeDigit num={this.leading0(this.state.days).toString().charAt(1)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                        <CreativeDigit num={this.leading0(this.state.days).toString().charAt(2)} midLine="true" dimensions="50,35" margin="0,0,0,0" roundedCorners="25"/> &nbsp; <span className="spanStyles"> days </span> <br/>
                        {hour0}
                        {hour1}
                        {divider0}
                        {minutes0}
                        {minutes1}
                        {seconds0}
                        {seconds1}
                    </div>
            );
          } else if(this.state.customClock && this.leading0(this.state.days).toString().length == 4) {
              return (
                    <div>
                          <CreativeDigit num={this.leading0(this.state.days).toString().charAt(0)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                          <CreativeDigit num={this.leading0(this.state.days).toString().charAt(1)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                          <CreativeDigit num={this.leading0(this.state.days).toString().charAt(2)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                          <CreativeDigit num={this.leading0(this.state.days).toString().charAt(3)} midLine="true" dimensions="50,35" margin="0,0,0,0" roundedCorners="25"/> &nbsp; <span className="spanStyles"> days </span> <br/>
                          {hour0}
                          {hour1}
                          {divider0}
                          {minutes0}
                          {minutes1}
                          {seconds0}
                          {seconds1}
                      </div>
              );
            } else if(this.state.customClock && this.leading0(this.state.days).toString().length == 5) {
                return (
                      <div>
                            <CreativeDigit num={this.leading0(this.state.days).toString().charAt(0)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                            <CreativeDigit num={this.leading0(this.state.days).toString().charAt(1)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                            <CreativeDigit num={this.leading0(this.state.days).toString().charAt(2)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                            <CreativeDigit num={this.leading0(this.state.days).toString().charAt(3)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                            <CreativeDigit num={this.leading0(this.state.days).toString().charAt(4)} midLine="true" dimensions="50,35" margin="0,0,0,0" roundedCorners="25"/> &nbsp; <span className="spanStyles"> days </span> <br/>
                            {hour0}
                            {hour1}
                            {divider0}
                            {minutes0}
                            {minutes1}
                            {seconds0}
                            {seconds1}
                      </div>
                );
              } else if(this.state.customClock && this.leading0(this.state.days).toString().length >= 6) {
                  return (
                        <div>
                              <CreativeDigit num={this.leading0(this.state.days).toString().charAt(0)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                              <CreativeDigit num={this.leading0(this.state.days).toString().charAt(1)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                              <CreativeDigit num={this.leading0(this.state.days).toString().charAt(2)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                              <CreativeDigit num={this.leading0(this.state.days).toString().charAt(3)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                              <CreativeDigit num={this.leading0(this.state.days).toString().charAt(4)} midLine="true" dimensions="50,35" margin="0,5,0,0" roundedCorners="25"/>
                              <CreativeDigit num={this.leading0(this.state.days).toString().charAt(5)} midLine="true" dimensions="50,35" margin="0,0,0,0" roundedCorners="25"/> &nbsp; <span className="spanStyles"> days </span> <br/>
                              {hour0}
                              {hour1}
                              {divider0}
                              {minutes0}
                              {minutes1}
                              {seconds0}
                              {seconds1}
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
    } else {
        return(
            <div> {this.state.lastDayMessage} </div>
        )
    }
    }
}

export default Clock;
