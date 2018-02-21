export function findFlights({ currency = 'EUR', from, to, date, offset = 0, limit = 20 }) {
    const formattedDate = date.format('DD/MM/YYYY')

    return fetch('https://api.skypicker.com/flights?' +
        `flyFrom=${from}&to=${to}` +
        `&dateFrom=${formattedDate}&dateTo=${formattedDate}` +
        `&curr=${currency}` +
        `&offset=${offset}&limit=${limit}` +
        `&sort=price&asc=1`
    ).then(function(response) {
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