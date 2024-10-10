import { Button, Tabs, Tooltip } from 'antd'
import React from 'react'

const TabAuth = ({tabsData = [], rowSelection}) => {
  return (
    <Tabs 
      className='auth-tab'
      type='card'
      activeKey="0"
      defaultActiveKey='0' 
      items={tabsData?.map((tab, index) => {
        return {
          key: tab.id,
          label: (
            <Button 
              // size='small' 
              disabled={
                (rowSelection === null && tab.id === "edit") ||
                (rowSelection === null && tab.id === "delete")
                  ? true
                  : false
              }
              className={`auth-tab-btn auth-tab-btn-${tab.id} ${
                rowSelection === null && tab.id === "edit"
                      ? "auth-tab-btn-disabled"
                      : rowSelection === null && tab.id === "delete"
                      ? "auth-tab-btn-disabled"
                      : ""
              }`} 
              onClick={tab?.onClick}
            >
                {tab.icon} {tab.title}
            </Button>
          ),
        }
      })}
    />
  )
}

export default TabAuth