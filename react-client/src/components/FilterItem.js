// import { Divider } from "@material-ui/core";
import React from "react";
import "./FilterItem.css";

export default function FilterItem({
  dropdownLableProp,
  dropdownSelectName,
  optionsProp,
  handleFilterChange,
}) {
  //unique items
  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }

  const optionsPropSet = new Set(optionsProp);
  const optionsPropArray = [...optionsPropSet];

  let uniqueOptions = optionsPropArray.filter(Boolean);

  //   console.log(uniqueOptions);

  return (
    <div className="dropdownContainer">
      <label className="dropdownLabel" htmlFor="grouped-select">
        {dropdownLableProp}
      </label>
      <br></br>
      <select
        className="dropdownSelect"
        id="grouped-select"
        onChange={handleFilterChange}
        name={dropdownSelectName}>
        {!dropdownLableProp.includes("counselling") && (
          <option value="">None</option>
        )}

        {uniqueOptions.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}
