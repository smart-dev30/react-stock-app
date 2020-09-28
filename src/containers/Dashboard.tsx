import React from 'react'
import { connect } from 'react-redux'

import { Container } from '../components/Container'
import { StockTable } from '../components/StockTable'

import { StateType } from '../redux/reducers'

const Dashboard: React.FC<StateType> = ({
  connected,
  stockData,
  stockTypes,
}: StateType) => (
  <Container>
    <StockTable stockData={stockData} stockTypes={stockTypes} />
  </Container>
)

const mapStateToProps = ({ connected, stockData, stockTypes }: StateType) => ({
  connected,
  stockData,
  stockTypes,
})

export default connect(mapStateToProps)(Dashboard)
