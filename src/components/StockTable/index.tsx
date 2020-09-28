import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import moment from 'moment'

import { useStyles, StyledTableRow, StyledTableCell } from './styles'
import { IconButton } from '@material-ui/core'
import TimelineIcon from '@material-ui/icons/Timeline'

import { StockData } from '../../redux/reducers'

interface TableProps {
  stockData: any
  stockTypes: string[]
}

interface StockInfo {
  number: number
  name: string
  currentPrice: string | number
  lastPrice: string | number
  updateDate: object
  status: 0 | 1 | -1 // 0: same price, 1: risen, -1: fallen
}

function createRow(
  index: number,
  type: string,
  stockData: StockData,
): StockInfo {
  return {
    number: index + 1,
    name: type,
    currentPrice: stockData.prices[stockData.prices.length - 1],
    lastPrice:
      stockData.prices.length > 2
        ? stockData.prices[stockData.prices.length - 2]
        : '-',
    updateDate: stockData.updateDate,
    status: stockData.status,
  }
}

export const StockTable: React.FC<TableProps> = ({ stockData, stockTypes }) => {
  const classes = useStyles()
  if (stockTypes.length === 0) return null

  const rowData: StockInfo[] = stockTypes.map((type, index) =>
    createRow(index, type, stockData[type]),
  )
  console.log(rowData)

  const handleChartPress = (name: string) => () => {
    alert(name)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="stock table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Number</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Last Price</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Last Update</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rowData.map((row: StockInfo) => (
            <StyledTableRow key={row.number}>
              <StyledTableCell>{row.number}</StyledTableCell>

              <StyledTableCell>{row.name}</StyledTableCell>

              <StyledTableCell align="right">{row.lastPrice}</StyledTableCell>

              <StyledTableCell align="right">
                {row.currentPrice}
              </StyledTableCell>

              <StyledTableCell align="right">
                {moment(row.updateDate).format('YYYY-MM-DD hh:mm:ss')}
              </StyledTableCell>

              <StyledTableCell align="right">
                <IconButton
                  color="inherit"
                  aria-label="Show Chart"
                  onClick={handleChartPress(row.name)}
                >
                  <TimelineIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
