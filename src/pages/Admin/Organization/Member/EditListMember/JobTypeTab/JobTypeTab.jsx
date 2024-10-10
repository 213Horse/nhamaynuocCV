import React, { useState } from 'react'
import AddJobTypeModal from './AddJobTypeModal'
import { Button, Col, Modal, Row, Table, Tooltip } from 'antd'
import { CloseOutlined, DeleteOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'

const columns =  [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    width : '7%'
  },
  {
    title: 'Tên loại công việc',
    dataIndex: 'displayname',
    key: 'displayname',
  },
]

const JobTypeTab = ({hideModal}) => {
  const [openModal, setOpenModal] = useState(false)
  const [rowSelection, setRowSelection] = useState(null)

  const initialData = []

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setRowSelection(selectedRows[0])
  };

  const handleUncheckRadio = () => {
    setRowSelection(null)
  };

  const hideSubModal = () => {
    setOpenModal(false)
  }
  return (
    <>
    <Table
      pagination={false}
      size="small"
      scroll={{ x:620, y: 400 }}
      bordered
      rowKey="stt"
      columns={columns.map((column) => ({
        ...column,
        className: 'cell-wrap',
      }))}
      dataSource={initialData}
      onRow={(record, index) => {
        return {
          onClick: () => {
            // clicked row to check radio
            setRowSelection(record)
          },
        }
      }}
      rowSelection={{
        type: 'radio',
        columnTitle: () => {
          return (
            <Tooltip title="Bỏ chọn hàng hiện tại.">
              <RedoOutlined
                className="icon-reset-rad-btn"
                onClick={handleUncheckRadio}
              />
            </Tooltip>
          )
        },
        onChange: (selectedRowKeys, selectedRows) =>{
          handleRowSelection(selectedRowKeys, selectedRows)
        },
        selectedRowKeys: rowSelection ? [rowSelection.stt] : [],
      }}
    />
    <Row justify="end" gutter={[8]} style={{
      marginTop: '10px'
    }}>
      <Col>
        <Button 
          type="primary" 
          icon={<PlusCircleOutlined/>} 
          style={{marginRight: 4}}
          onClick={() => setOpenModal(true)}
          >
            Thêm
        </Button>
      </Col>
      <Col>
        <Button 
          type="primary" 
          icon={<DeleteOutlined/>} 
          danger
          disabled={!rowSelection}
        >
          Xoá
        </Button>
        <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<CloseOutlined />}
            className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
      </Col>
    </Row>

    <Modal
      open={openModal}
      onCancel={hideSubModal}
      width={700}
      centered={true}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose
    >
      <h2 className="title-update-info-contract">Danh sách phòng ban/đơn vị</h2>

      <AddJobTypeModal hideModal={hideSubModal}/>
    </Modal>
  </>
  )
}

export default JobTypeTab