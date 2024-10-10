import React, { useMemo, useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, Table, Tooltip } from 'antd'
import {
	PlusCircleOutlined,
	RedoOutlined,
  CloseOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';

import AddApplicationModal from '../SubModal/AddApplicationModal';

const Applicantion = ({isMobile, hideModal}) => {
  const [openModal, setOpenModal] = useState(false)
	const [rowSelection, setRowSelection] = useState(null)
	const [searchQuery, setSearchQuery] = useState("");

	const columns = useMemo(() => {
		return [
			{
				title: 'STT',
				dataIndex: 'stt',
				key: 'stt',
				width : '7%'
			},
			{
				title: 'Ứng dụng',
				dataIndex: 'title',
				key: 'title',
				filteredValue: [searchQuery],
				onFilter: (value, record) => {
					return String(record.title).toLowerCase().includes(value.toLowerCase());
				},
			},
			{
				title: 'Quyền',
				dataIndex: 'role',
				key: 'role',
			},
		]
	}, [searchQuery])

	const initialData = Array.from({ length: 16 }, (_, i) => ({
		stt: i + 1,
		title: `Ứng dụng ${i + 1}`,
		role: i/2===2 ? 'Quyền xem' : 'Quyền sửa'
	}))

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
			<Form>
        <Row gutter={[10, 10]}>
					<Col lg={10} md={24} sm={24} xs={24}>
						<Button 
							type='primary' 
							icon={<PlusCircleOutlined />}
							style={{padding: '4px 12px'}}
              onClick={() => setOpenModal(true)}
						>Thêm quyền</Button>
					</Col>
          <Col lg={14} md={24} sm={24} xs={24}>
            <Form.Item className="custom-form-item">
              <Input.Search
                placeholder="Lọc theo tên"
                style={{
                  marginRight: '5px',
                  width: '100%',
                }}
								onChange={(e) => {
									setSearchQuery(e.target.value);
							 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
			<Table
        pagination={false}
        size="small"
        scroll={{x: 700, y: 400 }}
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

        <AddApplicationModal hideModal={hideSubModal}/>
      </Modal>
		</>
  )
}

export default Applicantion