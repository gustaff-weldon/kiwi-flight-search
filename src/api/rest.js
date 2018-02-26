import moment from 'moment'

const API_DATE_FORMAT = 'DD/MM/YYYY'

export function findFlights({ currency = 'EUR', from, to, date, offset = 0, limit = 20 }) {
    const
        formattedDate = moment(date).format(API_DATE_FORMAT),
        url = 'https://api.skypicker.com/flights?' +
            `flyFrom=${from}&to=${to}` +
            `&dateFrom=${formattedDate}&dateTo=${formattedDate}` +
            `&curr=${currency}` +
            `&offset=${offset}&limit=${limit}` +
            '&sort=price&asc=1'

    return fetch(url).then(function(response) {
        return response.json()
            .then(function (payload) {
                return {
                    limit,
                    offset,
                    currency: payload.currency,
                    flights: payload.data.map(function(flight) {
                        return Object.assign({}, flight, {  // convert UNIX timestamps (secs) to JS (millis)
                            aTime: flight.aTime * 1000,
                            dTime: flight.dTime * 1000,
                        })
                    }),
                    total: payload._results
                }
            })
    })
}

export function findLocations(term) {
    const url = `https://api.skypicker.com/locations/?term=${term}&v=2&locale=en-US&limit=5&sort=name&location_types=city&location_types=airport`

    return fetch(url).then(function (response) {
        return response.json()
            .then(function (payload) {
                return payload.locations
            })
    })
}