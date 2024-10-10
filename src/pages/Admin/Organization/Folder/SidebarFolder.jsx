import React, { useState } from 'react'
import { Tree } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import TabFolder from './TabFolder';


import {
	ReloadOutlined,
	FolderAddFilled,
	CopyFilled,
 } from '@ant-design/icons'
 import {BiSolidRename} from 'react-icons/bi'
 import {MdOutlineDriveFileMove,MdFolderDelete} from 'react-icons/md'
 import {RiFolderZipFill} from 'react-icons/ri'
 
const tabs_bc = [
	{
	  id: '1',
	  icon: <ReloadOutlined />,
	  title: 'Cập nhật danh sách thư mục'
	},
	{
	  id: '2',
	  icon: <FolderAddFilled />,
	  title: 'Tạo thư mục mới'
	},
	{
	  id : '3',
	  icon : <CopyFilled />,
	  title: 'Sao chép thư mục'
	},
	{
	  id: '4',
	  icon: <MdOutlineDriveFileMove />,
	  title: 'Di chuyển thư mục'
	},
	{
	  id: '5',
	  icon: <BiSolidRename />,
	  title: 'Đổi tên thư mục'
	},
	{
	  id: '6',
	  icon: <MdFolderDelete />,
	  title: 'Xoá thư mục'
	},
	{
	  id: '7',
	  icon: <RiFolderZipFill />,
	  title: 'Nén thư mục'
	},
]

const fakeData = [
  {
	duongDan: "users\\AT_Test\\Thu_muc",
	ngayTao: "/Date(1692759176029+0700)/",
	soFile: 0,
	soThuMuc: 0,
	tenThuMuc: "Thư mục",
    children: [
      {
        duongDan: "users\\AT_Test\\Forder",
        ngayTao: "/Date(1692759176029+0700)/",
        soFile: 1,
        soThuMuc: 0,
        tenThuMuc: "Forder",
				children: [
					{
						duongDan: "users\\AT_Test\\Forder\\Forder_1",
						ngayTao: "/Date(1692759176029+0700)/",
						soFile: 0,
						soThuMuc: 0,
						tenThuMuc: "Forder_1"
					},
					{
						duongDan: "users\\AT_Test\\Forder_copy\\Forder_2",
						ngayTao: "/Date(1692759176029+0700)/",
						soFile: 0,
						soThuMuc: 0,
						tenThuMuc: "Forder_2"
					}
				]
      },
      {
        duongDan: "users\\AT_Test\\Forder_copy",
        ngayTao: "/Date(1692759176029+0700)/",
        soFile: 0,
        soThuMuc: 0,
        tenThuMuc: "Forder_copy",
				children: [
					{
						duongDan: "users\\AT_Test\\Forder\\Forder_3",
						ngayTao: "/Date(1692759176029+0700)/",
						soFile: 0,
						soThuMuc: 0,
						tenThuMuc: "Forder_4"
					},
					{
						duongDan: "users\\AT_Test\\Forder_copy\\Forder_3",
						ngayTao: "/Date(1692759176029+0700)/",
						soFile: 0,
						soThuMuc: 0,
						tenThuMuc: "Forder_5"
					}
				]
      }
    ]
  }
]

const convertDataToTree = (data) => {
	const newData = data.map((item, index) => ({
		title: item?.tenThuMuc,
		key: item?.duongDan,
		icon: <FolderOpenOutlined />,
		children: item?.children && convertDataToTree(item?.children)
	}))

	return newData;
}

const SidebarFolder = ({showTitle = true}) => {

	const treeData = convertDataToTree(fakeData);

	return (
		<div className='folder-wrapper'>
			{showTitle && <h3 style={{marginBottom: 8}}>Danh sách thư mục</h3>}
			<TabFolder tabsData={tabs_bc}/>

			<Tree
				defaultExpandAll
				blockNode
				showLine
				showIcon
				treeData={treeData}
				className='folder-sidebar'
			/>
		</div>
	)
}

export default SidebarFolder