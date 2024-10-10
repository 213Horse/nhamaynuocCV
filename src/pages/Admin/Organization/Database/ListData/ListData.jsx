import React, { useState } from 'react'
import '../../../../../components/GlobalStyles/GlobalStyles.css'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Table, Popover, Select } from 'antd'
import { PlusOutlined, RedoOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Tooltip } from 'antd'
import TabListData from './TabListData'
import tabListInvoicePrintSlice from '../../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import { btnClickTabListInvoicePrintSelector } from '../../../../../redux/selector'

function ListData() {
    const tabListData = useSelector(btnClickTabListInvoicePrintSelector)
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
    const { Option } = Select
    const columns = [
        {
            title : '#',
            dataIndex : 'stt',
            key : 'stt',
            width : '7%'
        },
        {
            title: 'Tên lớp dữ liệu',
            dataIndex: 'nameListData',
            key: 'nameListData',
            filteredValue: [textInput],
            onFilter: (value, record) => {
                return String(record.nameDepartment).toLowerCase().includes(value.toLowerCase());
            }
        },
        {
            title: 'Tên bảng',
            dataIndex: 'nameTable',
            key: 'nameTable',
        },
        {
            title : 'Hệ tọa độ',
            dataIndex : 'htd',
            key : 'htd'
        },
        {
            title : 'Tổng số đối tượng',
            dataIndex : 'totalObject',
            key : 'totalObject',
        }
    ]
    const initialData = Array.from({ length: 100 }, (_, i) => ({
        key: i + 1,
        stt : i + 1,
        nameListData: `Tên lớp dữ liệu ${i + 1}`,
        nameTable: `Tên bảng ${i + 1}`,
        htd : `Hệ tọa độ ${i + 1}`,
        totalObject : `Tổng số đối tượng ${i + 1}`,
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
                        <Col span={isTabletOrMobile ? 8 : 9}>
                            <Form.Item>
                                <TabListData />
                            </Form.Item>
                        </Col>
                    )}
                    <Col span={isTabletOrMobile ? 8 : 5}>
                        <Form.Item className="custom-form-item">
                            <Input
                                placeholder="Lọc theo tên lớp hoặc tên bảng"
                                style={{
                                    marginRight: '5px',
                                    width: '100%',
                                }}
                                onChange={e => setTextInput(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={isTabletOrMobile ? 8 : 5}>
                        <Form.Item className="custom-form-item">
                            <Select placeholder='Chọn loại lớp ...'>
                                <Option value="Lớp không gian">Lớp không gian</Option>
                                <Option value="Lớp thuộc tính">Lớp thuộc tính</Option>
                                <Option value="Lớp View">Lớp View</Option>
                                <Option value="Lớp Network">Lớp Network</Option>
                                <Option value="Lớp LRS">Lớp LRS</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={isTabletOrMobile ? 8 : 5}>
                        <Form.Item className="custom-form-item">
                            <Select placeholder='Chọn tổ chức sở hữu ...'>
                                <Option value="Tất cả">Tất cả</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                size="small"
                scroll={{ x: 900, y: 480 }}
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
                    selectedRowKeys: tabListData ? [tabListData.stt] : [],
                  }}
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
                                <TabListData isTabletOrMobile={isTabletOrMobile} />
                            }
                        >
                            <div className="contract-bottom-func">
                                <PlusOutlined />
                            </div>
                        </Popover>
                    ) : (
                        <div className="contract-bottom-func">
                            <TabListData />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ListData