import { createMuiTheme } from '@material-ui/core/styles'

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

export default createMuiTheme({
  palette: {
    error: {
      main: red[400],
    },
    success: {
      main: green[800],
    },
  },
})
