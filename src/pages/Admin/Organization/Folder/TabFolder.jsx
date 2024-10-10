import React from 'react'
import { Button, Tabs, Tooltip } from 'antd'

const TabFolder = ({tabsData = []}) => {
  return (
    <Tabs 
      className='folder-tab'
      type='card'
      activeKey="0"
      defaultActiveKey='0' 
      items={tabsData?.map((tab, index) => {
        return {
          key: tab.id,
          label: (
            <Tooltip placement="top" title={tab?.title}>
              <Button size='small' className='folder-tab-btn'>{tab.icon}</Button>
            </Tooltip>
          )
        }
      })}
    />
  )
}

export default TabFolder