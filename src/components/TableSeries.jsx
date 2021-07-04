/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useMemo } from 'react'
import { useTable } from 'react-table'

function Table() {
  const styles = css`
  `

  const data = useMemo(() => [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      col1: 'whatever',
      col2: 'you want',
    },
  ], [])

  const columns = useMemo(() => [
    {
      Header: 'Column 1',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
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
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        ))}
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
