import { Modal, Table, Tooltip, Popover } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import { RedoOutlined, ShareAltOutlined, PlusOutlined } from '@ant-design/icons'
import { btnClickTabAuthorSelector, btnClickTabListInvoicePrintSelector } from '../../../../redux/selector'
import tabAuthorSlice from '../../../../redux/slices/tabAuthorSlice/tabAuthorSlice'
import AuthorTypeModal from '../../../../components/AuthorModal/AuthorTypeModal'
import { useMediaQuery } from 'react-responsive'
import { dataReport } from '../../../../utils/dataReport'
import TableReport from './TableReport'

const Report = () => {
  const dispatch = useDispatch()
  const tabReportFunction = useSelector(btnClickTabAuthorSelector)
  const tabListReport = useSelector(btnClickTabListInvoicePrintSelector)
  const [openModal, setOpenModal] = useState(false)
  const isTabletOrMobile = useMediaQuery({maxWidth : '991px'})
  const hideModal = () => {
    dispatch(
      tabAuthorSlice.actions.btnClickTabAuthor(null)
    )
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    )
  }
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
  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
    },
    {
      title: 'Tên báo cáo',
      dataIndex: 'Title',
      key: 'Title',
      width : '400px'
    },
    {
      title: 'Mô tả',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Người tạo',
      dataIndex: 'UserCreate',
      key: 'UserCreate',
    },
    {
      title : 'Ngày tạo',
      dataIndex : 'DateCreate',
      key : 'DateCreate',
    },
    {
      title : 'Chức năng',
      dataIndex : 'function',
      key : 'function',
      width : '10%',
      align : 'center',
    }
  ]

  // const initialData = Array.from({ length: 100 }, (_, i) => ({
  //   key: i + 1,
  //   stt: i + 1,
  //   nameReport: `Bản đồ ${i + 1}`,
  //   desc : `Mô tả ${i + 1}`,
  //   admin : 'Admin',
  //   createdDatetime: `Ngày tạo ${i + 1}`,
  //   function: (
  //     <ShareAltOutlined
  //       style={{ cursor: 'pointer' }}
  //       onClick={() => {
  //         console.log('key', i + 1)
  //         // handleOpenFunction(i + 1)
  //         dispatch(
  //           tabAuthorSlice.actions.btnClickTabAuthor(i + 1)
  //         )
  //       }}
  //     />
  //   ),
  // }))
  const initialData = dataReport.map((report, i) => ({
    stt : i + 1,
    Title : report.Title,
    Description : report.Description,
    UserCreate : report.UserCreate,
    DateCreate : report.DateCreate,
    function : 
      <ShareAltOutlined
        style={{ cursor: 'pointer' }}
        onClick={() => {
          dispatch(
            tabAuthorSlice.actions.btnClickTabAuthor(report)
          )
        }}
      />

  }))
  return (
    <div>
      <h4 style={{ marginBottom: '20px' }}>Danh sách báo cáo</h4>
      {!isTabletOrMobile && (
        <TableReport/>
      )}
      <Table
      style={{marginTop : '20px'}}
        rowKey='stt'
        dataSource={initialData}
        columns={columns.map((column) => ({
          ...column,
          className: 'cell-wrap',
        }))}
        bordered
        scroll={{ x: 1200, y: 480 }}
        size="small"
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
          selectedRowKeys: tabListReport ? [tabListReport.stt] : [],
        }}
      />
      <Modal
        open={tabReportFunction ? true : openModal}
        onCancel={hideModal}
        width={700}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <h2>Phân quyền báo cáo</h2>
        <AuthorTypeModal tabType={tabReportFunction} hideModal={hideModal} nameType={'báo cáo'} />
      </Modal>
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
                  <TableReport isTabletOrMobile={isTabletOrMobile} />
                }
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableReport />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Report
