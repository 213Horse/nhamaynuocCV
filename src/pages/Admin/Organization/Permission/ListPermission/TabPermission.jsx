import { Button, Modal, Tabs } from 'antd'
import React, { useState } from 'react'
import {
  PlusCircleOutlined,
  RetweetOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AddModal from './AddModal';
import { useDispatch } from 'react-redux';
import tabListInvoicePrintSlice from '../../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice';
import { fetchPermision, fetchPermision2 } from '../../../../../redux/slices/permissionSlice/permissionSlice';
import EditModal from './EditModal';

const TabPermission = ({ rowSelection }) => {
  const dispatch = useDispatch();
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const tabs_bc = [
    {
      id: "refresh",
      icon: <RetweetOutlined />,
      title: "Làm mới",
      onClick: () => {
        dispatch(fetchPermision2())
        dispatch(
          tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
        );
      }
    },
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
  ]

  const hideModal = () => {
    setOpenModalAdd(false)
    setOpenModalEdit(false)
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  }

  return (
    <>
      <Tabs
        className='per-tab permission-tab'
        type='card'
        activeKey="0"
        defaultActiveKey='0'
        items={tabs_bc?.map((tab, index) => {
          return {
            key: tab.id,
            label: (
              <Button
                // size='small' 
                disabled={
                  (rowSelection === null && tab.id === "edit") ||
                    (rowSelection === null && tab.id === "delete")
                    ? true
                    : false
                }
                className={`per-tab-btn per-tab-btn-${tab.id} ${rowSelection === null && tab.id === "edit"
                    ? "per-tab-btn-disabled"
                    : rowSelection === null && tab.id === "delete"
                      ? "per-tab-btn-disabled"
                      : ""
                  }`}
                onClick={tab?.onClick}
              >
                {tab.icon} {tab.title}
              </Button>
            ),
          }
        })}
      />
      <Modal
        open={openModalAdd}
        onCancel={hideModal}
        width={600}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddModal hideModal={hideModal} />
      </Modal>
      <Modal
        open={openModalEdit}
        onCancel={hideModal}
        width={600}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>
        <EditModal rowSelection={rowSelection} hideModal={hideModal} />
      </Modal>
    </>
  )
}

export default TabPermission