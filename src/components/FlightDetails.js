import React, { Component } from 'react'
import DateFormat from './DateFormat'
const DATE_WEEK_DAY_MONTH = "ddd D MMM"
const DATE_HOUR_MINUTE = "HH:mm"

export default class FlightDetails extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.flight.price}</td>
                <td>
                    <DateFormat date={this.props.flight.dTime} format={DATE_HOUR_MINUTE} /> - <DateFormat date={this.props.flight.aTime} format={DATE_HOUR_MINUTE} /><br/>
                    <DateFormat date={this.props.flight.dTime} format={DATE_WEEK_DAY_MONTH} />
                </td>
                <td>
                    {this.props.flight.fly_duration}<br/>
                    {this.props.flight.cityFrom} ({this.props.flight.flyFrom}) -> {this.props.flight.cityTo} ({this.props.flight.flyTo})
                </td>
            </tr>
        )
   }
}