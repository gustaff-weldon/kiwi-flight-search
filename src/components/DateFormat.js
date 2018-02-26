import React from 'react'
import moment from 'moment'

export const
    DATE_WEEK_DAY_MONTH = "ddd D MMM",
    DATE_HOUR_MINUTE = "HH:mm"

export default function({ date, format }) {
    return (
        <span>{moment(date).format(format)}</span>
    )
}