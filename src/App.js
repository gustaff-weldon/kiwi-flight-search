import React, { Component } from 'react'
import moment from 'moment'
import debounce from 'lodash.debounce'
import update from 'immutability-helper'

import FlightSearchForm from './components/FlightSearch'
import FlightList from './components/FlightList'
import Pagination from './components/Pagination'
import { findFlights } from './api/flights'

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

const emptyFlightsState = function() {
  return {
    flights: [],
    currency: 'EUR',
    offset: 0,
    limit: 5,
    total: 0
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
      flightResults: emptyFlightsState()
    }

    this.handleFromChange = updateStateProperty('flightSearch', 'from').bind(this)
    this.handleToChange = updateStateProperty('flightSearch', 'to').bind(this)
    this.handleDateChange = updateStateProperty('flightSearch', 'date').bind(this)
    this.handleFlightSearchChange = debounce(this.handleFlightSearchChange, 100).bind(this) // no need to hit server too often
    this.handleOffsetChange = this.handleOffsetChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const
      { from, to, date } = this.state.flightSearch,
      { offset } = this.state.flightResults

    // prevent requests when state change does not affect results
    if (from === prevState.flightSearch.from
        && to === prevState.flightSearch.to
        && date === prevState.flightSearch.date
        && offset === prevState.flightResults.offset) {
      return
    }

    this.handleFlightSearchChange()
  }

  handleFlightSearchChange() {
    const
      { from, to, date } = this.state.flightSearch,
      { offset, limit } = this.state.flightResults

    if (!from || !to || !date) {
      // at least one of the required values is missing, reset search results
      this.setState({
        flightResults: emptyFlightsState()
      })
      return
    }

    findFlights({ from, to, date, offset, limit })
      .then((flightResults) => {
      console.log('flight results', flightResults)
        this.setState({ flightResults })
      })
      .catch(function () {
        // noop atm might show a flash message or sth
      })
  }

  handleOffsetChange(newOffset) {
    const newState = update(this.state, {
      flightResults: { offset: { $set: newOffset } }
    })
    this.setState(newState)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
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
          <FlightList flights={this.state.flightResults.flights} currency={this.state.flightResults.currency} />
          <Pagination
            offset={this.state.flightResults.offset}
            limit={this.state.flightResults.limit}
            total={this.state.flightResults.total}
            onOffsetChange={this.handleOffsetChange}
          />
        </section>
      </div>
    );
  }
}

export default App;
