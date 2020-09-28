import React from 'react'
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuIcon from '@material-ui/icons/Menu'

import useStyles from './styles'

interface ContainerProps {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const classes = useStyles()
  const [visible, setVisible] = React.useState(false)

  const toggleDrawer = (event: any) => {
    setVisible(!visible)
  }

  const appBar = (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Menu"
        onClick={toggleDrawer}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        {process.env.REACT_APP_TITLE}
      </Typography>
    </Toolbar>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed">{appBar}</AppBar>

      <Drawer open={visible} onClose={toggleDrawer}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer}
        >
          <List>
            <ListItem>
              <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}
