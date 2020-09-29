import { makeStyles, withStyles, Theme } from '@material-ui/core/styles'
import { TableCell, TableRow } from '@material-ui/core'

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 400,
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  raise: {
    color: theme.palette.success.dark,
    fontWeight: 'bold',
  },

  fall: {
    color: theme.palette.error.dark,
    fontWeight: 'bold',
  },

  normal: {
    fontWeight: 'bold',
  },

  stockName: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}))

export { useStyles, StyledTableRow, StyledTableCell }
