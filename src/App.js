import React, { Component } from 'react'
import moment from 'moment'
import debounce from 'lodash.debounce'

import FlightSearchForm from './components/FlightSearch'
import FlightList from './components/FlightList'
import { findFlights } from './api/flights'

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'


const updateStateProperty = function (stateProperty) {
  return function (value) {
    this.setState({
      [stateProperty]: value
    })
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      from: "",
      to: "",
      date: moment(),
      flights: []
    }

    this.handleFromChange = updateStateProperty('from').bind(this)
    this.handleToChange = updateStateProperty('to').bind(this)
    this.handleDateChange = updateStateProperty('date').bind(this)
    this.onFlightSearchChange = debounce(this.onFlightSearchChange, 300) // no need to hit server too often
  }

  componentDidUpdate(prevProps, prevState) {
    const { from, to, date } = this.state

    // no important state change, ignore
    if (from === prevState.from && to === prevState.to && date === prevState.date) {
      return
    }
    console.log(this.state)

    this.onFlightSearchChange()
  }

  onFlightSearchChange() {
    const { from, to, date } = this.state

    if (!from || !to || !date) {
      // at least one of the required values is missing, reset flights list an bail out
      this.setState({
        flights: []
      })
      return
    }

    console.log('Triggered flights for', from, to, date)
    findFlights(from, to, date)
      .then((flights) => {
        console.log('got', flights.length)
        this.setState({ flights: flights })
      })
      .catch(function () {
        // noop atm might show a flash message or sth
      })
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
