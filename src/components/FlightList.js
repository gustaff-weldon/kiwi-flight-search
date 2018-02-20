import React,  { Component } from 'react'
import FlightDetails from './FlightDetails'

export default class FlightList extends Component {
    render() {
        const rows = this.props.flights.map(function (flight) {
            return <FlightDetails flight={flight} key={flight.id} />
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
}