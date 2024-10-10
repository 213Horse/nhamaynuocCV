import React, {useState} from 'react'

import TabAuth from '../TabAuth'
import { Modal, Table, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'
import AddRoleModal from './AddRoleModal'
import EditRoleModal from './EditRoleModal'

const columns = [
   {
      title: 'Mã role',
      dataIndex: 'roleId',
      key: 'roleId',
   },
   {
      title: 'Tên role',
      dataIndex: 'roleName',
      key: 'roleName',
   },
]

const SidebarAuth = () => {
	const [rowSelection, setRowSelection] = useState(null);
	
	const [openModalAdd, setOpenModalAdd] = useState(false)
	const [openModalEdit, setOpenModalEdit] = useState(false)

	const tabs_bc = [
		{
			id: 'add',
			icon: <PlusCircleOutlined />,
			title: 'Thêm',
			
			onClick: () => {
				setOpenModalAdd(true)
			}
		},
		{
		  id: 'edit',
		  icon: <EditOutlined />,
		  title: 'Sửa',
		  onClick: () => {
			setOpenModalEdit(true)
		}
		},
		{
		  id : 'delete',
		  icon : <DeleteOutlined />,
		  title: 'Xoá'
		}
	]

	const initialData = [
		{
			roleId: 'admin',
			roleName: 'Admin',
		},
		{
			roleId: 'user',
			roleName: 'User',
		}
	]

	// handle row select
	const handleRowSelection = (selectedRowKeys, selectedRows) => {
     setRowSelection(selectedRows[0])
	};

	// handle un-check radio
	const handleUncheckRadio = () => {
		setRowSelection(null)
	};

	// hide modal
	const hideModal = () => {
		setOpenModalAdd(false)
		setOpenModalEdit(false)
		setRowSelection(null)
	}
   return (
		<>
			<div className='auth-wrapper'>
			<h3 style={{marginBottom: 14}}>Role</h3>
         <TabAuth tabsData={tabs_bc} rowSelection={rowSelection}/>

			<Table
				style={{marginTop: 8}}
				size='small'
				scroll={{x: 200}}
				pagination={false}
				columns={columns.map((column) => ({
					...column,
					className: 'cell-wrap',
				}))}
				rowKey="roleId"
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
					selectedRowKeys: rowSelection ? [rowSelection.roleId] : [],
				 }}
				/>
			</div>

			<Modal
				open={openModalAdd}
				onCancel={hideModal}
				width={400}
				centered={true}
				cancelButtonProps={{ style: { display: 'none' } }}
				okButtonProps={{ style: { display: 'none' } }}
				destroyOnClose
			>
				<h2 className="title-update-info-contract" style={{fontSize: 18}}>Thêm role</h2>
				<AddRoleModal hideModal={hideModal}/>
			</Modal>

			<Modal
				open={openModalEdit}
				onCancel={hideModal}
				width={400}
				centered={true}
				cancelButtonProps={{ style: { display: 'none' } }}
				okButtonProps={{ style: { display: 'none' } }}
				destroyOnClose
			>
				<h2 className="title-update-info-contract" style={{fontSize: 18}}>Cập nhật thông tin role</h2>
				<EditRoleModal hideModal={hideModal} rowSelection={rowSelection}/>
			</Modal>
		</>
	)
}

export default SidebarAuth