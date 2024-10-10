import React, { useState } from 'react'
import TabAuth from '../TabAuth'
import { DeleteOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'
import { Table, Tooltip } from 'antd'

const tabs_bc = [
	{
	  id: 'update',
	  icon: <PlusCircleOutlined />,
	  title: 'Cập nhật'
	}
]

const DecentralizationTab = () => {

  const columns = [
		{
			title: 'Mã ứng dụng',
			dataIndex: 'appId',
			key: 'appId',
			render: (text) => <b>Mã ứng dụng: {text}</b>
		},
	]

	const data = [
		{
			appId: 'CPPT',
			data: [
				{
					roleId: 'CPPT_TinhTrang',
					roleName: "Tình trạng phương tiện",
				},
				{
					roleId: 'CPPT_CapPhat',
					roleName: "Cập phát phương tiện",
				},
			]
		},
		{
			appId: 'KT',
			data: [
				{
					roleId: 'KT_ToanQuyen',
					roleName: "Toàn quyền",
				},
				{
					roleId: 'KT_QuanLyBieuMau',
					roleName: "Quản lý biểu mẫu",
				},
			]
		},
	];

	const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Mã quyền",
        dataIndex: "roleId",
        key: "roleId"
      },
      {
        title: "Tên quyền",
				dataIndex: "roleName",
        key: "roleName",
      }
    ];
    return (
			<Table columns={columns} rowSelection={{type: 'checkbox'}} rowKey="roleId" dataSource={record.data} pagination={false} />
		);
  };

  return (
	<div style={{marginTop: 6}}>
      <TabAuth tabsData={tabs_bc} />

      <Table
				pagination={false}
				showHeader={false}
				columns={columns}
				rowKey="appId"
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true
        }}
        dataSource={data}
        size="small"
      />
    </div>
  )
}

export default DecentralizationTab