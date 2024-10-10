import React, { useState } from 'react'
import { Row, Button, Form, Col } from 'antd'
import { CloseOutlined, FileAddOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { useMediaQuery } from 'react-responsive'
const OPTIONS = [
  'Tất cả người dùng',
  'Trịnh Ngọc Tuấn',
  'Nguyễn Mạnh Thắng',
  'Nguyễn Văn Đảm',
]

const AddAuthorTypeModal = ({ hideModalAddAuthor }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))
  const isTabletOrMobile = useMediaQuery({maxWidth : '576px'})
  const { Option } = Select
  const layout = {
    labelCol : {
      span : 5
    }
  }
  return (
    <div>
      <Form layout={{...layout}}>
        <Row gutter={24}>
          <Col span={isTabletOrMobile ? 24 : 18}>
            <Form.Item label="Người dùng">
              <Select
                placeholder="Nhập thành viên hoặc nhóm phòng ban"
                mode="multiple"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                  width: '100%',
                }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={isTabletOrMobile ? 24 :  6}>
            <Form.Item>
              <Select placeholder="Chọn quyền">
                <Option value="1">Quyền xem</Option>
                <Option value="2">Quyền sửa</Option>
                <Option value="3">Toàn quyền</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
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
          icon={<FileAddOutlined />}
          className="custom-btn-reset-d"
        >
          Thêm
        </Button>
        <Button
          style={{
            marginLeft: '10px',
          }}
          icon={<CloseOutlined />}
          className="custom-btn-close-d"
          onClick={hideModalAddAuthor}
        >
          Đóng
        </Button>
      </Row>
    </div>
  )
}

export default AddAuthorTypeModal
