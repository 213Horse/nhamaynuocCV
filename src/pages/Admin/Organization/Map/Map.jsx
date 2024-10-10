import { Modal, Table, Tooltip, Popover } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import { RedoOutlined, ShareAltOutlined, PlusOutlined } from '@ant-design/icons'
import {
  btnClickTabAuthorSelector,
  btnClickTabListInvoicePrintSelector,
} from '../../../../redux/selector'
import tabAuthorSlice from '../../../../redux/slices/tabAuthorSlice/tabAuthorSlice'
import AuthorTypeModal from '../../../../components/AuthorModal/AuthorTypeModal'
import TableMap from './TableMap'
import { useMediaQuery } from 'react-responsive'
import { dataMap } from '../../../../utils/dataMap'
// import AuthorAppModal from './AuthorAppModal'

const Map = () => {
  const dispatch = useDispatch()
  const tabMapFunction = useSelector(btnClickTabAuthorSelector)
  const tabListMap = useSelector(btnClickTabListInvoicePrintSelector)
  const [openModal, setOpenModal] = useState(false)
  const isTabletOrMobile = useMediaQuery({ maxWidth: '991px' })
  const hideModal = () => {
    dispatch(tabAuthorSlice.actions.btnClickTabAuthor(null))
    dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null))
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
      title: 'Tên bản đồ',
      dataIndex: 'Title',
      key: 'Title',
      width: '400px',
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
      title: 'Ngày tạo',
      dataIndex: 'DateCreate',
      key: 'DateCreate',
    },
    {
      title: 'Chức năng',
      dataIndex: 'function',
      key: 'function',
      width: '10%',
      align: 'center',
    },
  ]

  // const initialData = Array.from({ length: 100 }, (_, i) => ({
  //   key: i + 1,
  //   stt: i + 1,
  //   nameMap: `Bản đồ ${i + 1}`,
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

  const initialData = dataMap.map((map, i) => ({
    key: i + 1,
    stt : i + 1,
    Title: map.Title,
    Description: map.Description,
    UserCreate: map.UserCreate,
    DateCreate: map.DateCreate,
    function: 
      <ShareAltOutlined
        style={{ cursor: 'pointer' }}
        onClick={() => {
          dispatch(tabAuthorSlice.actions.btnClickTabAuthor(map))
        }}
      />
  }))
  return (
    <div>
      <h4 style={{ marginBottom: '20px' }}>Danh sách bản đồ</h4>
      {!isTabletOrMobile && <TableMap />}
      <Table
        style={{ marginTop: '20px' }}
        rowKey="stt"
        dataSource={initialData}
        columns={columns.map((column) => ({
          ...column,
          className: 'cell-wrap',
        }))}
        bordered
        scroll={{ x: 1000, y: 480 }}
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
          selectedRowKeys: tabListMap ? [tabListMap.stt] : [],
        }}
      />
      <Modal
        open={tabMapFunction ? true : openModal}
        onCancel={hideModal}
        width={700}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <h2>Phân quyền báo cáo</h2>
        <AuthorTypeModal tabType={tabMapFunction} hideModal={hideModal} nameType='bản đồ' />
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
              content={<TableMap isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableMap />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Map
