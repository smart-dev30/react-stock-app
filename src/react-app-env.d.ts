/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'DEV' | 'PROD' | 'STAGE'
    REACT_APP_TITLE: string
    APP_VERSION: string
    WS_URL: string
  }
}
