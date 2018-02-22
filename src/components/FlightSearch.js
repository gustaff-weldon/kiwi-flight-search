import React from 'react'

import Autocomplete from 'react-autocomplete'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FormGroup, ControlLabel } from 'react-bootstrap'

import 'react-datepicker/dist/react-datepicker.css'

const callWithInputValue = function (handler) {
    return function(event) {
        return handler({ name: event.target.value })
    }
}

const formatLocationName = function(location) {
    return location.type === 'airport'
        ? `${location.name} (${location.code})`
        : location.name
}

export default function ({ from, fromSuggestions, to, toSuggestions, date, onFromChange, onToChange, onDateChange }) {
    return (
        <form>
            <FormGroup>
                <ControlLabel>From</ControlLabel>
                <Autocomplete
                    getItemValue={formatLocationName}
                    items={fromSuggestions}
                    inputProps={{
                        className: "form-control"
                    }}
                    renderItem={(item, isHighlighted) =>
                        <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {formatLocationName(item)}
                        </div>
                    }
                    value={formatLocationName(from)}
                    wrapperStyle={{}}
                    onChange={callWithInputValue(onFromChange)}
                    onSelect={(value, item) => onFromChange(item)}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>To</ControlLabel>
                <Autocomplete
                    getItemValue={formatLocationName}
                    items={toSuggestions}
                    inputProps={{
                        className: "form-control"
                    }}
                    renderItem={(item, isHighlighted) =>
                        <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {formatLocationName(item)}
                        </div>
                    }
                    value={formatLocationName(to)}
                    wrapperStyle={{}}
                    onChange={callWithInputValue(onToChange)}
                    onSelect={(value, item) => onToChange(item)}
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
