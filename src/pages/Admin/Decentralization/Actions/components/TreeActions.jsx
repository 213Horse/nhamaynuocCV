import { Table } from 'antd';
import React, { useState } from 'react'



const TreeActions = ({claims, setSelectedFunction}) => {

  const initialData = claims.map((item, i) => {
    return {
      key: i + 1,
      name: item.group,
      children: item.claims.map((item2, j) => {
        return {
          key: `${i + 1}.${j + 1}`,
          name: item2.properties.DisplayName,
        }
      })
    }
  })
  const columns = [
    {
      title: 'Tên chức năng',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  return (
    <div>
      <h4 className='actions-title'>Danh sách chức năng</h4>
      <div>
        <Table
          expandable={{ defaultExpandAllRows: false }}
          bordered
          size='small'
          dataSource={initialData}
          columns={columns}
          scroll={{ x: 500, y: 615.5}}
          pagination={false}
          indentSize={20}
          rowClassName='row-table-hover'
          rowSelection={{
            type: 'radio',
            onSelect: (record) => {
              setSelectedFunction(record.key)
              console.log(record);
            },
          }}
        />
      </div>
    </div>
  )
}

export default TreeActions