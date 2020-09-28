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
}))

export { useStyles, StyledTableRow, StyledTableCell }
