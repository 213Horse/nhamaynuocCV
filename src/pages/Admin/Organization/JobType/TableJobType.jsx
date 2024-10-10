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
import AddJobType from './AddJobType'
import EditJobType from './EditJobType'

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

function TableJobType({ isTabletOrMobile }) {
  const [openModal, setOpenModal] = useState(false)
  const [modalAddJobType, setModalAddJobType] = useState(false)
  const [modalEditJobType, setModalEditJobType] = useState(false)
  const [isCaptcha, setIsCaptcha] = useState(false) //captcha
  const captchaRef = useRef();
  const dispatch = useDispatch()

  const tabJobType = useSelector(btnClickTabListInvoicePrintSelector)
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === '1') {
      message.error('Tính năng chưa khả dụng')
    } else if (key === '2') {
      setModalAddJobType(true)
    } else if (key === '3') {
      setModalEditJobType(true)
    }
  }

  // hide modal
  const hideModal = () => {
    setOpenModal(false)
    setModalAddJobType(false)
    setModalEditJobType(false)
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
                  tabJobType === null && _tab.id === '3'
                    ? 'tab-item-disabled'
                    : tabJobType === null && _tab.id === '4'
                    ? 'tab-item-disabled'
                    : ''
                }`}
              >
                {_tab.id === '4' && tabJobType !== null ? (
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
              (tabJobType === null && _tab.id === '3') ||
              (tabJobType === null && _tab.id === '4')
                ? true
                : false,
          }
        })}
        onChange={handleChangeTabs}
      />

      <Modal
        open={modalAddJobType ? modalAddJobType : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Thêm dữ liệu</h2>

        <AddJobType tabJobType={tabJobType} hideModal={hideModal} />
      </Modal>

      <Modal
        open={modalEditJobType ? modalEditJobType : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa dữ liệu</h2>

        <EditJobType tabJobType={tabJobType} hideModal={hideModal} />
      </Modal>
    </>
  )
}

export default TableJobType
