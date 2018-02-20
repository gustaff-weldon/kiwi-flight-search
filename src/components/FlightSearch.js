import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import 'react-datepicker/dist/react-datepicker.css'

const callWithInputValue = function (handler) {
    return function(event) {
        return handler(event.target.value)
    }
}

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
                        onChange={callWithInputValue(this.props.onFromChange)}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>To</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.to}
                        placeholder="To"
                        onChange={callWithInputValue(this.props.onToChange)}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <DatePicker
                        className="form-control"
                        dateFormat="DD/MM/YYYY"
                        minDate={moment()}
                        selected={this.props.date}
                        onChange={this.props.onDateChange}
                    />
                </FormGroup>
            </form>
        )
    }
}
