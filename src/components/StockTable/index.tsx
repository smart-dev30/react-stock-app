import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core'
import TimelineIcon from '@material-ui/icons/Timeline'
import { Sparkline } from '../Sparkline'

import moment from 'moment'

import { StockData } from '../../redux/reducers'

import { useStyles, StyledTableRow, StyledTableCell } from './styles'

interface StockInfo {
  number: number
  name: string
  currentPrice: string | number
  lastPrice: string | number
  updateDate: object
  status: 0 | 1 | -1 // 0: same price, 1: risen, -1: fallen
}

export interface ChartData {
  name: string
  prices: number[]
}

const defaultChartData: ChartData = {
  name: '',
  prices: [],
}

interface TableProps {
  stockData: any
  stockTypes: string[]
}

interface TableStates {
  chartData: ChartData
  chartVisible: boolean
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
  const [chartData, setChartData] = useState(defaultChartData)
  const [chartVisible, setChartVisible] = useState(false)

  const rowData: StockInfo[] = stockTypes.map((type, index) =>
    createRow(index, type, stockData[type]),
  )

  const handleToggleChart = (name: string | null) => () => {
    if (!name) {
      setChartVisible(false)
      return
    }

    setChartData({
      name,
      prices: stockData[name].prices,
    })
    setChartVisible(!chartVisible)
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
          {stockTypes.length > 0 &&
            rowData.map((row: StockInfo) => (
              <StyledTableRow key={row.number}>
                <StyledTableCell>{row.number}</StyledTableCell>

                <StyledTableCell>{row.name}</StyledTableCell>

                <StyledTableCell align="right">{row.lastPrice}</StyledTableCell>

                <StyledTableCell
                  align="right"
                  className={
                    row.status === 1
                      ? classes.raise
                      : row.status === -1
                      ? classes.fall
                      : classes.normal
                  }
                >
                  {row.currentPrice}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {moment(row.updateDate).format('YYYY-MM-DD hh:mm:ss')}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <IconButton
                    color="inherit"
                    aria-label="Show Chart"
                    onClick={handleToggleChart(row.name)}
                  >
                    <TimelineIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>

      <Sparkline
        visible={chartVisible}
        data={chartData}
        onCancel={handleToggleChart(null)}
      />
    </TableContainer>
  )
}
