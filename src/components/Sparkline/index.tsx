import React from 'react'
import { Modal, Backdrop, Fade } from '@material-ui/core'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'

import { ChartData } from '../StockTable'

import useStyles from './styles'

interface SparklineProps {
  visible: boolean
  data: ChartData
  onCancel: any
}

export const Sparkline: React.FC<SparklineProps> = ({
  visible,
  data,
  onCancel,
}) => {
  const classes = useStyles()
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={visible}
      onClose={onCancel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={visible}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Sparklines of [{data.name}]</h2>

          <Sparklines data={data.prices}>
            <SparklinesLine color="blue" />
            <SparklinesSpots />
          </Sparklines>
        </div>
      </Fade>
    </Modal>
  )
}
