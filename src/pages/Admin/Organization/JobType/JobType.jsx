import React, { useState} from 'react'
import '../../../../components/GlobalStyles/GlobalStyles.css'
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import { btnClickTabListInvoicePrintSelector } from '../../../../redux/selector'
import {  useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Table, Tooltip, Popover } from 'antd'
import { RedoOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input } from 'antd'
import TableJobType from './TableJobType'
import { BiDockBottom } from 'react-icons/bi'
function JobType() {
  const tabJobType = useSelector(btnClickTabListInvoicePrintSelector)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
  const dispatch = useDispatch()
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
        selectedRows[0],
      ),
    )
  }
  // handle un-check radio
  const handleUncheckRadio = () => {
    dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null))
  }
  const [textInput, setTextInput] = useState('')
  const columns = [
    {
      title: 'Tên loại công việc',
      dataIndex: 'nameJobType',
      key: 'nameJobType',
      filteredValue : [textInput],
      onFilter : (value, record) => {
        return String(record.nameJobType).toLowerCase().includes(value.toLowerCase());
      }
    },
  ]
  const initialData = Array.from({ length: 100 }, (_, i) => ({
    key: i + 1,
    nameJobType: `Tên loại công việc ${i + 1}`,
  }))

  const layout = {
    labelCol: {
      span: 0,
    },
  };
  
  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 16}>
              <Form.Item>
                <TableJobType/>
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item className="custom-form-item">
              <Input.Search
                placeholder="Lọc loại công việc"
                style={{
                  marginRight: '5px',
                  width: '100%',
                }}
                onChange={e => setTextInput(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        size="small"
        scroll={{ x: 1000, y: 480 }}
        bordered
        rowKey="nameJobType"
        columns={columns.map((column) => ({
          ...column,
          className: 'cell-wrap',
        }))}
        dataSource={initialData}
        onRow={(record, index) => {
          return {
            onClick: () => {
              // clicked row to check radio
              dispatch(
                tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
                  record,
                ),
              )
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
          onChange: (selectedRowKeys, selectedRows) =>
            handleRowSelection(selectedRowKeys, selectedRows),
          selectedRowKeys: tabJobType ? [tabJobType.nameJobType] : [],
        }}
        pagination={{ position: [ `${isTabletOrMobile ? 'bottomLeft' : 'bottomRight'}`, 'none'] }}
      />
      {isTabletOrMobile && (
        <div className="contract-bottom">
          {/* check mobile */}
          {isTabletOrMobile ? (
            <Popover
              size="small"
              rootClassName="fix-popover-z-index"
              placement="bottomRight"
              trigger="click"
                content={
                  <TableJobType isTabletOrMobile={isTabletOrMobile} />
                }
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableJobType />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default JobType