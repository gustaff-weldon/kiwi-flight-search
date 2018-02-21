import React from 'react'

// dumb, hardcoded currency formatting patterns ;)
const CURRENCIES = {
    'EUR': 'value €'
}

const VALUE_PATTERN = /value/

export default function ({ amount, currency }) {
    let formattedValue = `${amount} ${currency}` // default format
    const format = CURRENCIES[currency]

    if (format) {
        formattedValue = format.replace(VALUE_PATTERN, amount)
    }

    return (
        <span>{formattedValue}</span>
    )
}