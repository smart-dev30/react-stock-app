import { eventChannel } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import ReconnectingWebSocket from 'reconnecting-websocket'

import {
  websocketOpened,
  websocketClosed,
  stockDataReceived,
  websocketErrorThrown,
} from '../actions'

const createWebsocketChannel = (ws: ReconnectingWebSocket) =>
  eventChannel((emitter) => {
    ws.addEventListener('message', (message) => {
      emitter(stockDataReceived(JSON.parse(message.data)))
    })

    ws.addEventListener('open', () => {
      emitter(websocketOpened())
    })

    ws.addEventListener('error', () => {
      emitter(websocketErrorThrown())
    })

    ws.addEventListener('close', () => {
      emitter(websocketClosed())
    })

    return () => ws.close()
  })

export default function* root() {
  const url: string = process.env.REACT_APP_WS_URL
  const ws = new ReconnectingWebSocket(url)
  const wsChannel = yield call(createWebsocketChannel, ws)

  while (true) {
    const action = yield take(wsChannel)
    yield put(action)
  }
}
