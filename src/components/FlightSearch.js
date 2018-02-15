import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export default class FlightSearchForm extends Component {
    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>From</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.from}
                        placeholder="From"
                        onChange={this.props.onFromChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>To</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.to}
                        placeholder="To"
                        onChange={this.props.onToChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <FormControl
                        type="date"
                        value={this.props.date}
                        placeholder="Date"
                        onChange={this.props.onDateChange}
                    />
                </FormGroup>
            </form>
        )
    }
}
