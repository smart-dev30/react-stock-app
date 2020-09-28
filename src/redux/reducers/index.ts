import { Store } from 'redux'
import { ActionType } from '../../types/ActionType'
import { ActionModel } from '../../types/Models'
import moment from 'moment'

export interface StockData {
  prices: number[]
  updateDate: object
  status: 0 | 1 | -1 // 0: same price, 1: risen, -1: fallen
}

export interface StateType {
  connected: boolean
  stockData: any
  stockTypes: string[]
}

let initialState: StateType = {
  connected: false,
  stockData: {},
  stockTypes: [],
}

export type StoreType = Store<StateType, ActionModel>

function applicationState(state = initialState, action: ActionModel) {
  switch (action.type) {
    case ActionType.WEBSOCKET_OPENED:
      return { ...state, connected: true }

    case ActionType.WEBSOCKET_CLOSED:
    case ActionType.WEBSOCKET_ERROR:
      return { ...state, connected: false }

    case ActionType.WEBSOCKET_RECEIVE:
      let { stockData, stockTypes } = state
      const { payload } = action
      console.log(JSON.stringify(payload))

      payload.forEach((stock: any[]) => {
        const stockName = stock[0]
        const stockPrice = stock[1]
        const existingStock: StockData = stockData[stockName]

        if (existingStock) {
          const lastPrice =
            existingStock.prices[existingStock.prices.length - 1]
          existingStock.prices.push(stockPrice)
          existingStock.status =
            stockPrice > lastPrice ? 1 : stockPrice < lastPrice ? -1 : 0
          existingStock.updateDate = moment()

          if (existingStock.prices.length > 20) {
            // Keep last 20 data
            existingStock.prices.shift()
          }
        } else {
          stockData[stockName] = {
            prices: [stockPrice],
            status: 0,
            updateDate: moment(),
          }
        }
      })

      stockTypes = Object.keys(stockData)
      console.log('updatedStockData', stockData)
      console.log('stockTypes', stockTypes)

      return { ...state, stockData, stockTypes }
    default:
      return state
  }
}

export default applicationState
