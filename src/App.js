import React, { Component } from 'react'
import moment from 'moment'
import throttle from 'lodash.throttle'

import FlightSearchForm from './components/FlightSearch'
import FlightList from './components/FlightList'
import { findFlights } from './api/flights'

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'


const throttledFindFlights = throttle(findFlights, 1000)

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
  }

  componentDidUpdate(prevProps, prevState) {
    const { from, to, date } = this.state

    // no important state change, ignore
    if (from === prevState.from && to === prevState.to && date === prevState.date) {
      return
    }
    console.log(this.state)

    if (from && to && date) {
      console.log('Triggered flights for', from, to, date)
      throttledFindFlights(from, to, date)
        .then((flights) => {
          console.log('got', flights.length)
          this.setState({ flights: flights })
        })
        .catch(function () {
          // noop atm might show a flash message or sth
        })
    } else {
      // one of the needed values was cleared, clear flights list as well
      this.setState({
        flights: []
      })
    }
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
