import React from 'react'
import DateFormat, { DATE_WEEK_DAY_MONTH, DATE_HOUR_MINUTE } from './DateFormat'
import CurrencyFormat from './CurrencyFormat'
import { Col, Grid, Panel, Row } from 'react-bootstrap'

import './FlightDetails.css'

export default function({ flight, currency }) {
    return (
        <Panel className="flight-details">
            <Grid fluid={true}>
                <Row>
                    <Col xs={3}>
                        <h3><CurrencyFormat amount={flight.price} currency={currency} /></h3>
                    </Col>

                    <Col xs={5}>
                        <p>
                            <b><DateFormat date={flight.dTime} format={DATE_HOUR_MINUTE} /> - <DateFormat date={flight.aTime} format={DATE_HOUR_MINUTE} /></b><br/>
                            <small><DateFormat date={flight.dTime} format={DATE_WEEK_DAY_MONTH} /></small><br/>
                            <small>{flight.flyFrom} -> {flight.flyTo}</small>
                        </p>
                    </Col>

                    <Col xs={3}>
                        <p>
                            {flight.fly_duration}<br/>
                        </p>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}