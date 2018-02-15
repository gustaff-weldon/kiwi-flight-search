import React,  { Component } from 'react'

export default class FlightList extends Component {
    render() {
        const rows = this.props.flights.map(function (flight) {
            return (<tr>
                <td>{flight.timeTakeOff}</td>
                <td>{flight.timeLanding}</td>
                <td>{flight.price}</td>
            </tr>)
        })

        return (
            <table>
                { rows }
            </table>
        )
    }
}