import React, { useRef, useState } from 'react'
import {
  PlusCircleOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Tabs, Popconfirm, Tooltip, message, Modal } from 'antd'
import Captcha from '../../../../../components/Captcha/Captcha'
import { useMediaQuery } from 'react-responsive'
import AddTitleData from './AddTitleData'

const TabTitleData = () => {
  const captchaRef = useRef()
  const [isCaptcha, setIsCaptcha] = useState(false)
  const [isAddDataModal, setIsAddDataModal] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
  const [openModal, setOpenModal] = useState(false)
  const tabs_bc = [
    {
      id: '1',
      icon: <PlusCircleOutlined />,
    },
    {
      id: '2',
      icon: <EditOutlined />,
    },
    {
      id: '3',
      icon: <CopyOutlined />,
    },
    {
      id: '4',
      icon: <DeleteOutlined />,
    },
  ]
  const getTooltipTitle = (tabId) => {
    if (tabId === '1') {
      return 'Tạo dữ liệu chủ đề trung gian'
    } else if (tabId === '2') {
      return 'Chỉnh sửa dữ liệu chủ đề trung gian'
    } else if (tabId === '3') {
      return 'Sao chép dữ liệu chủ đề trung gian'
    } else if (tabId === '4') {
      return 'Xóa dữ liệu chủ đề trung gian'
    }
  }
  const handleChangeTab = (key) => {
    if (key === '1') {
      setIsAddDataModal(true)
    } else if (key === '2') {
      message.error('Tính năng này chưa khả dụng')
    } else if (key === '3') {
      message.error('Tính năng này chưa khả dụng')
    } else if (key === '4') {
      message.error('Tính năng này chưa khả dụng')
    }
  }
  const hideModal = () => {
    setIsAddDataModal(false)
    setOpenModal(false)
  }

  return (
    <>
      <Tabs
        id="tab__title"
        type={'card'}
        activeKey="0"
        onChange={handleChangeTab}
        style={{ margin: '20px 0px' }}
        items={tabs_bc?.map((_tab) => {
          return {
            label: (
              <div
                className={`tab-item-bc tab-item-bc-${_tab.id} ${
                  _tab.id === '3'
                    ? 'tab-item-disabled'
                    : _tab.id === '4'
                    ? 'tab-item-disabled'
                    : ''
                }`}
              >
                {_tab.id === '4' ? (
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
                      <Tooltip title={getTooltipTitle(_tab.id)}>
                        {_tab.icon}
                      </Tooltip>
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    <Tooltip title={getTooltipTitle(_tab.id)}>
                      {_tab.icon}
                    </Tooltip>
                  </>
                )}
              </div>
            ),
            key: _tab.id,
            disabled: _tab.id === '3' || _tab.id === '4' ? true : false,
          }
        })}
      />
      <Modal
        open={isAddDataModal ? isAddDataModal : openModal}
        onCancel={hideModal}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={700}
        centered={true}
        destroyOnClose
      >
        <h2>Tạo chủ đề dữ liệu không gian</h2>
        <AddTitleData hideModal={hideModal}/>
      </Modal>
    </>
  )
}

export default TabTitleData
