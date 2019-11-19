/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom'; // if you use react-router
// import GoogleButton from 'react-google-button' // optional

function LoginPage(props) {
  const history = useHistory();
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <div className="auth-container">
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          signInSuccessUrl: '/signedIn',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
              firebase.handleRedirectResult(authResult).then(() => {
                history.push(props.redirect);
              });
              return false;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
      <div>
        <h2>Auth</h2>
        {
        !isLoaded(auth)
          ? <span>Loading...</span>
          : isEmpty(auth)
            ? <span>Not Authed</span>
            : <pre>{JSON.stringify(auth, null, 2)}</pre>
      }
      </div>
    </div>
  );
}

export default LoginPage;
