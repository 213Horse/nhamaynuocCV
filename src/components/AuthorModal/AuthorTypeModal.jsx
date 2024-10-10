import React, { useState } from 'react'
import {
  MinusCircleOutlined,
  CloseOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { Table, Row, Button, Modal, message } from 'antd'
import AddAuthorTypeModal from './AddAuthorTypeModal'

const AuthorTypeModal = ({ tabType, hideModal, nameType }) => {
  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Quyền truy cập',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      key: 'delete',
      align: 'center',
    },
  ]
  const initialData = Array.from({ length: 5 }, (_, i) => ({
    key: i + 1,
    username: `Tên đăng nhập ${i + 1}`,
    hoTen: `Tên người dùng ${i + 1}`,
    author: `Quyền ${i + 1}`,
    delete: <MinusCircleOutlined style={{cursor : 'pointer'}} onClick={() => {message.error('Tính năng này chưa khả dụng')}} />,
  }))
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const hideModalAddAuthor = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <p style={{ margin: '20px 0px' }}>
        Tên {nameType} : <strong>{tabType.Title}</strong>
      </p>
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: '10px 0px',
        }}
      >
        <Button
          style={{
            marginLeft: '10px',
          }}
          icon={<SaveOutlined />}
          className="custom-btn-attachment-d"
          onClick={handleOpenModal}
        >
          Thêm quyền
        </Button>
      </Row>
      <Table
        dataSource={initialData}
        columns={columns.map((column) => ({
          ...column,
          className: 'cell-wrap',
        }))}
        bordered
        pagination={false}
        scroll={{x : 600 , y : 350}}
      />
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '10px',
        }}
      >
        <Button
          style={{
            marginLeft: '10px',
          }}
          icon={<CloseOutlined />}
          className="custom-btn-close-d"
          onClick={hideModal}
        >
          Đóng
        </Button>
      </Row>
      <Modal
        open={openModal}
        width={700}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={hideModalAddAuthor}
      >
        <h4 style={{ marginBottom: '20px' }}>Chọn người dùng và quyền</h4>
        <AddAuthorTypeModal hideModalAddAuthor={hideModalAddAuthor} />
      </Modal>
    </div>
  )
}

export default AuthorTypeModal
