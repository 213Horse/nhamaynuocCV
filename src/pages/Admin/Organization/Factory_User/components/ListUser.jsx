import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';



const ListUser = ({
  users,
  selectedUser,
  setSelectedUser
}) => {

  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    var initialDataTemp = users?.GetUsers.nodes.map((item, index) => {
      return {
        key: index + 1,
        stt: index + 1,
        id: item.id,
        name: item.userName,
        email: item.email,
      }
    })
    setInitialData(initialDataTemp);
  }, [users]);

  useEffect(() => {
    console.log('selectedUser', selectedUser);
  }, [selectedUser]);


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: <div style={{textAlign: 'center'}}>STT</div>,
      dataIndex: 'stt',
      key: 'stt',
      width: '9%',
      render: (text) => {
        return <div style={{textAlign: 'center'}}>{text}</div>
      }
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
  ];
  return (
    <div>
      <h4 className='actions-title'>Danh sách chức năng</h4>
      <div>
        <Table
          expandable={{ defaultExpandAllRows: false }}
          bordered
          size='small'
          dataSource={initialData}
          columns={columns}
          scroll={{ y: 615.5, x: 500 }}
          pagination={false}
          indentSize={20}
          rowClassName='row-table-hover'
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [selectedUser?.key],
            onSelect: (record) => {
              setSelectedUser(record)
            },
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setSelectedUser(record);
              },
            };
          }}
        />
      </div>
    </div>
  )
}

export default ListUser;