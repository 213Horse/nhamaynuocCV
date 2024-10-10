import React, { useMemo, useState } from 'react'
import {Col, Menu, Row} from 'antd'
import {
  FileExcelOutlined,
} from '@ant-design/icons';
import ApplicantionPage from './Pages/ApplicantionPage';
import ReportPage from './Pages/ReportPage';
import MapPage from './Pages/MapPage';
import FormPage from './Pages/FormPage';


const items = [
  {
    key: 'root',
    label:'Danh mục',
    icon: <FileExcelOutlined/>,
    children: [
      {
        key: 'app',
        label:'Ứng dụng',
      },
      {
        key: 'map',
        label:'Bản đồ',
      },
      {
        key: 'report',
        label:'Báo cáo',
      },
      {
        key: 'form',
        label:'Biểu mẫu',
      },
    ]
  },
];

const DecentralizationTab = ({hideModal}) => {
  const [currentPage, setCurrentPage] = useState('app')
  
  const pages = useMemo(() => {
    return {
      app: <ApplicantionPage hideModal={hideModal}/>,
      map: <MapPage hideModal={hideModal}/>,
      report: <ReportPage hideModal={hideModal}/>,
      form: <FormPage hideModal={hideModal}/>,
    }
  }, [hideModal])

  return (
    <Row gutter={[10, 10]} style={{marginTop: 10}}>
      <Col lg={6} md={24} sm={24} xs={24}>
        <Menu
          theme="light"
          mode={'inline'}
          defaultOpenKeys={['root']}
          defaultSelectedKeys={[currentPage]}
          onSelect={({_, key}) => setCurrentPage(key)}
          className='sub-sidebar-menu'
          items={items}
        />
      </Col>
      <Col lg={18} md={24} sm={24} xs={24}>
        {pages[currentPage]}
      </Col>
    </Row>
  )
}

export default DecentralizationTab