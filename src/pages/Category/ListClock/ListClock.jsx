import { React, useEffect, useState } from 'react'
import '../../../components/GlobalStyles/GlobalStyles.css'
import '../../Manager/Contract/Contract.css'
import { Form, Input, Table, Popover, Col, Row, Tooltip } from 'antd'
import { PlusOutlined, RedoOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/vi'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchApiTotalWatchSelector,
  isLoadingTotalWatchSelector,
  btnClickTabListInvoicePrintSelector,
} from '../../../redux/selector.js'
import { fetchApiAllTotalWatch } from '../../../redux/slices/totalWatchSlice/totalWatchSlice.js'
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice"
import TableListClock from './TableListClock.js'
import { fetchWatchData } from '../../../redux/slices/watchSlice/watchSlice'
import { getAllDMTotalByType } from '../../../redux/slices/DmTotalSlice/DmTotalSlice'
import { getAllDMTrangThaiChiSo } from '../../../redux/slices/DMTrangThaiChiSo/trangThaiChiSoSlice'
moment.locale('vi')
function ListClock() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
  const [textInput, settextInput] = useState("")
  const dispatch = useDispatch()
  const listTotalWatch = useSelector(fetchApiTotalWatchSelector)
  const isLoading = useSelector(isLoadingTotalWatchSelector)
  const tabListTotalWatch = useSelector(btnClickTabListInvoicePrintSelector)

  const initialData = listTotalWatch?.map((totalWatch, index) => {
    return {
      ...totalWatch,
      index: index + 1,
      maDH: totalWatch.keyId,
      dc: totalWatch.diaChi,
      csd: totalWatch.chiSoDau,
      csc: totalWatch.chiSoCuoi,
      seri: totalWatch.seriDongHo,
      ttdh: totalWatch.trangThaiSuDung,
    }
  })
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 70,
    },
    {
      title: 'Mã đồng hồ',
      key: 'maDH',
      dataIndex: 'maDH',
      filteredValue : [textInput],
      onFilter : (value , record) => {
        return String(record.maDH).toLowerCase().includes(value.toLowerCase())
      },
      width: 170,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'dc',
      key: 'dc',
    },
    {
      title: 'Chỉ số đầu',
      dataIndex: 'csd',
      key: 'csd',
    },
    {
      title: 'Chỉ số cuối',
      dataIndex: 'csc',
      key: 'csc',
    },
    {
      title: 'Seri',
      dataIndex: 'seri',
      key: 'seri',
    },
    {
      title: 'Tình trạng đồng hồ ',
      dataIndex: 'ttdh',
      key: 'ttdh',
    },
  ]
  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
        selectedRows[0]
      )
    );
  };
  // handle un-check radio
  const handleUncheckRadio = () => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };
  useEffect(() => {
    dispatch(fetchApiAllTotalWatch())
    dispatch(fetchWatchData());
    dispatch(getAllDMTotalByType(5));
    dispatch(getAllDMTotalByType(6))
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    }
  }, [])

  const layout = {
    labelCol: {
      span: 0,
    },
  }

  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 16}>
              <Form.Item>
                <TableListClock />
              </Form.Item>
            </Col>
          )}
          <Col className='custom-form' span={isTabletOrMobile ? 24 : 8}>
            <Form.Item
              className="custom-form-item"
              name="9"
            >
              <Input.Search
                style={{
                  width: '100%',
                }}
                onChange={(e) => {
                  settextInput(e.target.value)
                }}
                onSearch={(value) => {
                  console.log('--->', value);
                  settextInput(value)
                }}
                placeholder="Nhập mã đồng hồ"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        style={{ marginTop: '10px' }}
        size="small"
        bordered
        rowKey="index"
        scroll={{ x: 1000 }}
        columns={columns.map((column) => ({
          ...column,
          className: 'cell-wrap',
        }))}
        dataSource={initialData}
        // onChange={handleData1Change}
        loading={isLoading}
        onRow={(record, index) => {
          return {
            onClick: () => {
              // clicked row to check radio
              dispatch(
                tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
                  record
                )
              );
            },
          };
        }}
        rowSelection={{
          type: "radio",
          columnTitle: () => {
            return (
              <Tooltip title="Bỏ chọn hàng hiện tại.">
                <RedoOutlined
                  className="icon-reset-rad-btn"
                  onClick={handleUncheckRadio}
                />
              </Tooltip>
            );
          },
          onChange: (selectedRowKeys, selectedRows) =>
            handleRowSelection(selectedRowKeys, selectedRows),
          selectedRowKeys: tabListTotalWatch ? [tabListTotalWatch.index] : [],
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
                <TableListClock isTabletOrMobile={isTabletOrMobile} />
              }
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableListClock />
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default ListClock
