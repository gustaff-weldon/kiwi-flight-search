import React from 'react'

export default function ({ offset, limit, total, onOffsetChange }) {
    let pages = []

    const renderPageNumber = function(page, pageOffset) {
        return (
            <li key={pageOffset} className={pageOffset === offset ? 'current' : ''}>
                <a onClick={() => onOffsetChange(pageOffset)}>{page}</a>
            </li>
        )
    }

    for (let i = 0, page = 1; i < total; i = i + limit, page++) {
        pages.push(renderPageNumber(page, i))
    }

    return (
        <nav>
            <ul>
                {
                    [pages]
                }
            </ul>
        </nav>
    )
}