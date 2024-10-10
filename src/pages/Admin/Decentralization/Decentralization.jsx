import React from 'react'
import Users from './Users/Users'
import Actions from './Actions/Actions'
import { Tabs } from 'antd'

function Decentralization() {
  const items = [
    {
      key: '1',
      label: `Theo người dùng`,
      children: <Users />,
    },
    {
      key: '2',
      label: 'Theo chức năng',
      children: <Actions />,
    },
  ]
  const onChange = (key) => {
    console.log(key)
  }
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} destroyInactiveTabPane />
    </>
  )
}

export default Decentralization
