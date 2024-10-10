import { Tabs } from 'antd'
import React from 'react'
import InformationTab from './InformationTab'
import DecentralizationTab from './DecentralizationTab/DecentralizationTab'
import DepartmentTab from './DepartmentTab/DepartmentTab'
import JobTypeTab from './JobTypeTab/JobTypeTab'

const EditListMember = ({hideModal, tabListMember}) => {
  return (
    <>
      <Tabs 
        defaultActiveKey="1"
        destroyInactiveTabPane
        items={[
          {
            key: '1',
            label: 'Thông tin người dùng',
            children: <InformationTab hideModal={hideModal} tabListMember={tabListMember}/>,
          },
          // {
          //   key: '2',
          //   label: 'Phân quyền',
          //   children: <DecentralizationTab hideModal={hideModal} tabListMember={tabListMember}/>,
          // },
          {
            key: '3',
            label: 'Phòng ban/đơn vị',
            children: <DepartmentTab hideModal={hideModal} tabListMember={tabListMember}/>,
          },
          // {
          //   key: '4',
          //   label: 'Loại công việc',
          //   children: <JobTypeTab hideModal={hideModal} tabListMember={tabListMember}/>,
          // },
        ]}
      />
    </>
  )
}

export default EditListMember