import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import FlightSearchForm from './FlightSearchForm';

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
      flights: []
    }

    this.onFromChange = updateStateProp('from').bind(this);
    this.onToChange = updateStateProp('to').bind(this);
    this.onDateChange = updateStateProp('date').bind(this);
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
            onFromChange={this.onFromChange}
            onToChange={this.onToChange}
            onDateChange={this.onDateChange}
          />
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
