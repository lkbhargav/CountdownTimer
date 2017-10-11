import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import { Form, FormControl, Button} from 'react-bootstrap';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deadline: "October 11, 2017, 13:00:00",
            newDeadline: '',
            clockStyle: false
        };
    }

    changeDeadline() {
        this.setState({deadline: this.state.newDeadline});
    }

    changeClockStyle() {
        const clockStyle = !this.state.clockStyle;
        this.setState({clockStyle});
    }

    render() {
        return (
                <div className='App'>
                    <div className='App-title'> Countdown to {this.state.deadline} </div>
                        <Clock deadline={this.state.deadline} clockStyle={this.state.clockStyle}/>
                        <Form inline>
                            <FormControl className="Deadline-input" placeholder='new date' onChange={event => this.setState({newDeadline: event.target.value})}/>
                            <Button onClick={() => this.changeDeadline()}>Submit</Button> &nbsp;
                            <Button onClick={() => this.changeClockStyle()}>Change Clock</Button>
                        </Form>
                </div>
        );
    }
}

export default App;
