import { message } from 'antd';
import { db, firebase } from './reduxfirebase';

const dataRef = db.collection('Data');
const testdataRef = db.collection('testData');
const recordRef = db.collection('records');
const testrecordRef = db.collection('testrecords');
const companiesRef = db.collection('Companies');
const testcompaniesRef = db.collection('testCompanies');
const companyListDoc = dataRef.doc('companyList');
const testcompanyListDoc = dataRef.doc('testcompanyList');
const projectListDoc = dataRef.doc('projectList');
const recordListDoc = dataRef.doc('RecordTable');
const testrecordListDoc = dataRef.doc('testRecordTable');

const getAsyncCompanyList = async () => {
  const doc = await companyListDoc.get()
    .then()
    .catch((err) => {
      console.error(err);
      message.error('Error gettting the Company list. Please refresh');
    });
  const companyList = await doc.data().names;
  return [...companyList].sort();
};

const getAsyncProjectList = async () => {
  const doc = await projectListDoc.get()
    .then()
    .catch((err) => {
      console.error(err);
      message.error('Error gettting the Project list. Please refresh');
    });
  const projectList = doc.data().names;
  return [...projectList].sort();
  // print(data);
};
const setAsyncProjectList = (projectList) => {
  projectListDoc.set({ names: projectList }, { merge: true })
    .catch((err) => {
      console.error(err);
      message.error('Error setting the Project list. Please refresh');
    });
  // .then(console.log(projectListDoc.get().then( (doc) => {
  // doc.data()
  // }
  // ));
  // );
};
const addToCompanyList = (params) => {

};

const addToCompanies = (params) => {

};

const setColdData = async (obj, companyList, setLoading, setCompanyList) => {
  recordListDoc.get()
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
          const companyRef = companiesRef.doc(obj.companyName);

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
                  message.info('Document successfully written!');
                })
              ,

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
    }).finally(() => {
      const checkCompany = companyList.filter((value) => (value === obj.companyName));
      console.log(checkCompany);

      if (!Array.isArray(checkCompany) || !checkCompany.length) {
        console.log('testing');

        companyListDoc.update({ names: firebase.firestore.FieldValue.arrayUnion(obj.companyName) });
        getAsyncCompanyList()
          .then((docs) => {
            setCompanyList(docs.data().names);
          });
      }
      setLoading(false);
    });
};
export {
  getAsyncProjectList, getAsyncCompanyList, setAsyncProjectList, setColdData,
};
