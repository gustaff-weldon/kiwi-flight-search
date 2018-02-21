import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import 'react-datepicker/dist/react-datepicker.css'

const callWithInputValue = function (handler) {
    return function(event) {
        return handler(event.target.value)
    }
}

export default function({ from, to, date, onFromChange, onToChange, onDateChange }) {
    return (
        <form>
            <FormGroup>
                <ControlLabel>From</ControlLabel>
                <FormControl
                    type="text"
                    value={from}
                    placeholder="From"
                    onChange={callWithInputValue(onFromChange)}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>To</ControlLabel>
                <FormControl
                    type="text"
                    value={to}
                    placeholder="To"
                    onChange={callWithInputValue(onToChange)}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Date</ControlLabel>
                <DatePicker
                    className="form-control"
                    dateFormat="DD/MM/YYYY"
                    minDate={moment()}
                    selected={date}
                    onChange={onDateChange}
                />
            </FormGroup>
        </form>
    )
}
