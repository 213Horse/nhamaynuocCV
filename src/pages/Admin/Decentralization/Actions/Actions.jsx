import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import './actions.css'
import TreeActions from './components/TreeActions'
import ListStaff from './components/ListStaff'
import { useSelector } from 'react-redux'
import { selectClaims } from '../../../../redux/selector'

function Actions() {

  const claims = useSelector(selectClaims);
  const [selectedFunction, setSelectedFunction] = React.useState(null);

  return (
    <Row gutter={[12, 12]}>
      <Col lg={10} >
        <TreeActions claims={claims} setSelectedFunction={setSelectedFunction} />
      </Col>
      <Col lg={14} >
        <ListStaff selectedFunction={selectedFunction} claims={claims} />
      </Col>
    </Row>
  )
}

export default Actions