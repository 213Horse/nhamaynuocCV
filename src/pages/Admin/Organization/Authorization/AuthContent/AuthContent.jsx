import React from 'react'
import { Tabs } from 'antd'
import UserTab from './UserTab'
import DecentralizationTab from './DecentralizationTab'

const AuthContent = () => {
   const items = [
      {
        key: '1',
        label: `Người dùng`,
        children: <UserTab />,
      },
      {
        key: '2',
        label: 'Quyền truy cập',
        children: <DecentralizationTab />,
      },
    ]

  return (
   <div className='auth-wrapper'>
      <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
   </div>
  )
}

export default AuthContent