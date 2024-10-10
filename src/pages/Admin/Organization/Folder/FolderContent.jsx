import React, { useEffect, useMemo } from 'react'
import TabFolder from './TabFolder'
import { Col, Input, Row, Table, Tooltip } from 'antd'

import {BsFillFileEarmarkArrowUpFill, BsFileEarmarkArrowDownFill, BsFillFileEarmarkRuledFill} from 'react-icons/bs'
import {AiFillFileZip, AiFillFileExcel} from 'react-icons/ai'
import {GrDocumentZip} from 'react-icons/gr'
import {
	ReloadOutlined,
	FolderAddFilled,
	CopyFilled,
   RedoOutlined
 } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { btnClickTabListInvoicePrintSelector } from '../../../../redux/selector'
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import moment from 'moment/moment'

const tabs_bc = [
	{
	  id: '1',
	  icon: <BsFillFileEarmarkArrowUpFill />,
	  title: 'Tải tệp lên'
	},
	{
	  id: '2',
	  icon: <FolderAddFilled />,
	  title: 'Cập nhật danh sách tệp'
	},
	{
	  id : '3',
	  icon : <BsFileEarmarkArrowDownFill />,
	  title: 'Tải tệp về'
	},
	{
	  id: '4',
	  icon: <AiFillFileZip />,
	  title: 'Nén tệp'
	},
	{
	  id: '5',
	  icon: <GrDocumentZip />,
	  title: 'Giải nén tệp'
	},
	{
	  id: '6',
	  icon: <AiFillFileExcel />,
	  title: 'Xoá tệp được chọn'
	},
	{
	  id: '7',
	  icon: <BsFillFileEarmarkRuledFill />,
	  title: 'Đăng ký tài nguyên'
	},
]

const columns = [
   {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width : '6%'
   },
   {
      title: 'Tên tệp',
      dataIndex: 'tenFile',
      key: 'tenFile',
   },
   {
      title : 'Kích thước',
      dataIndex : 'kichThuoc',
      key : 'kichThuoc',
   },
   {
      title: 'Ngày tải lên',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
   },
]

const fakeData = [
   {
     duongDan: "users\\AT_Test\\folder.zip",
     kichThuoc: 22,
     kieuFile: ".zip",
     lat: null,
     lon: null,
     ngaySua: 1692761433762,
     ngayTao: 1692761433762,
     tenDayDu: "folder.zip",
     tenFile: "folder"
   },
   {
     duongDan: "users\\AT_Test\\Forder.zip",
     kichThuoc: 22,
     kieuFile: ".zip",
     lat: null,
     lon: null,
     ngaySua: 1692761433762,
     ngayTao: 1692761433762,
     tenDayDu: "Forder.zip",
     tenFile: "Forder"
   },
]

const FolderContent = ({showTitle = true}) => {
   const dispatch = useDispatch();
   const tabListMB = useSelector(btnClickTabListInvoicePrintSelector);

   const initialData = useMemo(() => {
      return fakeData.map((item, i) => ({
         ...item,
        stt: i + 1,
        ngayTao: moment(item.ngayTao).format("DD/MM/YYYY")
      }))
    }, [])
   
   useEffect(() => {
      return () => {
        dispatch(
          tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
        );
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
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

  return (
   <div className='folder-wrapper'>
      {showTitle && <h3 style={{marginBottom: 8}}>Danh sách tệp</h3>}
      <Row justify='space-between'>
         <Col lg={12} md={12} sm={24} xs={24}>
            <TabFolder tabsData={tabs_bc}/>
         </Col>
         <Col lg={12} md={12} sm={24} xs={24}>
            <Input.Search placeholder='Lọc tệp' size='small'/>
         </Col>
      </Row>
      
      
      <Table
      className='folder-table'
        pagination={false}
        size="small"
        scroll={{ x: 800, y: '72vh' }}
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
          onChange: (selectedRowKeys, selectedRows) =>{
            handleRowSelection(selectedRowKeys, selectedRows)
          },
          selectedRowKeys: tabListMB ? [tabListMB.stt] : [],
        }}
      />
   </div>
  )
}

export default FolderContent