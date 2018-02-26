import React from 'react'
import FlightDetails from './FlightDetails'
import { Panel } from 'react-bootstrap'

import './FlightList.css'

export default function({ flights, currency }) {
    const rows = flights.map(function (flight) {
        return <FlightDetails
            currency={currency}
            flight={flight}
            key={flight.id}
        />
    })

    return (
        <section>
            {
                rows.length
                    ? [ rows ]
                    : <Panel className="flight-list__empty text-center">No flights found</Panel>
            }
        </section>
    )
}