import React from 'react'
import FlightDetails from './FlightDetails'
import { Panel } from 'react-bootstrap'

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
                    : <Panel className="pad-all--l text-center">We came up empty :(  Try another date?</Panel>
            }
        </section>
    )
}