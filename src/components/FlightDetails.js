import React from 'react'
import DateFormat from './DateFormat'
import CurrencyFormat from './CurrencyFormat'

const
    DATE_WEEK_DAY_MONTH = "ddd D MMM",
    DATE_HOUR_MINUTE = "HH:mm"

export default function({ flight, currency }) {
    return (
        <tr>
            <td><CurrencyFormat amount={flight.price} currency={currency} /></td>
            <td>
                <DateFormat date={flight.dTime} format={DATE_HOUR_MINUTE} /> - <DateFormat date={flight.aTime} format={DATE_HOUR_MINUTE} /><br/>
                <DateFormat date={flight.dTime} format={DATE_WEEK_DAY_MONTH} />
            </td>
            <td>
                {flight.fly_duration}<br/>
                {flight.cityFrom} ({flight.flyFrom}) -> {flight.cityTo} ({flight.flyTo})
            </td>
        </tr>
    )
}