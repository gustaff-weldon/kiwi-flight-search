import React, { Component } from 'react'
import moment from 'moment'
import debounce from 'lodash.debounce'
import update from 'immutability-helper'

import FlightSearchForm from './components/FlightSearch'
import FlightList from './components/FlightList'
import { findFlights } from './api/flights'

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'


const updateStateProperty = function (stateGroup, groupProperty) {
  return function (value) {
    const newState = update(this.state, {
      [stateGroup]: { [groupProperty]: { $set: value } }
    })
    this.setState(newState)
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flightSearch: {
        from: "",
        to: "",
        date: moment(),
      },
      flightResults: {
        flights: [],
        offset: 0,
        limit: 20
      }
    }

    this.handleFromChange = updateStateProperty('flightSearch', 'from').bind(this)
    this.handleToChange = updateStateProperty('flightSearch', 'to').bind(this)
    this.handleDateChange = updateStateProperty('flightSearch', 'date').bind(this)
    this.onFlightSearchChange = debounce(this.onFlightSearchChange, 300) // no need to hit server too often
  }

  componentDidUpdate(prevProps, prevState) {
    const { from, to, date } = this.state.flightSearch

    // no important state change, ignore
    if (from === prevState.flightSearch.from && to === prevState.flightSearch.to && date === prevState.flightSearch.date) {
      return
    }
    console.log(this.state)

    this.onFlightSearchChange()
  }

  onFlightSearchChange() {
    const { from, to, date } = this.state.flightSearch

    if (!from || !to || !date) {
      // at least one of the required values is missing, reset flights list an bail out
      const newState = update(this.state, {
        flightResults: { flights: { $set: [] } }
      })
      this.setState(newState)
      return
    }

    console.log('Triggered flights for', from, to, date)
    findFlights(from, to, date)
      .then((flights) => {
        console.log('got', flights.length)
        const newState = update(this.state, {
          flightResults: { flights: { $set: flights } }
        })
        this.setState(newState)
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
            from={this.state.flightSearch.from}
            to={this.state.flightSearch.to}
            date={this.state.flightSearch.date}
            onFromChange={this.handleFromChange}
            onToChange={this.handleToChange}
            onDateChange={this.handleDateChange}
          />
        </header>

        <section className="App-intro">
          <FlightList flights={this.state.flightResults.flights} />
        </section>
      </div>
    );
  }
}

export default App;
