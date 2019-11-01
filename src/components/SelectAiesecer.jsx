import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
function SelectAiesecer({ setAisecers, currentAiesecers, AiesecerList }) {
  return (
    <>
      <Select
        mode="multiple"
        placeholder="Select The AIESECers"
        onChange={(keys) => setAisecers(keys)}
      >
        {(AiesecerList !== null || AiesecerList !== undefined)
          ? AiesecerList.map((value) => (<Option key={value.ID}>{value.name}</Option>))
          : null}
      </Select>
    </>
  );
}


export default SelectAiesecer;
