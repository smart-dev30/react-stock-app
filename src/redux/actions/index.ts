import { ActionModel } from '../../types/Models'
import { ActionType } from '../../types/ActionType'

export function websocketOpened(): ActionModel {
  return { type: ActionType.WEBSOCKET_OPENED, payload: null }
}

export function websocketClosed(): ActionModel {
  return { type: ActionType.WEBSOCKET_CLOSED, payload: null }
}

export function websocketErrorThrown(): ActionModel {
  return { type: ActionType.WEBSOCKET_ERROR, payload: null }
}

export function stockDataReceived(payload: object[]): ActionModel {
  return { type: ActionType.WEBSOCKET_RECEIVE, payload }
}
