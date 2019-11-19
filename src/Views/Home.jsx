/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
import { Button, Spin } from 'antd';

export default function Home(props) {
  console.log(props);

  const history = useHistory();
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);

  const onClickRedirect = (urlParam) => {
    history.push(urlParam);
  };

  const addButtons = () => (
    <>
      <Button className="button-addCold" onClick={() => { onClickRedirect('cold'); }} type="primary">Add Cold Calls</Button>
      <Button className="button-addWarm" onClick={() => onClickRedirect('warm')} type="primary">Add Warm Calls</Button>
      <Button className="button-addMeeting" onClick={() => { onClickRedirect('meeting'); }} type="primary">Add Meetings</Button>
      <Button className="button-add-profile" onClick={() => firebase.updateProfile({ project: 'BSL Jan' })} type="primary">Add Meetings</Button>
      {/* <Button className="button-add" onClick={onClickRedirect('cold')} type="primary">Add Cold Calls</Button> */}

    </>
  );

  const renderLogin = (redirect) => (
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'popup',
        signInSuccessUrl: '/signedIn',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            firebase.handleRedirectResult(authResult).then(() => {
              // history.push('Home');
            });
            return false;
          },
        },
      }}
      firebaseAuth={firebase.auth()}
    />
  );


  return (
    <div>

      {!isLoaded(auth)
        ? <Spin />
        : isEmpty(auth)
          ? renderLogin('warm')
          : (
            <div>
              <h2>

                {`Hi, ${auth.displayName} `}
              </h2>
              <div>{JSON.stringify(auth, null, 2)}</div>
              {addButtons()}
              <Button onClick={() => firebase.logout()} />
            </div>
          )}
    </div>
  );
}
