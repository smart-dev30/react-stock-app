import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from '../components/Container'
import { Typography } from '@material-ui/core'

import { StateType } from '../redux/reducers'

const Dashboard: React.FC<StateType> = ({
  connected,
  stockData,
}: StateType) => {
  useEffect(() => {
    console.log(JSON.stringify(stockData))
  }, [connected, stockData])

  return <Container></Container>
}

const mapStateToProps = ({ connected, stockData }: StateType) => ({
  connected,
  stockData,
})

export default connect(mapStateToProps)(Dashboard)
