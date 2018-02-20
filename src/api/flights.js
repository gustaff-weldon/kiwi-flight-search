export function findFlights(from, to, date) {
    const formattedDate = date.format('DD/MM/YYYY')

    return fetch(`https://api.skypicker.com/flights?flyFrom=${from}&to=${to}&dateFrom=${formattedDate}&dateTo=${formattedDate}`)
        .then(function(response) {
            return response.json()
                .then(function (payload) {
                    // we are only interested in flights
                    return payload.data
                })
        })
}