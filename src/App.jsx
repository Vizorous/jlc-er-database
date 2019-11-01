import React from 'react';
import './App.css';
import '../node_modules/antd/dist/antd.css';

import { PageHeader } from 'antd';
import ViewTable from './components/ViewTable';
import SelectAiesecer from './components/SelectAiesecer';
import AddCold from './components/AddCold';

function App() {
  return (
    <div className="App">
      <PageHeader backIcon={false} title="JLC ER Database" />
      <AddCold />
      {/* <SelectAiesecer /> */}
      {/* <ViewTable /> */}
    </div>
  );
}

export default App;
