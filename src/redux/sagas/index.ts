import { eventChannel } from 'redux-saga'
import { take, call, put, fork, all } from 'redux-saga/effects'
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
      emitter(stockDataReceived(message.data))
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
  const url: string = process.env.WS_URL
  const ws = new ReconnectingWebSocket(url)
  const wsChannel = yield call(createWebsocketChannel, ws)

  while (true) {
    const action = yield take(wsChannel)
    yield put(action)
  }
}
