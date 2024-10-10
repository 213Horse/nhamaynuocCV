import React, {useRef, useState} from 'react'
import { InfoCircleOutlined, DatabaseOutlined , TableOutlined  } from '@ant-design/icons'
import { Tabs, Popconfirm, Tooltip, message, Modal } from 'antd'
import Captcha from '../../../../../components/Captcha/Captcha'
import ChooseResourceModal from './ChooseResourceModal'
import { useSelector } from 'react-redux'
import { btnClickTabListInvoicePrintSelector } from '../../../../../redux/selector'


const TabListData = () => {
    const [isChooseResource, setIsChooseResource] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const tabListData = useSelector(btnClickTabListInvoicePrintSelector)
    const tabs_bc = [
        {
          id: '1',
          icon: <InfoCircleOutlined />,
        },
        {
          id: '2',
          icon: <DatabaseOutlined />,
        },
        {
          id : '3',
          icon : <TableOutlined /> 
        },
        {
          id: '4',
          icon: <DatabaseOutlined /> ,
        },
      ]
      const handleChangeKey = (key) => {
        if(key === '1'){
         message.error('Tính năng này chưa khả dụng')
        }else if(key === '2'){
          setIsChooseResource(true);
        }else if(key === '3'){
          message.error('Tính năng này chưa khả dụng')
        }else if(key === '4'){
          message.error('Tính năng này chưa khả dụng')
        }
      }
      const getTooltipTitle = (tabId) => {
        if (tabId === '1') {
          return 'Thông tin lớp dữ liệu';
        } else if (tabId === '2') {
          return 'Nhập dữ liệu';
        } else if (tabId === '3') {
          return 'Bảng thuộc tính';
        } else if (tabId === '4') {
          return 'Nhập dữ liệu nâng cao'
        }
        return ''; // Hoặc bạn có thể trả về một văn bản mặc định khác
      };
      const hideModal = () => {
        setIsChooseResource(false);
        setIsModal(false)
      }
    
  return (
    <>
        <Tabs
            id='tab__title' 
            activeKey='0' 
            type='card'
            onChange={handleChangeKey}
            items={tabs_bc?.map((_tab) => {
                return {
                  label: (
                    
                    <div
                      className={`tab-item-bc tab-item-bc-${_tab.id} ${
                         _tab.id === '1' && tabListData === null
                          ? 'tab-item-disabled'
                          : _tab.id === '3' && tabListData === null
                          ? 'tab-item-disabled'
                          : ''
                      }`}
                    >          
                        <>
                          <Tooltip title={getTooltipTitle(_tab.id)}>
                            {_tab.icon}
                          </Tooltip>
                        </>
                    </div>
                  ),
                  key: _tab.id,
                  disabled:
                    ( _tab.id === '1') ||
                    (_tab.id === '3')
                      ? true
                      : false,
                }
              })} 
        />
        <Modal
        open={isChooseResource ? isChooseResource : isModal}
        onCancel={hideModal}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={700}
        centered={true}
        destroyOnClose
      >
        <h2>
          Chọn kiểu nguồn dữ liệu
        </h2>
        <ChooseResourceModal hideModal={hideModal}/>
      </Modal>
    </>
  )
}

export default TabListData