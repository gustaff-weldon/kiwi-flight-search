import React from 'react'

import { Col, ControlLabel, FormGroup, Row } from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DATE_WEEK_DAY_MONTH } from './DateFormat'
import { formatDate, parseDate } from 'react-day-picker/moment'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-day-picker/lib/style.css'




const formatLocationName = function(location) {
    return location.type === 'airport'
        ? `${location.name} (${location.code})`
        : location.name
}


export default function ({ from, fromSuggestions, to, toSuggestions, date, onFromChange, onToChange, onDateChange }) {
    return (
        <Row>
            <Col md={4}>
                <FormGroup>
                    <ControlLabel>From</ControlLabel>
                    <Typeahead
                        autoFocus={true}
                        emptyLabel={false}
                        filterBy={(value) => value}
                        labelKey={formatLocationName}
                        options={fromSuggestions}
                        onChange={(selectedItems) => {
                            onFromChange(selectedItems[0])
                        }}
                        onInputChange={(text) => onFromChange({ name: text })}
                    />
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                    <ControlLabel>To</ControlLabel>
                    <Typeahead
                        emptyLabel={false}
                        filterBy={(value) => value}
                        labelKey={formatLocationName}
                        options={toSuggestions}
                        onChange={(selectedItems) => {
                            onToChange(selectedItems[0])
                        }}
                        onInputChange={(text) => onToChange({ name: text })}
                    />
                </FormGroup>
            </Col>
            <Col md={4} >
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    {/*
                        FIXME there's an issue with the date field being editable atm,
                        we want to display nice date but we do not want user to edit it in the field
                    */}
                    <DayPickerInput
                        classNames={{ container: '', overlay: 'dropdown-menu', overlayWrapper: 'dropdown open' }}
                        dayPickerProps={{ disabledDays: { before: new Date() } }}
                        inputProps={{ className: 'form-control' }}
                        format={DATE_WEEK_DAY_MONTH}
                        formatDate={formatDate}
                        parseDate={parseDate}
                        onDayChange={onDateChange}
                        placeholder=""
                        value={date}
                    />
                </FormGroup>
            </Col>
        </Row>
    )
}
