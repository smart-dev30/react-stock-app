import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },

  list: {
    width: 250,
  },

  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  toolbar: theme.mixins.toolbar,
}))
