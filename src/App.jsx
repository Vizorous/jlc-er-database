import React from 'react';
import './App.css';
import '../node_modules/antd/dist/antd.css';

import { PageHeader } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import ViewTable from './components/ViewTable';
import SelectAiesecer from './components/SelectAiesecer';
// import AddCold from './components/AddCold';
import AddWarm from './components/AddWarm';
import Home from './Views/Home';
import { db, firebase } from './firebase/reduxfirebase';

function App() {
  return (
    <div className="App">
      <PageHeader backIcon={false} title="JLC ER Database" />

      <Switch>

        <Route exact path="/Warm" component={AddWarm} />
        <Route exact path="/Home" render={() => (<Home />)} />

        <Route exact path="/"><Redirect to="Home" /></Route>
      </Switch>
    </div>
  );
}

export default App;
