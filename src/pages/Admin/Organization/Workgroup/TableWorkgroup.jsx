import { Modal, Tabs, Popconfirm, message } from 'antd'
import {
  PlusCircleOutlined,
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { btnClickTabListInvoicePrintSelector } from '../../../../redux/selector'
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import Captcha from '../../../../components/Captcha/Captcha'
import EditWorkgroup from './EditWorkgroup'
import AddWorkgroup from './AddWorkgroup'

const tabs_bc = [
  {
    id: '1',
    label: 'Làm mới',
    icon: <RetweetOutlined />,
  },
  {
    id: '2',
    label: 'Thêm mới',

    icon: <PlusCircleOutlined />,
  },
  {
    id: '3',
    label: 'Sửa',
    icon: <EditOutlined />,
  },
  {
    id: '4',
    label: 'Xóa',
    icon: <DeleteOutlined />,
  },
]

function TableWorkgroup({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false)
  const [modalAddWorkgroup, setModalAddWorkgroup] = useState(false)
  const [modalEditWorkgroup, setModalEditWorkgroup] = useState(false)
  const [isCaptcha, setIsCaptcha] = useState(false) //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch()

  const tabWorkgroup = useSelector(btnClickTabListInvoicePrintSelector)
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === '1') {
      message.error('Tính năng chưa khả dụng')
    } else if (key === '2') {
      setModalAddWorkgroup(true)
    } else if (key === '3') {
      setModalEditWorkgroup(true)
    }
  }

  // hide modal
  const hideModal = () => {
    setOpenModal(false)
    setModalAddWorkgroup(false)
    setModalEditWorkgroup(false)
    dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null))
  }


  return (
    <>
      <Tabs
        type={isTabletOrMobile ? 'line' : 'card'}
        tabPosition={isTabletOrMobile ? 'left' : 'top'}
        activeKey="0"
        items={tabs_bc?.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-bc tab-item-bc-${_tab.id} ${
                  tabWorkgroup === null && _tab.id === '3'
                    ? 'tab-item-disabled'
                    : tabWorkgroup === null && _tab.id === '4'
                    ? 'tab-item-disabled'
                    : ''
                }`}
              >
                {_tab.id === '4' && tabWorkgroup !== null ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title={
                        <>
                          <div>Bạn có chắc chắn muốn xóa vùng này không?</div>
                          <div style={{ margin: '20px 0' }}>
                            <Captcha
                              onChangeReCaptcha={(value) =>
                                setIsCaptcha(value != null)
                              }
                              ref={captchaRef}
                            />
                          </div>
                        </>
                      }
                      okButtonProps={{ disabled: !isCaptcha }}
                      // description={description}
                      okText="Có"
                      cancelText="Không"
                      onCancel={() => {
                        setIsCaptcha(false)
                        captchaRef.current.reset()
                      }}
                    >
                      {_tab.icon} {_tab.label}
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    {_tab.icon} {_tab.label}
                  </>
                )}
              </div>
            ),
            key: _tab.id,
            disabled:
              (tabWorkgroup === null && _tab.id === '3') ||
              (tabWorkgroup === null && _tab.id === '4')
                ? true
                : false,
          }
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddWorkgroup ? modalAddWorkgroup : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddWorkgroup tabWorkgroup={tabWorkgroup} hideModal={hideModal} />
      </Modal>

      <Modal
        open={modalEditWorkgroup ? modalEditWorkgroup : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditWorkgroup tabWorkgroup={tabWorkgroup} hideModal={hideModal} />
      </Modal>
    </>
  )
}

export default TableWorkgroup
