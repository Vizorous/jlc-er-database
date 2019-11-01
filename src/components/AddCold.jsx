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
    const projectListDoc = dataRef.doc('projectList');
    // console.log('tsting');

    projectListDoc.get()
      .then((doc) => {
        const data = doc.data();
        console.log(data.name);
        setProjectList(data.name);
        const companyListDoc = dataRef.doc('companyList');
        companyListDoc.get()
          .then((doc) => {
            setCompanyList(doc.data().names);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  const setData = (obj) => {
    const recordListDoc = dataRef.doc('RecordTable');
    const companyListDoc = dataRef.doc('companyList');
    return recordListDoc.get()
      .then((doc) => {
        const data = doc.data();
        const recordList = data.record;

        const lastRecord = recordList[recordList.length - 1].id;
        // const last
        const currentID = (Number.parseInt(lastRecord) + 1);
        const recordDoc = recordRef.doc(currentID.toString());
        // console.log('changed');
        recordDoc.set(obj, { merge: true })
          .then(() => {
            const companyRef = db.collection('Companies').doc(obj.companyName);

            companyRef.set({
              companyName: obj.companyName,
              contacts: firebase.firestore.FieldValue.arrayUnion({
                contactName: obj.contactName,
                contactNo: obj.contactNo,
                contactEmail: obj.contactEmail,
              }),
            }, { merge: true })
              .then(
                recordListDoc.update({
                  record: firebase.firestore.FieldValue.arrayUnion({
                    id: currentID,
                    ref: db.doc(`records/${currentID}`),
                    companyName: obj.companyName,
                    contactName: obj.contactName,
                    contactNo: obj.contactNo,
                    contactEmail: obj.contactEmail,
                    comments: obj.comments,
                    outcome: obj.outcome,
                    coldCall: true,

                  }),
                })
                  .then(() => {
                    console.log('updated');
                  })
                  .finally(() => {
                    const checkCompany = companyList.filter((value) => (value === obj.companyName));
                    console.log(checkCompany);

                    if (!Array.isArray(checkCompany) || !checkCompany.length) {
                      console.log('testing');

                      companyListDoc.update({ names: firebase.firestore.FieldValue.arrayUnion(obj.companyName) });
                      companyListDoc.get()
                        .then((docs) => {
                          setCompanyList(docs.data().names);
                        });
                    }
                    message.info('Document successfully written!');
                    setLoading(false);
                  }),

              )
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log(values);

        const result = await setData(values);
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
