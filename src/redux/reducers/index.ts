import { Store } from 'redux'
import { ActionType } from '../../types/ActionType'
import { ActionModel } from '../../types/Models'

export interface StateType {
  connected: boolean
  stockData: object[]
}

let initialState: StateType = {
  connected: false,
  stockData: [],
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
      const stockData = state.stockData
      return { ...state, stockData: [...stockData, action.payload] }
    default:
      return state
  }
}

export default applicationState
