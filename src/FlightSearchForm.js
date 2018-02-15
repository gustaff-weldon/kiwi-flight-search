import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const updateStateProp = function(stateProperty) {
    return function(event) {
        this.setState({
            [stateProperty]: event.target.value
        })

    }
}

export default class FlightSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: props.search.from,
            to: props.search.to,
            date: props.search.date
        };

        this.onFromChange = updateStateProp('from').bind(this);
        this.onToChange = updateStateProp('to').bind(this);
        this.onDateChange = updateStateProp('date').bind(this);
    }

    render() {
        return (
            <form>
                <div>Hello world</div>
                <FormGroup>
                    <ControlLabel>From</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.from}
                        placeholder="From"
                        onChange={this.onFromChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>To</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.to}
                        placeholder="To"
                        onChange={this.onToChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <FormControl
                        type="date"
                        value={this.state.date}
                        placeholder="Date"
                        onChange={this.onDateChange}
                    />
                </FormGroup>

            </form>
        )
    }
}
