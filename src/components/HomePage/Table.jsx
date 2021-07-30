/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import {
  useEffect, useMemo, useState, Fragment,
} from 'react'
import PropTypes from 'prop-types'
import { useTable, useSortBy, useFilters } from 'react-table'

import { v4 as uuid } from 'uuid'
import { matchSorter } from 'match-sorter' // for filtering tags in index page
import 'natural-compare-lite' // for sorting
import { useHistory } from 'react-router-dom'

function Table({ page }) {
  const styles = css`
    margin-top: 60px;
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;

    .table-funcs {
      .filter {
        background-color: #0E1A26;
        width: 380px;
        height: 41px;
        border-radius: 7px;
        display: flex;

        button {
          width: 115px;
          border-radius: 7px;
          background-color: #101E2D;
          border: none;
          font-weight: bold;
          letter-spacing: 0.3px;
          font-size: 16px;
          color: #AAB4BF;
          text-transform: uppercase;
          cursor: pointer;
        }

        input {
          background: none;
          width: 100%;
          color: white;
          border: none;
          padding-left: 10px;
          font-size: 17px;
        }
      }
    }

    .table {
      width: 100%;
      margin-top: 30px;
      border-spacing: 0 12px;

      thead {
        text-align: left;

        tr th {
          color: #6DB2F3;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 700;
          font-size: 19px;
          padding-left: 10px;

          &:first-of-type {
            padding-left: 20px;
          }

          .arrow {
            margin-left: 5px;
            display: inline;
            position: relative;

            &.inverted svg {
              transform: rotate(0deg);
            }

            svg {
              position: absolute;
              bottom: 2px;
              transform: rotate(180deg);
            }
          }
        }
      }

      tbody {
        tr {
          background-color: #0E1A26;
          cursor: pointer;

          &:active {
            background-color: #0e1a2663;
          }
        }

        tr td {
          padding: 14px 10px;
          color: #E5E6E7;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 400;
          font-size: 19px;
          white-space: nowrap;

          &:first-of-type {
            padding-left: 20px;
          }

          &.type-cell {
            text-transform: capitalize;
          }

          &.tag-cell {
            padding: 0 0 0 10px;

            div {
              display: inline-block;
              padding: 3px 5px;
              border-radius: 5px;
              background-color: #162738;
              font-size: 17px;
              font-weight: 600;
              color: #FF61AD;
              text-transform: capitalize;
              margin-right: 5px;
            }
          }
        }
      }
    }
  `

  const history = useHistory()

  // state
  const [rawData, setRawData] = useState([])
  const [filterInput, setFilterInput] = useState({ col: 'name', value: '', init: true })

  // bring in data when page renders
  useEffect(() => {
    window.electron.getEntries(page).then((e) => setRawData(e))
    setFilterInput({ col: 'name', value: '', init: true })
  }, [page])

  // sort arrow
  const arrow = (
    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.81322 16.3333C6.12564 16.6457 6.63217 16.6457 6.94459 16.3333L12.0358 11.2421C12.3482 10.9297 12.3482 10.4231 12.0358 10.1107C11.7233 9.7983 11.2168 9.7983 10.9044 10.1107L6.37891 14.6362L1.85342 10.1107C1.541 9.7983 1.03447 9.7983 0.722052 10.1107C0.409632 10.4231 0.409632 10.9297 0.722052 11.2421L5.81322 16.3333ZM7.17891 1.4131C7.17891 0.971274 6.82073 0.613103 6.37891 0.613103C5.93708 0.613103 5.57891 0.971274 5.57891 1.4131L7.17891 1.4131ZM7.17891 15.7676L7.17891 1.4131L5.57891 1.4131L5.57891 15.7676L7.17891 15.7676Z" fill="#6DB2F3" />
    </svg>
  )

  // table columns
  const columns = useMemo(() => {
    if (page === 'series') {
      return [
        {
          Header: 'Name',
          accessor: 'name',
          sortType: (rowA, rowB, columnId) => {
            const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
            const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

            const tempArr = [firstRow, secondRow]
            tempArr.sort(String.naturalCompare)

            if (firstRow === tempArr[0]) {
              return -1
            }

            return 1
          },
        },
        {
          Header: 'Creator',
          accessor: 'creator',
          sortType: (rowA, rowB, columnId) => {
            const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
            const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

            const tempArr = [firstRow, secondRow]
            tempArr.sort(String.naturalCompare)

            if (firstRow === tempArr[0]) {
              return -1
            }

            return 1
          },
        },
        {
          Header: 'Eps',
          accessor: 'eps',
          sortType: 'number',
        },
        {
          Header: 'Tags',
          accessor: 'tags',
          disableSortBy: true,
          filter: (rows, columnId, filterValue) => {
            if (filterValue === '') {
              return rows
            }

            return matchSorter(rows, filterValue, { keys: [`original.${columnId[0]}.*.props.children`], sorter: (item) => item })
          },
        },
      ]
    }

    if (page === 'short') {
      return [
        {
          Header: 'Name',
          accessor: 'name',
          sortType: (rowA, rowB, columnId) => {
            const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
            const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

            const tempArr = [firstRow, secondRow]
            tempArr.sort(String.naturalCompare)

            if (firstRow === tempArr[0]) {
              return -1
            }

            return 1
          },
        },
        {
          Header: 'Creator',
          accessor: 'creator',
          sortType: (rowA, rowB, columnId) => {
            const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
            const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

            const tempArr = [firstRow, secondRow]
            tempArr.sort(String.naturalCompare)

            if (firstRow === tempArr[0]) {
              return -1
            }

            return 1
          },
        },
        {
          Header: 'Tags',
          accessor: 'tags',
          disableSortBy: true,
          filter: (rows, columnId, filterValue) => {
            if (filterValue === '') {
              return rows
            }

            return matchSorter(rows, filterValue, { keys: [`original.${columnId[0]}.*.props.children`], sorter: (item) => item })
          },
        },
      ]
    }

    if (page === 'shot') {
      return [
        {
          Header: 'Name',
          accessor: 'name',
          sortType: (rowA, rowB, columnId) => {
            const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
            const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

            const tempArr = [firstRow, secondRow]
            tempArr.sort(String.naturalCompare)

            if (firstRow === tempArr[0]) {
              return -1
            }

            return 1
          },
        },
        {
          Header: 'Creator',
          accessor: 'creator',
          sortType: (rowA, rowB, columnId) => {
            const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
            const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

            const tempArr = [firstRow, secondRow]
            tempArr.sort(String.naturalCompare)

            if (firstRow === tempArr[0]) {
              return -1
            }

            return 1
          },
        },
        {
          Header: 'Tags',
          accessor: 'tags',
          disableSortBy: true,
          filter: (rows, columnId, filterValue) => {
            if (filterValue === '') {
              return rows
            }

            return matchSorter(rows, filterValue, { keys: [`original.${columnId[0]}.*.props.children`], sorter: (item) => item })
          },
        },
      ]
    }

    return [
      {
        Header: 'Name',
        accessor: 'name',
        sortType: (rowA, rowB, columnId) => {
          const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
          const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

          const tempArr = [firstRow, secondRow]
          tempArr.sort(String.naturalCompare)

          if (firstRow === tempArr[0]) {
            return -1
          }

          return 1
        },
      },
      {
        Header: 'Creator',
        accessor: 'creator',
        sortType: (rowA, rowB, columnId) => {
          const firstRow = rowA.original[columnId].replace(/\s+/g, '').toLowerCase()
          const secondRow = rowB.original[columnId].replace(/\s+/g, '').toLowerCase()

          const tempArr = [firstRow, secondRow]
          tempArr.sort(String.naturalCompare)

          if (firstRow === tempArr[0]) {
            return -1
          }

          return 1
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        disableSortBy: true,
        filter: (rows, columnId, filterValue) => {
          if (filterValue === '') {
            return rows
          }

          return matchSorter(rows, filterValue, { keys: [`original.${columnId[0]}.*.props.children`], sorter: (item) => item })
        },
      },
    ]
  }, [page])

  // table row data
  const data = useMemo(() => rawData.map((entry) => ({
    name: entry.name,
    creator: entry.creators[0],
    type: entry.type,
    tags: entry.tags.map((tag) => <div key={uuid()}>{tag}</div>),
    eps: (entry.files) ? entry.files.length : 0,
    id: (entry.id),
  })), [rawData])

  // init react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data }, useFilters, useSortBy)

  // jsx for table headers
  const HeaderContent = () => headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
          {column.render('Header')}

          {(column.isSorted && column.isSortedDesc) ? <div className="arrow inverted">{arrow}</div> : ''}
          {(column.isSorted && !column.isSortedDesc) ? <div className="arrow">{arrow}</div> : ''}
        </th>
      ))}
    </tr>
  ))

  // jsx for table body data
  const BodyContent = () => rows.map((row) => {
    prepareRow(row)

    let rowCells

    if (page === 'index') {
      rowCells = (
        <Fragment>
          <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
          <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
          <td className="type-cell" {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
          <td className="tag-cell" {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td>
        </Fragment>
      )
    } else if (page === 'series') {
      rowCells = (
        <Fragment>
          <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
          <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
          <td className="ep-cell" {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
          <td className="tag-cell" {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td>
        </Fragment>
      )
    } else if (page === 'short') {
      rowCells = (
        <Fragment>
          <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
          <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
          <td className="tag-cell" {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
        </Fragment>
      )
    } else if (page === 'shot') {
      rowCells = (
        <Fragment>
          <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
          <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
          <td className="tag-cell" {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
        </Fragment>
      )
    }

    return (
      <tr {...row.getRowProps()} onClick={() => history.push(`/entry/${row.original.id}`)} title={row.original.name}>
        {rowCells}
      </tr>
    )
  })

  // filter query value input
  const handleFilterInput = (e) => {
    const { value } = e.target
    setFilter(filterInput.col, value)
    setFilterInput({ col: filterInput.col, value })
  }

  // filter column change btn
  const handleFilterBtn = () => {
    let cols

    if (['index', 'short', 'shot'].includes(page)) {
      cols = ['name', 'creator', 'tags']
    } else {
      cols = ['name', 'creator', 'eps', 'tags']
    }

    const currentIndex = cols.indexOf(filterInput.col)
    const nextIndex = (currentIndex + 1) % cols.length

    setFilter(filterInput.col, '')
    setFilterInput({ col: cols[nextIndex], value: '', init: false })
  }

  return (
    <div css={styles}>
      <div className="table-funcs">
        <div className="filter">
          <button type="button" title="Toggle Filter Column" onClick={handleFilterBtn}>{ (filterInput.init) ? 'FILTER BY' : filterInput.col }</button>
          <input type="text" value={filterInput.value} onChange={handleFilterInput} placeholder="Enter query" />
        </div>
      </div>

      <table className="table" {...getTableProps()}>
        <thead>
          <HeaderContent />
        </thead>
        <tbody {...getTableBodyProps()}>
          <BodyContent />
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  page: PropTypes.string.isRequired,
}

export default Table
