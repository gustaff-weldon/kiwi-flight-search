import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import FlightSearchForm from './FlightSearchForm';

class App extends Component {

  constructor(props) {
    super(props)
    this.state =  {
      search: {
        from: "",
        to: "",
        date: "",
      },
      flights: []
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <FlightSearchForm search={this.state.search} />
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
