import React, { useMemo, useState } from 'react'
import { CloseOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select, Table, Tooltip } from 'antd'
import { useMediaQuery } from 'react-responsive'
import moment from 'moment'

const AddReportModal = ({hideModal}) => {
  const [rowSelection, setRowSelection] = useState(null)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })

	const columns = useMemo(() => {
		return [
			{
				title: 'STT',
				dataIndex: 'stt',
				key: 'stt',
				width : '7%'
			},
			{
				title: 'Báo cáo',
				dataIndex: 'title',
				key: 'title'
			},
			{
				title: 'Ngày tạo',
				dataIndex: 'createdAt',
				key: 'createdAt',
			},
		]
	}, [])

	const initialData = Array.from({ length: 16 }, (_, i) => ({
		stt: i + 1,
		title: `Bản đồ ${i + 1}`,
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
		role: i/2===2 ? 'Quyền xem' : 'Quyền sửa'
	}))

	// handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setRowSelection(selectedRows[0])
  };

  const handleUncheckRadio = () => {
    setRowSelection(null)
  };

  return (
    <>
			<Form>
        <Row justify='end'>
          <Col span={isTabletOrMobile ? 24 : 12}>
            <Form.Item className="custom-form-item">
              <Select
                defaultValue={'view'}
                options={[
                  {
                    value: 'view',
                    label: 'Quyền xem',
                  },
                  {
                    value: 'update',
                    label: 'Cập nhật',
                  },
                  {
                    value: 'all',
                    label: 'Toàn quyền',
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
			
      <Table
        pagination={false}
        size="small"
        scroll={{ x:850, y: 380 }}
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
            >
              Chấp nhận
          </Button>
        </Col>
        <Col>
          <Button
            icon={<CloseOutlined />}
            className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AddReportModal