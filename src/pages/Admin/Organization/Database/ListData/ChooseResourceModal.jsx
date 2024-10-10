import React, { useState } from 'react'
import { Radio, Space, Row, Button, Modal } from 'antd'
import FillDataModal from './FillDataModal'
import { ForwardOutlined } from '@ant-design/icons'
const ChooseResourceModal = ({ hideModal }) => {
  const [valueRadio, setValueRadio] = useState(1)
  const [isModalTypeResource, setIsModalTypeResource] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValueRadio(e.target.value)
  }
  const openModalTypeResource = () => {
    setIsModalTypeResource(true)
  }
  const hideModalTypeResource = () => {
    setIsModalTypeResource(false)
    setIsModal(false)
  }
  return (
    <div style={{ margin: '20px 0px' }}>
      <Radio.Group onChange={onChange} value={valueRadio}>
        <Space direction="vertical">
          <Radio value={1}>ShapeFile</Radio>
          <Radio value={2}>Excel</Radio>
          <Radio value={3}>CSV</Radio>
          <Radio value={4}>File Geodatabase</Radio>
          <Radio value={5}>GML</Radio>
        </Space>
      </Radio.Group>
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
          className="custom-btn-reset-d"
          onClick={openModalTypeResource}
          icon={<ForwardOutlined/>}
        >
          Tiếp theo
        </Button>
      </Row>
      <Modal
        open={isModalTypeResource ? isModalTypeResource : isModal}
        onCancel={hideModalTypeResource}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={700}
        centered={true}
        destroyOnClose
      >
        <FillDataModal valueRadio ={valueRadio} hideModalTypeResource={hideModalTypeResource}/>
      </Modal>
    </div>
  )
}

export default ChooseResourceModal
