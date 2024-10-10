import React, { useMemo, useState } from 'react'
import { CloseOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Table, Tooltip } from 'antd'
import { useMediaQuery } from 'react-responsive'

const data = [
  {
    groupid: 374,
    groupguid: "4ac41b65-996d-436c-a2f7-49a0b4f512ff",
    _id: "57baac8f9f91135c45e0546e",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_ban_lanh_dao",
    displayname: "Ban Lãnh đạo",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    parentid: null,
    groupcode: "LD",
    address: "",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 376,
    groupguid: "90a1bd60-3e4d-4f0e-9766-a4b4b5c63cb1",
    _id: "57baacad9f91135c45e05470",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_phong_quan_ly_kh_va_hoa_don",
    displayname: "Phòng Quản lý KH và Hóa đơn",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    parentid: null,
    groupcode: "KH",
    address: "",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 520,
    groupguid: "2a3af14c-b795-4b76-8859-a6aec85b0c0e",
    _id: "5832ae316de1a5c836519e3d",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_bao_ha___lao_cai",
    displayname: "Nhà máy nước sạch Bảo Hà - Lào Cai",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    parentid: null,
    groupcode: "BH_LC",
    address: "Bảo Hà - Lào Cai",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 521,
    groupguid: "880dde3c-4a16-4afa-83bb-e6ec4f7c4c95",
    _id: "5832afdc6de1a5c836519e45",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_tay_tien",
    displayname: "Nhà máy nước sạch Tây Tiến - Tiền Hải - Thái Bình",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    parentid: null,
    groupcode: "TT_TH_TB",
    address: "Xã Tây Tiến huyện Tiền Hải tỉnh Thái Bình",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 522,
    groupguid: "97dc1c22-b050-47dd-9ef0-5aed12cedc07",
    _id: "5832b0186de1a5c836519e4b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_vu_lang___tien_hai___thai_binh",
    displayname: "Nhà máy nước sạch Vũ Lăng - Tiền Hải - Thái Bình",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    parentid: null,
    groupcode: "VL_TH_TB",
    address: "Vũ Lăng - Tiền Hải - Thái Bình",
    email: "",
    tel: "Vũ Lăng - Tiền Hải - Thái Bình",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  
  

  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },
  {
    groupid: 2493,
    groupguid: "24e22588-0b5a-466d-aceb-38c8f3e318c8",
    _id: "5bd7cae499625a903b77d00b",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    groupname: "CN0070_nha_may_nuoc_sach_hiep_hoa_so_1",
    displayname: "Nhà máy nước sạch Hiệp Hòa số 1",
    organizationcode: "CN0070",
    organizationid: "57baac709f91135c45e05469",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    parentid: null,
    groupcode: "NM_HH_so1",
    address: "Bắc Giang",
    email: "",
    tel: "",
    representative: "",
    description: ""
  },

]

const AddDepartmentModal = ({hideModal}) => {
  const [rowSelection, setRowSelection] = useState(null)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const [searchQuery, setSearchQuery] = useState("");

	const columns = useMemo(() => {
		return [
			{
				title: 'STT',
				dataIndex: 'stt',
				key: 'stt',
				width : '7%'
			},
			{
				title: 'Tên nhóm PB/ĐV',
				dataIndex: 'displayname',
				key: 'displayname',
				filteredValue: [searchQuery],
				onFilter: (value, record) => {
					return String(record.displayname).toLowerCase().includes(value.toLowerCase());
				},
			},
			{
				title: 'Mã nhóm PB/ĐV',
				dataIndex: 'groupcode',
				key: 'groupcode',
			},
		]
	}, [searchQuery])

	const initialData = data.map((item, index) => ({
    ...item,
    stt: index+1
  }))

	// handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setRowSelection(selectedRows[0])
  };

  const handleUncheckRadio = () => {
    setRowSelection(null)
  };

  return (
    <>
			<Form>
        <Row justify='end'>
          <Col span={isTabletOrMobile ? 24 : 12}>
            <Form.Item className="custom-form-item">
              <Input.Search
                placeholder="Lọc theo tên nhóm PB/ĐV"
                style={{
                  marginRight: '5px',
                  width: '100%',
                }}
								onChange={(e) => {
									setSearchQuery(e.target.value);
							 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
			
      <Table
        pagination={false}
        size="small"
        scroll={{ x:850, y: 380 }}
        bordered
        rowKey="stt"
        columns={columns.map((column) => ({
          ...column,
          className: 'cell-wrap',
        }))}
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
          selectedRowKeys: rowSelection ? [rowSelection.stt] : [],
        }}
      />
      <Row justify="end" gutter={[8]} style={{
        marginTop: '10px'
      }}>
        <Col>
          <Button 
            type="primary" 
            icon={<PlusCircleOutlined/>} 
            style={{marginRight: 4}}
            >
              Chọn
          </Button>
        </Col>
        <Col>
          <Button
            icon={<CloseOutlined />}
            className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AddDepartmentModal