/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_TITLE: string
    REACT_APP_VERSION: string
    REACT_APP_WS_URL: string
  }
}
