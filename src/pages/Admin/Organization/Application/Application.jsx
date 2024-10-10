// import { Button, Modal, Table, Tooltip } from 'antd'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
// import { RedoOutlined, ShareAltOutlined } from '@ant-design/icons'
// import { btnClickTabListInvoicePrintSelector } from '../../../../redux/selector'
// import AuthorTypeModal from '../../../../components/AuthorModal/AuthorTypeModal'
// import { dataApplication } from '../../../../utils/dataApplication'

// const Application = () => {
//   const dispatch = useDispatch()
//   const tabApplication = useSelector(btnClickTabListInvoicePrintSelector)
//   const [openModal, setOpenModal] = useState(false)
//   const hideModal = () => {
//     dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null))
//     setOpenModal(false)
//   }
//   console.log(tabApplication)
//   const columns = [
//     {
//       title: '#',
//       dataIndex: 'stt',
//       key: 'stt',
//       width: '5%',
//     },
//     {
//       title: 'Ứng dụng',
//       dataIndex: 'Title',
//       key: 'Title',
//     },
//     {
//       title: 'Ngày tạo',
//       dataIndex: 'DateCreate',
//       key: 'DateCreate',
//     },
//     {
//       title: 'Chức năng',
//       dataIndex: 'function',
//       key: 'function',
//       width: '10%',
//       align: 'center',
//     },
//   ]

//   // const initialData = Array.from({ length: 100 }, (_, i) => ({
//   //   key: i + 1,
//   //   stt: i + 1,
//   //   application: `Ứng dụng ${i + 1}`,
//   //   createdDatetime: `Ngày tạo ${i + 1}`,
//   //   function: (
//   //     <ShareAltOutlined
//   //       style={{ cursor: 'pointer' }}
//   //       onClick={() => {
//   //         console.log('key', i + 1)
//   //         // handleOpenFunction(i + 1)
//   //         dispatch(
//   //           tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(i + 1),
//   //         )
//   //       }}
//   //     />
//   //   ),
//   // }))

//   const initialData = dataApplication.map((application, i) => ({
//     key: i + 1,
//     stt: i + 1,
//     Title: application.Title,
//     DateCreate: application.DateCreate,
//     function: 
//       <ShareAltOutlined
//         style={{ cursor: 'pointer' }}
//         onClick={() => {
//           dispatch(
//             tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(application),
//           )
//         }}
//       />
//   }))
//   return (
//     <div>
//       <h4 style={{ marginBottom: '20px' }}>Danh sách ứng dụng</h4>
//       <Table
//         dataSource={initialData}
//         columns={columns.map((column) => ({
//           ...column,
//           className: 'cell-wrap',
//         }))}
//         bordered
//         scroll={{ x: 1000, y: 480 }}
//         size="small"
//       />
//       <Modal
//         open={tabApplication ? true : openModal}
//         onCancel={hideModal}
//         width={700}
//         okButtonProps={{ style: { display: 'none' } }}
//         cancelButtonProps={{ style: { display: 'none' } }}
//       >
//         <h2>Phân quyền ứng dụng</h2>
//         <AuthorTypeModal tabType={tabApplication} hideModal={hideModal} nameType='ứng dụng' />
//       </Modal>
//     </div>
//   )
// }

// export default Application
