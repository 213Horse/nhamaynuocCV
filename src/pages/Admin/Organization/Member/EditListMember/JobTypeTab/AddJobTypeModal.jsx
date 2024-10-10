import React, { useMemo, useState } from 'react'
import { CloseOutlined, DeleteOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Table, Tooltip } from 'antd'
import { useMediaQuery } from 'react-responsive'

const AddJobTypeModal = ({hideModal}) => {
  const [rowSelection, setRowSelection] = useState(null)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
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
				title: 'Tên loại công việc',
				dataIndex: 'displayname',
				key: 'displayname',
				filteredValue: [searchQuery],
				onFilter: (value, record) => {
					return String(record.displayname).toLowerCase().includes(value.toLowerCase());
				},
			}
		]
	}, [searchQuery])

	const initialData = []

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
              <Input.Search
                placeholder="Lọc theo tên loại công việc"
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
              Chọn
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

export default AddJobTypeModal