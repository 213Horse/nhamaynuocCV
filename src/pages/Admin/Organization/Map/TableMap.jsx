import { Modal, Tabs, Popconfirm, message } from 'antd'
import {
  EditOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { btnClickTabListInvoicePrintSelector } from '../../../../redux/selector'
import tabListInvoicePrintSlice from '../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice'
import Captcha from '../../../../components/Captcha/Captcha'
import { useMediaQuery } from 'react-responsive'
import EditMap from './EditMap'

const tabs_bc = [
  {
    id: '1',
    label: 'Làm mới',
    icon: <RetweetOutlined />,
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

function TableMap({}) {
  const [openModal, setOpenModal] = useState(false)
  const [modalAddMap, setModalAddMap] = useState(false)
  const [modalEditMap, setModalEditMap] = useState(false)
  const [isCaptcha, setIsCaptcha] = useState(false) //captcha
  const captchaRef = useRef()
  const dispatch = useDispatch()
  const isTabletOrMobile = useMediaQuery({ maxWidth: '991px' })
  const tabMap = useSelector(btnClickTabListInvoicePrintSelector)
  // handle change tabs
  const handleChangeTabs = (key) => {
    if (key === '1') {
      message.error('Tính năng chưa khả dụng')
    } else if (key === '3') {
      setModalEditMap(true)
    } else if (key === '4') {
      message.error('Tính năng chưa khả dụng')
    }
  }

  // hide modal
  const hideModal = () => {
    setOpenModal(false)
    setModalAddMap(false)
    setModalEditMap(false)
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
                  tabMap === null && _tab.id === '3'
                    ? 'tab-item-disabled'
                    : tabMap === null && _tab.id === '4'
                    ? 'tab-item-disabled'
                    : ''
                }`}
              >
                {_tab.id === '4' && tabMap !== null ? (
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
              (tabMap === null && _tab.id === '3') ||
              (tabMap === null && _tab.id === '4')
                ? true
                : false,
          }
        })}
        onChange={handleChangeTabs}
      />
      <Modal
        open={modalEditMap ? modalEditMap : openModal}
        onCancel={hideModal}
        width={700}
        centered={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        destroyOnClose
      >
        <h2 className="title-update-info-contract">Sửa thông tin tài nguyên bản đồ</h2>

        <EditMap tabMap={tabMap} hideModal={hideModal} />
      </Modal>
    </>
  )
}

export default TableMap
