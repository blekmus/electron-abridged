/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { uniqueId } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'

function Table() {
  const styles = css`
    margin-top: 60px;
    width: 85%;
    margin-left: auto;
    margin-right: auto;
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
  `

  // init state
  const [rawData, setRawData] = useState([])

  // get entries after page renders
  useEffect(() => {
    window.electron.getEntries().then((e) => setRawData(e))
  }, [])

  const data = useMemo(() => rawData.map((entry) => ({
    col1: entry.name,
    col2: entry.creator[0].name,
    col3: entry.type,
    col4: entry.tags.map((tag) => <div key={uniqueId()}>{tag.name}</div>),
  })), [rawData])

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'col1',
    },
    {
      Header: 'Creator',
      accessor: 'col2',
    },
    {
      Header: 'Type',
      accessor: 'col3',
    },
    {
      Header: 'Tags',
      accessor: 'col4',
    },
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  const HeaderContent = () => headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
      ))}
    </tr>
  ))

  const BodyContent = () => rows.map((row) => {
    prepareRow(row)
    return (
      <tr {...row.getRowProps()} onClick={() => console.log(row.original.link)}>
        <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
        <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
        <td className="type-cell" {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
        <td className="tag-cell" {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td>
      </tr>
    )
  })

  return (
    <table css={styles} {...getTableProps()}>
      <thead>
        <HeaderContent />
      </thead>

      <tbody {...getTableBodyProps()}>
        <BodyContent />
      </tbody>
    </table>
  )
}

export default Table
