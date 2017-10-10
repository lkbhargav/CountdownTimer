import React, { Component } from 'react';
import ActualClock from './ActualClock';
import { Form, FormControl, Button} from 'react-bootstrap';

class StopwatchApp extends React.Component {

      constructor(props) {
          super(props);
          this.state = {
            realTime: '01h 05s',
            time: ''
          }
      }

      setStopwatch() {
        this.setState({realTime: this.state.time});
      }

      render() {
          return (
              <div>
                <Form inline>
                    <FormControl placeholder='Ex: 25d 1h 20m 10s' onChange={event => this.setState({time: event.target.value})} />
                    <Button onClick={() => this.setStopwatch()}>Start stopwatch</Button>
                </Form>
                <ActualClock time={this.state.realTime}/>
              </div>
          );
      }

}

export default StopwatchApp;
