import React, { useMemo, useState } from 'react'
import { CloseOutlined, DeleteOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Table, Tooltip } from 'antd'
import { useMediaQuery } from 'react-responsive'

const AddUserModal = ({hideModal}) => {
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
				title: 'ID đăng nhập',
				dataIndex: 'loginname',
				key: 'loginname',
				width: '20%'
			},
			{
				title: 'Tên',
				dataIndex: 'name',
				key: 'name',
				width: '20%'
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},
		]
	}, [])

	const initialData = useMemo(() => {
    return fakeData.map((item, i) => ({
      stt: i + 1,
      ...item
    }))
  }, [])

  const filterTable = useMemo(() => {
    return initialData.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    ))
  }, [initialData, searchQuery]);

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
                placeholder="Lọc người dùng theo tên, ID hoặc email"
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
        scroll={{ x: 1100, y: 380 }}
        bordered
        rowKey="stt"
        columns={columns.map((column) => ({
          ...column,
          className: 'cell-wrap',
        }))}
        dataSource={filterTable == null ? initialData : filterTable}
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
            // className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Col>
      </Row>
    </>
  )
}

const fakeData = [
  {
    memberid: 3919,
    memberguid: "2994908c-0591-4734-b358-6e56519e77c9",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "cn0070",
    loginname: "cn0070",
    email: "cn0070ctw@gmail.com",
    parentid: null,
    role: "owner",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4369,
    memberguid: "f3b7f853-d844-4dbe-a249-13d75216e72c",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Hoàng Văn Nam",
    loginname: "hoangnamtnmt",
    email: "hoangnamtnmt@gmail.com",
    parentid: null,
    role: "owner",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: "",
    macaddress: "",
    ipaddress: "",
    browser: "",
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4370,
    memberguid: "07895b52-9f5f-4670-b4c2-6e2c88df6e20",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Đoàn",
    loginname: "doan.cnmt",
    email: "doan.hpu@gmail.com",
    parentid: null,
    role: "owner",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: "",
    macaddress: "",
    ipaddress: "",
    browser: "",
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4373,
    memberguid: "e863ac25-8b0e-419e-a0e7-f210ee87829a",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Trịnh Ngọc Tuấn",
    loginname: "tuanbeobh",
    email: "tuanbeobh@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4374,
    memberguid: "503213f3-e54d-4650-a05e-a6f91f67b7e9",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Mạnh Thắng",
    loginname: "thang",
    email: "thangnuocsachcnmtvn@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4500,
    memberguid: "cb04afb9-5bb0-4b3a-b847-e4b518578914",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Đảm",
    loginname: "damtb.cnmt",
    email: "nguyenvandam13033@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4501,
    memberguid: "71461043-294b-4378-8d13-b4b5b8b1eaa5",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Lương Văn Tường",
    loginname: "tuongtb.cnmt",
    email: "luongvantuong13033@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4502,
    memberguid: "9c0565e6-ba96-4fd3-8ce3-c447eacac64f",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Đào Tam Quang",
    loginname: "quangtb.cnmt",
    email: "tamquangcnmt@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 4503,
    memberguid: "11d1c8c6-3474-4f67-aaae-7a4be0d180fd",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Đặng Anh Tuấn",
    loginname: "tuantb.cnmt",
    email: "dangvantuan12985@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "00000000-0000-0000-0000-000000000000",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 15727,
    memberguid: "8291bb80-c9b7-4da9-8e06-99551505e269",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "cnmtvietnamecpay",
    loginname: "cnmtvietnamecpay",
    email: "cnmtvietnamecpay@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: "",
    macaddress: "",
    ipaddress: "",
    browser: "",
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16014,
    memberguid: "9c67126d-accd-456f-b7ed-762c419280d0",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Sang",
    loginname: "mtvn.sang",
    email: "mtvn.sang@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16015,
    memberguid: "ca13fc67-a365-4899-9a42-a261c97593ad",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Huấn",
    loginname: "mtvn.huan",
    email: "mtvn.huan@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16016,
    memberguid: "16937370-7947-4fac-a168-bd5f55e44ccf",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Hoàng",
    loginname: "vanhoang",
    email: "vanhoang@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16017,
    memberguid: "81d61ae3-61c5-4d0e-99a8-7beae5b9d683",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Thanh",
    loginname: "nvt011197",
    email: "nvt011197@gmail.com",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16511,
    memberguid: "afbca4fc-07b4-4ab3-b798-41cd496a5c2c",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Hoàng Nam",
    loginname: "namnh.mtvn",
    email: "namnh.mtvn@cloudgis.vn",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16512,
    memberguid: "b265d505-af1a-45ef-a4ef-ec2f855df181",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Đỗ Đặng Thinh",
    loginname: "thinhdd.mtvn",
    email: "thinhdd.mtvn@cloudgis.vn",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16513,
    memberguid: "57e009d6-841d-4851-aeb1-5e5b65ce02e4",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Đặng Mẫn",
    loginname: "mannd.mtvn",
    email: "mannd.mtvn@cloudgis.vn",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16514,
    memberguid: "1dad73ab-f5cd-462e-9acb-0dae8edb58b4",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "KT Nguyễn Thị Hằng",
    loginname: "hangnt.mtvn",
    email: "hangnt.mtvn@cloudgis.vn",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: "",
    macaddress: "",
    ipaddress: "",
    browser: "",
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16523,
    memberguid: "0616c5ca-355f-46f3-9c3b-bbd92d4abc29",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "KT Lê Thị Ngọc Bích",
    loginname: "lethingocbich.nga",
    email: "lethingocbich.nga@gmail.com",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16550,
    memberguid: "a53ec696-725c-4cd9-984f-a5a4696d6870",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Phạm Văn Đức",
    loginname: "vanduc.xncnmtvn",
    email: "vanduc.xncnmtvn@gmail.com",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16551,
    memberguid: "3c13b246-030b-471e-a89c-1a46366e24ca",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "KT Nguyễn Thị Thuỳ Dung",
    loginname: "dungacc98",
    email: "dungacc98@gmail.com",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: "",
    macaddress: "",
    ipaddress: "",
    browser: "",
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16552,
    memberguid: "15eedc9c-255b-4131-aa13-dec2e67e4f52",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Hà Thị Đảm",
    loginname: "hadamcl",
    email: "hadamcl@gmail.com.vn",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16553,
    memberguid: "7120ea0b-af76-4083-beb1-4535b7d1b90b",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Hoàng Văn Thụ",
    loginname: "hoangvanthu.mtvn",
    email: "hoangvanthu.mtvn@cloudgis.vn",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16554,
    memberguid: "216a735a-114b-483f-a305-d8b73779568a",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Hiệp",
    loginname: "nsbh.hiep",
    email: "nsbh.hiep@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16555,
    memberguid: "c1746ad5-11a8-499a-881d-12b7f85aac1c",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Lương Văn Anh",
    loginname: "luongvananh.mtvn",
    email: "luongvananh.mtvn@cloudgis.vn",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16556,
    memberguid: "f15093e6-580c-4748-9138-27f53b960fe1",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Trần Văn Thiện",
    loginname: "tranvanthien.mtvn",
    email: "tranvanthien.mtvn@cloudgis.vn",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16557,
    memberguid: "709f0f39-3799-44ea-a634-a7248e306f28",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Hiếu",
    loginname: "nguyenvanhieu.mtvn",
    email: "nguyenvanhieu.mtvn@cloudgis.vn",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16596,
    memberguid: "c361ac10-80dd-4571-b004-6202eb187da1",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Duy Thành",
    loginname: "duythanh.mt1801",
    email: "duythanh.mt1801@gmail.com",
    parentid: null,
    role: "owner",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 16745,
    memberguid: "ab9c243c-5572-4e37-b715-1c82374d63a9",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Lê Thị Kim Hồng",
    loginname: "lethikimhong0806",
    email: "lethikimhong0806@gmail.com",
    parentid: null,
    role: "owner",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 17662,
    memberguid: "ade3504e-0b13-4544-86ad-5642dfaa08f5",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Hoàng Văn Quang",
    loginname: "hoangquang28898",
    email: "hoangquang28898@gmail.com",
    parentid: null,
    role: "manager",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 18380,
    memberguid: "87a5aa67-20ca-4c20-8c15-e84192f8b368",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "VIETTELPAY",
    loginname: "cnmtviettelpay",
    email: "cnmtviettelpay@cloudgis.vn",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: "",
    macaddress: "",
    ipaddress: "",
    browser: "",
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 19901,
    memberguid: "4679ee2c-dba0-41b5-9665-c05361b05712",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Hoàng Đình Tuấn",
    loginname: "tuanhd.mtvn",
    email: "tuanhd.mtvn@cloudgis.vn",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 19902,
    memberguid: "b0418964-53c9-430f-9821-b6a1abd9ea4f",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Trần Văn Huệ",
    loginname: "huetv.mtvn",
    email: "huetv.mtvn@cloudgis.vn",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 19929,
    memberguid: "c9424b6e-7fca-442d-ac25-811b2de239a6",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "Nguyễn Văn Thế",
    loginname: "ketoan.mtvn2022",
    email: "ketoan.mtvn2022@gmail.com",
    parentid: null,
    role: "member",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  },
  {
    memberid: 20150,
    memberguid: "2dfc0f2c-acb2-42bd-9290-9bd15796ece6",
    _id: "",
    siteid: 1,
    siteguid: "2a75c339-512e-47a9-8428-f820849326a9",
    name: "AT_Test",
    loginname: "AT_Test",
    email: "tuananh83cbt@gmail.com",
    parentid: null,
    role: "owner",
    organizationguid: "acd90c30-2e31-4f4a-9c9f-c586cfe99720",
    organizationid: "57baac709f91135c45e05469",
    organizationcode: "CN0070",
    code: null,
    macaddress: null,
    ipaddress: null,
    browser: null,
    devicetype: null,
    cloudid: null,
    phanloaitk: null
  }
]

export default AddUserModal