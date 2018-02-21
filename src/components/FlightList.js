import React from 'react'
import FlightDetails from './FlightDetails'

export default function({ flights, currency }) {
    const rows = flights.map(function (flight) {
        return <FlightDetails
            flight={flight}
            currency={currency}
            key={flight.id}
        />
    })

    return (
        <table>
            <tbody>
                {
                    rows.length
                        ? [ rows ]
                        : <tr><td>No flights found</td></tr>
                }
            </tbody>
        </table>
    )
}