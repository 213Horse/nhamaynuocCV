import React from 'react'
import TabTitleData from './TabTitleData'
import { Tree } from 'antd';

const treeData = [
  {
    title: 'gServer 2.1',
    key: '0-0',
    children: [
      {
        title: 'Lớp dữ liệu được chia sẻ',
        key: '0-0-0',
        isLeaf: true,
      },
      {
        title: 'Lớp dữ liệu dùng chung',
        key: '0-0-1',
        isLeaf: true,
      },
    ],
  },
];
const TitleData = () => {
  const { DirectoryTree } = Tree;
  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };
  const onExpand = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return (
    <>
      <TabTitleData/>
      <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
    </>
  )
}

export default TitleData