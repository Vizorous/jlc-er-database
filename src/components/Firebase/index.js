import { message } from 'antd';
import { db, firebase } from './firebase';

const dataRef = db.collection('Data');
const recordRef = db.collection('records');
const companyListDoc = dataRef.doc('companyList');
const projectListDoc = dataRef.doc('projectList');

const getCompanyList = () => {
  companyListDoc.get()
    .then((doc) => doc.data().names)
    .catch((err) => {
      console.error(err);
      message.error('Error gettting the Company list. Please refresh');
    });
};

const getProjectList = () => {
  projectListDoc.get()
    .then((doc) => doc.data().names)
    .catch((err) => {
      console.error(err);
      message.error('Error gettting the Project list. Please refresh');
    });
};
const setProjectList=() => {
    
}