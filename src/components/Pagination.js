import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function ({ offset, limit, total, onOffsetChange }) {
    let pages = []

    const renderPageNumber = function(page, pageOffset) {
        return (
            <Pagination.Item
                active={pageOffset === offset}
                key={pageOffset}
                onClick={() => onOffsetChange(pageOffset)}>{page}
            </Pagination.Item>
        )
    }

    for (let i = 0, page = 1; i < total; i = i + limit, page++) {
        pages.push(renderPageNumber(page, i))
    }

    return (
        <nav>
            <Pagination>{pages}</Pagination>
        </nav>
    )
}