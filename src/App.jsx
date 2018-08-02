import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import { Form, FormControl, Button} from 'react-bootstrap';
import { getQueryStringParams } from './util.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deadline: "October 01, 2018, 16:00:00",
            newDeadline: "",
            clockStyle: true,
            name: ""
        };
    }

    componentDidMount() {
        const queryString = getQueryStringParams();

        const name = queryString.name?queryString.name.decoded:"MarTech Boston 2018";
        const deadline = queryString.due?queryString.due.decoded:"October 01, 2018, 16:00:00";

        console.log(queryString);

        this.setState({name, deadline});
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
                    <div className='App-title'> {this.state.name} </div>
                    <div className="centerText"> <span className="newDeadlineText"> ({this.state.deadline}) </span> </div>
                        <Clock deadline={this.state.deadline} clockStyle={this.state.clockStyle}/>
                </div>
        );
    }
}

/*
<Form inline>
    <FormControl className="Deadline-input" placeholder='new date' onChange={event => this.setState({newDeadline: event.target.value})}/>
    <Button onClick={() => this.changeDeadline()}>Submit</Button> &nbsp;
    <Button onClick={() => this.changeClockStyle()}>Change Clock</Button>
</Form>
*/

export default App;
