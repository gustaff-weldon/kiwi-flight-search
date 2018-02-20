import React from 'react'
import moment from 'moment'

export default function({ date, format }) {
    return (
        <span>{moment(date).format(format)}</span>
    )
}