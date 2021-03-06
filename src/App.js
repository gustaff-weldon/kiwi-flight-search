import React, { Component } from 'react'
import { Grid, Panel } from 'react-bootstrap'
import debounce from 'lodash.debounce'
import update from 'immutability-helper'

import FlightSearchForm from './components/FlightSearch'
import FlightList from './components/FlightList'
import Pagination from './components/Pagination'
import ProgressLine from './components/ProgressLine'
import { findFlights, findLocations } from './api/rest'

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

    DEFAULT_DELAY = 100

    constructor(props) {
        super(props)
        this.state = {
            flightSearch: {
                from: {
                    name: '',
                    code: ''
                },
                fromSuggestions: [],
                to: {
                    name: '',
                    code: ''
                },
                toSuggestions: [],
                date: new Date(),
            },
            flightResults: emptyFlightsState(),
            hasValidSearch: false,
            isSearching: false
        }

        this.handleFromChange = updateStateProperty('flightSearch', 'from')
        this.handleToChange = updateStateProperty('flightSearch', 'to')
        this.handleDateChange = updateStateProperty('flightSearch', 'date')

        // FIXME: move debounce to the search form field handlers that trigger change events */
        this.handleFlightSearchChange = debounce(this.handleFlightSearchChange, this.DEFAULT_DELAY) // no need to hit server too often
        this.handleLocationChange = debounce(this.handleLocationChange, this.DEFAULT_DELAY) // no need to hit server too often

        // bind handlers to be able to use as listeners with access to this
        // FIXME: this screams for some kind of bound-handler helper that autobinds passed function to current component
        ;['handleFromChange', 'handleToChange', 'handleDateChange', 'handleOffsetChange' ].forEach((name) => {
            this[name] = this[name].bind(this)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const
            { from, to, date } = this.state.flightSearch,
            { offset } = this.state.flightResults

        // prevent requests when state change does not affect results
        if (from !== prevState.flightSearch.from
            || to !== prevState.flightSearch.to
            || date !== prevState.flightSearch.date
            || offset !== prevState.flightResults.offset) {
            this.handleFlightSearchChange()
        }

        if (from !== prevState.flightSearch.from) {
            this.handleLocationChange('from')
        }

        if (to !== prevState.flightSearch.to) {
            this.handleLocationChange('to')
        }
    }

    handleFlightSearchChange() {
        const
            { from, to, date } = this.state.flightSearch,
            { offset, limit } = this.state.flightResults

        if (!from || !from.code || !to || !to.code || !date) {
            // at least one of the required values is missing, reset search results
            this.setState({
                hasValidSearch: false,
                flightResults: emptyFlightsState()
            })
            return
        }

        this.setState({
            isSearching: true,
            hasValidSearch: true,
        })

        findFlights({ from: from.code, to: to.code, date, offset, limit })
            .then((flightResults) => {
                this.setState({ flightResults })
            })
            .catch(function () {
                // noop atm, might show a flash message or sth
            })
            .finally(() => {
                this.setState({ isSearching: false })
            })
    }

    handleLocationChange(locationType) {
        const term = this.state.flightSearch[locationType] && this.state.flightSearch[locationType].name

        if (!term) {
            // field cleared, remove its suggestions
            const newState = update(this.state, {
                flightSearch: { [locationType + 'Suggestions']: { $set: [] } }
            })
            this.setState(newState)
            return
        }

        findLocations(term)
            .then((locations) => {
                const newState = update(this.state, {
                    flightSearch: { [locationType + 'Suggestions']: { $set: locations } }
                })
                this.setState(newState)
            })
            .catch(function () {
                // noop atm, might show a flash message or sth
            })
    }


    handleOffsetChange(newOffset) {
        const newState = update(this.state, {
            flightResults: { offset: { $set: newOffset } }
        })
        this.setState(newState)
    }

    render() {
        const progress = this.state.isSearching
            ? <ProgressLine />
            : ''

        return (
            <Grid className="content pad-ver--m pad-hor--l" fluid={true}>

                <FlightSearchForm
                    from={this.state.flightSearch.from}
                    fromSuggestions={this.state.flightSearch.fromSuggestions}
                    to={this.state.flightSearch.to}
                    toSuggestions={this.state.flightSearch.toSuggestions}
                    date={this.state.flightSearch.date}
                    onFromChange={this.handleFromChange}
                    onToChange={this.handleToChange}
                    onDateChange={this.handleDateChange}
                />

                {progress}

                {this.state.hasValidSearch ? (
                    <FlightList
                        flights={this.state.flightResults.flights}
                        currency={this.state.flightResults.currency}
                    />
                ) : (
                    <Panel className="pad-all--l text-center">Plan your yourney!</Panel>
                )}

                <Pagination
                    offset={this.state.flightResults.offset}
                    limit={this.state.flightResults.limit}
                    total={this.state.flightResults.total}
                    onOffsetChange={this.handleOffsetChange}
                />
            </Grid>
        )
    }
}

export default App
