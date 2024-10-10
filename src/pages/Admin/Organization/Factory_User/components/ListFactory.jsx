import React, { useState, useEffect } from 'react'
import { Button, Table, message } from 'antd'
import { getRequest, postRequest } from '../../../../../services';

const ListFactory = ({
  factories,
  selectedUser
}) => {

  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: 'Danh sách nhà máy',
      dataIndex: 'name',
      key: 'name',
    }
  ];

  const mainData = factories?.map((item, i) => {
    return {
      key: `${i + 1}`,
      name: `[${item.tenNhaMay.toUpperCase()}]`
    };
  });

  useEffect(() => {
    console.log('selectedRows', selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    if (selectedUser) {
      getRequest('nha-may/get-by-userid/' + selectedUser?.id)
      .then(res => {
        console.log('ds nha may cua usr', res.data.data.nhaMays);
        var result = [];
        factories?.forEach((item, index) => {
          if (res.data.data.nhaMays?.findIndex((item2) => item2.id === item.id) !== -1) {
            result.push(`${index + 1}`);
          }
        })
        console.log('result', result);
        setSelectedRows(result);
      })
      .catch(err => console.log(err))
    }
  }, [selectedUser]);

  async function handleSubmit() {
    postRequest('nha-may/remapping', {
      "userId": selectedUser?.id,
      "nhaMayIds": [
        ...selectedRows.map((item) => factories[parseInt(item) - 1].id)
      ]
    }).then(res => {
      console.log(res);
      message.success('Cập nhật thành công');
    }).catch(err => {
      console.log(err);
      message.error('Cập nhật thất bại');
    })
  }


  return (
    <>
      <div style={{ margin: '10px 0px' }}>
        <h4>Danh sách chức năng</h4>
      </div>
      {selectedUser ? (
        <>
          <Table
            size="small"
            columns={columns}
            rowSelection={{
              checkStrictly: false,
              selectedRowKeys: selectedRows,
              onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
            }}
            dataSource={mainData}
            pagination={false}
            scroll={{ x: 350, y: 616 }}
            rowKey={(record) => record.key}
            expandable={{
              defaultExpandAllRows: true,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "10px 0" }}>
            <Button
              type='primary'
              onClick={handleSubmit}
            >Cập nhật</Button>
          </div>
        </>

      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Vui lòng chọn người dùng bên trái
        </div>
      )}
    </>
  )
}

export default ListFactory

