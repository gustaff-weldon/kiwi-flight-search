import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import FlightSearchForm from './components/FlightSearch';
import FlightList from './components/FlightList';

const updateStateProp = function (stateProperty) {
  return function (event) {
    this.setState({
      [stateProperty]: event.target.value
    })
  }
};

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      from: "",
      to: "",
      date: "",
      flights: [{
        timeTakeOff: '12:10',
        timeLanding: '13:00',
        price: '100 EUR'
      }]
    }

    this.handleFromChange = updateStateProp('from').bind(this);
    this.handleToChange = updateStateProp('to').bind(this);
    this.handleDateChange = updateStateProp('date').bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <FlightSearchForm
            from={this.state.from}
            to={this.state.to}
            date={this.state.date}
            onFromChange={this.handleFromChange}
            onToChange={this.handleToChange}
            onDateChange={this.handleDateChange}
          />
        </header>

        <section className="App-intro">
          <FlightList flights={this.state.flights} />
        </section>
      </div>
    );
  }
}

export default App;
