/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer, useState } from 'react';
import {
  Select, Input, Button, DatePicker, Form, Tooltip, Icon, Checkbox, InputNumber, AutoComplete, message,
} from 'antd';
import { db, firebase } from './Firebase/firebase';
import {
  setColdData, getAsyncProjectList, setAsyncProjectList, getAsyncCompanyList,
} from './Firebase/index';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const { Option } = Select;

const outcomeList = [
  'Positive',
  'Negative',
];
function AddCold(props) {
  const dataRef = db.collection('Data');
  const recordRef = db.collection('records');
  const [projectList, setProjectList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [readOnly, setreadOnly] = useState(true);

  const { getFieldDecorator } = props.form;
  useEffect(() => {
    getAsyncProjectList().then((value) => {
      setProjectList(value);
    });
    getAsyncCompanyList().then((value) => {
      setCompanyList(value);
    });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log(values);

        const result = await setColdData(values, companyList, setLoading, setCompanyList);
      }
    });
  };


  return (

    < >
      <div className="container-form">
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item {...tailFormItemLayout}>
            <h3 style={{ margin: 'auto' }}>Add Cold Call Data</h3>
          </Form.Item>
          <Form.Item
            label={(
              <span>
                    AIESECER Email&nbsp;
                <Tooltip title="Please enter the email of the AIESECER who called">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
    )}
            placeholder="Enter the email"
          >
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input name="email" />)}
          </Form.Item>

          <Form.Item label="Project">
            {getFieldDecorator('project', {
              rules: [
                { required: true, message: 'Please select your Project!' },
              ],
            })(
              <Select>
                {projectList.map((value) => (<Option key={value} value={value}>{value}</Option>))}
              </Select>,
            )}
          </Form.Item>


          <Form.Item
            label="Company Name"
          >
            {getFieldDecorator('companyName', {
              rules: [{ required: true, message: 'Please input your Company\'s Name!', whitespace: true }],
            })(<AutoComplete
              dataSource={companyList}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />)}
          </Form.Item>

          <Form.Item
            label="Contact Name"
          >
            {getFieldDecorator('contactName', {
              rules: [{ whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Contact Number">
            {getFieldDecorator('contactNo', {
              rules: [{
                type: 'number',
                message: 'The input is not valid Number!',
              }, { required: true, message: 'Please input your Contact\'s Phone No. !' }],
            })(<InputNumber style={{ width: '100%' }} readOnly={readOnly} onFocus={() => (setreadOnly(false))} onBlur={() => (setreadOnly(true))} />)}
          </Form.Item>
          <Form.Item
            label="Contact Email"
            placeholder="Enter your Contact\'s email"

          >
            {getFieldDecorator('contactEmail', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                // {
                //   required: true,
                //   message: 'Please input your E-mail!',
                // },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Outcome">
            {getFieldDecorator('outcome', {
              rules: [
                { required: true, message: 'Please select the outcome!' },
              ],
            })(
              <Select>
                {outcomeList.map((value) => (<Option key={value} value={value}>{value}</Option>))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Comments">
            {getFieldDecorator('comments')(
              <TextArea rows={4} />,
            )}
          </Form.Item>


          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
                  Save
            </Button>
          </Form.Item>
        </Form>

      </div>
    </>
  );
}

const WrappedAddCold = Form.create({ name: 'register' })(AddCold);
export default WrappedAddCold;
