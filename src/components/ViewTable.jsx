/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import {
  Table, Tag, Popconfirm, Icon,
} from 'antd';
import copy from 'clipboard-copy';
// import { Link } from "react-router-dom";
const states = ['Not Yet', 'GTFO', 'Negative', 'Neutral', 'Positive'];

const handleTagColor = (text) => {
  switch (text) {
    case 'GTFO':
      return '#f50';

    case 'Negative':
      return 'red';

    case 'Neutral':
      return 'gold';

    case 'Monetary':
      return '#87d068';

    case 'Positive':
    case 'Sent':
      return 'green';

    case 'Non-Monetary':
      return 'geekblue';

    default:
      return undefined;
  }
};
const tagView = (tags, type) => {
  if (type === 'aiesecer') {
    return tags.map((tag) => (
      <Tag
        color="blue"
        key={tag.key}
        style={{ margin: '4px', fontSize: '14px' }}
        onClick={() => handleLinkOnClick(tag.key, type)}
      >
        {tag.text}
      </Tag>
    ));
  }
  return tags.map((tag) => {
    const color = handleTagColor(tag);
    return (
      <Tag color={color} key={tag} style={{ margin: '4px', fontSize: '14px' }}>
        {tag}
      </Tag>
    );
  });
};
const handleLinkOnClick = (key, type) => {
  console.log(key, type);
};

export default function ViewTable() {
  useEffect(() => {
    console.log('refreshing');
  }, []);
  return (
    <div>
      <Table
        scroll={{ x: true }}
        className="table-data"
        bordered
        columns={columns}
        dataSource={dataSource}
        Table
      />
    </div>
  );
}

const columns = [
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
    fixed: 'left',
    render: (data) => (
      <a onClick={() => handleLinkOnClick(data.text, data.key)}>{data.text}</a>
    ),

    width: 50,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (data) => (
      <a onClick={() => handleLinkOnClick(data.text, data.key)}>{data.text}</a>
    ),
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'AIESECers',
    dataIndex: 'aiesecers',
    key: 'aisecers',
    render: (data) => (
      <span>
        {data.map((value, index) => (
          <>
            <a
              onClick={() => handleLinkOnClick(value.ID, 'aisecers')}
              style={{ margin: '4px 2px' }}
            >
              {value.name}
            </a>
            <span>{index !== data.length - 1 ? ', ' : null}</span>
          </>
        ))}
      </span>
    ),
  },

  {
    title: 'Contact',
    dataIndex: 'preferedPerson',
    key: 'preferedPerson',
  },
  {
    title: 'No.',
    dataIndex: 'preferedNo',
    key: 'preferedNo',
  },
  {
    title: 'Email',
    dataIndex: 'preferedEmail',
    key: 'preferedEmail',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text) => (text !== undefined || text !== null ? (
      <Popconfirm
        icon={<Icon type="home-o" style={{ color: 'blue' }} />}
        title={text}
        onConfirm={() => copy(text)}
        okText="Copy"
      >
        <a>View</a>
      </Popconfirm>
    ) : (
      <span>No Data</span>
    )),

    width: 50,
  },
  {
    title: 'Cold Call',
    dataIndex: 'coldCall',
    key: 'coldCall',
    render: (tags) => <span>{tagView(tags)}</span>,
  },
  {
    title: 'Proposal',
    dataIndex: 'proposal',
    key: 'proposal',
    render: (tags) => <span>{tagView(tags)}</span>,
  },
  {
    title: 'Warm Call',
    dataIndex: 'warmCall',
    key: 'warmCall',
    render: (tags) => <span>{tagView(tags)}</span>,
  },
  {
    title: 'Meeting',
    dataIndex: 'meeting',
    key: 'meeting',
    render: (tags) => <span>{tagView(tags)}</span>,
  },
  {
    title: 'Outcome',
    dataIndex: 'Outcome',
    key: 'Outcome',
    render: (tags) => <span>{tagView(tags)}</span>,
  },
  // {
  //   title: "All Info",
  //   dataIndex: "allInfo",
  //   key: "allInfo",
  //   fixed: "right",
  //   render: (text, record) => (
  //     <a onClick={() => handleLinkOnClick(record.key)}>View Info</a>
  //   )
  //   // <Link to={`/${record.key}`}></Link>
  // }
];
const dataSource = [
  {
    company: 'ABC Company',
    key: { text: '12345', key: '12345' },
    project: { text: 'JXLDS 2019 44', key: '134' },
    aiesecers: [
      { name: 'Samitha', ID: '112' },
      { name: 'Testing', ID: '113' },
    ],
    preferedPerson: 'John Doe',
    preferedNo: '0771234123',
    preferedEmail: 'testing@gmail.com',
    address: 'New York No. 1 Lake Park',
    coldCall: ['Positive'],
    proposal: ['Neutral'],
    warmCall: ['Negative'],
    Outcome: ['Monetary'],
    meeting: ['GTFO', 'Not Yet'],
  },
];
