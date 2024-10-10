import React, { useState } from 'react'
import TabAuth from '../TabAuth'
import { DeleteOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'
import { Modal, Table, Tooltip } from 'antd'
import AddUserModal from './AddUserModal'

const columns = [
  {
    title: 'ID đăng nhập',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
]

const UserTab = () => {
	const [openModal, setOpenModal] = useState(false);
  const [rowSelection, setRowSelection] = useState(null);

  const tabs_bc = [
		{
			id: 'add',
			icon: <PlusCircleOutlined />,
			title: 'Thêm',
			onClick: () => {
				setOpenModal(true)
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
			id: '1',
			name: 'Name 1',
			email: 'email1@gmail.com',
		},
		{
			id: '2',
			name: 'Name 1',
			email: 'email1@gmail.com',
		},
    {
			id: '3',
			name: 'Name 1',
			email: 'email1@gmail.com',
		},
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
		setOpenModal(false);
		setRowSelection(false)
	};


  return (
    <div style={{marginTop: 6}}>
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
			rowKey="id"
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
				selectedRowKeys: rowSelection ? [rowSelection.id] : [],
				}}
		/>

		<Modal
        open={openModal}
        onCancel={hideModal}
        width={600}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Chọn người dùng để thêm roles</h2>

        <AddUserModal
          hideModal={hideModal}
        />
      </Modal>
    </div>
  )
}

export default UserTab