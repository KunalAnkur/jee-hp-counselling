// import { TextField } from "@material-ui/core";
import React from "react";
import {
  counsellingOptions,
  instituteUniqueOptions,
} from "../dummyData/dummyData";
import FilterItem from "./FilterItem";

const Filters = ({
  handleFilterChange,
  collegeDataOptions: {
      acadmeicUniquedata,
      quotaUniqueData,
      seatTypeUniqueData,
      genderUniqueData
  },
}) => {
  const instituteArray = instituteUniqueOptions;

  const [academicProgramArray, quotaArray, seatTypeArray, genderArray] = [
    acadmeicUniquedata,
    quotaUniqueData,
    seatTypeUniqueData,
    genderUniqueData,
  ];

  return (
    <div>
      <div className="filterContainer">
        <FilterItem
          dropdownLableProp="Institute"
          dropdownSelectName="institute"
          optionsProp={instituteArray}
          handleFilterChange={handleFilterChange}
        />
        <FilterItem
          dropdownLableProp="Academic Program Name"
          dropdownSelectName="academic_program_name"
          optionsProp={academicProgramArray}
          handleFilterChange={handleFilterChange}
        />
        <FilterItem
          dropdownLableProp="Quota"
          dropdownSelectName="quota"
          optionsProp={quotaArray}
          handleFilterChange={handleFilterChange}
        />
        <FilterItem
          dropdownLableProp="Seat Type"
          dropdownSelectName="seat_type"
          optionsProp={seatTypeArray}
          handleFilterChange={handleFilterChange}
        />
        <FilterItem
          dropdownLableProp="Gender"
          dropdownSelectName="gender"
          optionsProp={genderArray}
          handleFilterChange={handleFilterChange}
        />

        <FilterItem
          dropdownLableProp="Counselling"
          dropdownSelectName="counselling"
          optionsProp={counsellingOptions}
          handleFilterChange={handleFilterChange}
        />

        <label htmlFor="rank">Rank</label>
        <br></br>
        <input
          className="rankInput"
          type="number"
          id="rank"
          name="rank"
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Filters;

//   "Institute",
//     "Academic program name",
//     "Quota",
//     "Seat type",
//     "Gender",
//     "Opening rank",
//     "Closing rank",
//   const [InstituteFilter, setInstituteFilter] = useState(false);
//   const [AcademicProgramFilter, setAcademicProgramFilter] = useState(false);
//   const [QuotaFilter, setQuotaFilter] = useState(false);
//   const [SeatTypeFilter, setSeatTypeFilter] = useState(false);
//   const [InstituteFilter, setInstituteFilter] = useState(false);
//   const [InstituteFilter, setInstituteFilter] = useState(false);

//   const [FilterBy, setFilterBy] = useState({
//     institute: false,
//     Academic_program_name: false,
//     Quota: false,

//     //   "Gender",
//     //   "Opening rank",
//     //   "Closing rank",
//   });
