import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CollegeDataList({
  collegeDataProp,
  instituteTypeSelected,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(30);
  const classes = useStyles();

  const TableHeadings = [
    "Institute",
    "Academic program name",
    "Quota",
    "Seat type",
    "Gender",
    "Opening rank",
    "Closing rank",
  ];

  const instituteTypeMap = {
    IIT: "Indian Institute of Technology",
    IIIT: "Indian Institute of Information Technology",
    NIT: "National Institute of Technology",
  };

  let filteredCollegeDataPropnew;

  const filteredCollegeDataProp = collegeDataProp.filter((collegeDataObj) =>
    Boolean(collegeDataObj.institute) && instituteTypeSelected === "Others"
      ? !(
          collegeDataObj.institute.includes(instituteTypeMap["IIT"]) ||
          collegeDataObj.institute.includes(instituteTypeMap["IIIT"]) ||
          collegeDataObj.institute.includes(instituteTypeMap["NIT"])
        )
      : instituteTypeSelected in instituteTypeMap
      ? collegeDataObj.institute.includes(
          instituteTypeMap[instituteTypeSelected]
        )
      : Boolean(collegeDataObj.institute)
  );

  if (instituteTypeSelected === "NIT") {
    filteredCollegeDataPropnew = collegeDataProp.filter((obj) => {
      // console.log(obj.institute);
      return (
        obj.institute.includes("Indian Institute of Technology Bhubaneswar") ===
        true
      );
    });
  }

  console.log("line 55", filteredCollegeDataPropnew);

  function paginatedData(pageNumber, limit) {
    const firstItem = pageNumber * limit - limit;
    const lastItem = pageNumber * limit;
    return filteredCollegeDataProp.slice(firstItem, lastItem);
  }

  const handlePrevious = () => {
    setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1);
  };

  const handleNext = () => {
    setPageNumber(
      pageNumber >= Math.ceil(filteredCollegeDataProp.length / limit)
        ? pageNumber
        : pageNumber + 1
    );
  };

  const changeLimit = (e) => {
    setLimit(e.target.value);
  };

  const paginatedCollegeData = paginatedData(pageNumber, limit);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <div>
          {`Showing ${pageNumber * limit - limit} - ${pageNumber * limit} of ${
            filteredCollegeDataProp.length
          } results`}
        </div>
        <input
          placeholder="Number of results per page"
          type="number"
          name="Limit"
          max="200"
          min="1"
          value={limit}
          onChange={changeLimit}
        />
        <button
          className="listBtn"
          disabled={pageNumber === 1}
          onClick={handlePrevious}>
          Previous
        </button>
        <button
          className="listBtn"
          disabled={
            pageNumber === Math.ceil(filteredCollegeDataProp.length / limit)
          }
          onClick={handleNext}>
          Next
        </button>
        <button
          className="listBtn"
          onClick={() => {
            setLimit(30);
            setPageNumber(1);
          }}>
          Reset
        </button>
      </div>
      <TableContainer component={Paper} elevation={3}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ background: "#2366cc" }}>
            <TableRow>
              {TableHeadings.map((heading, index) => {
                return (
                  <TableCell style={{ color: "white" }} key={index}>
                    {heading}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCollegeData.map((mappedData) => (
              <TableRow key={mappedData._id}>
                <TableCell align="left">{mappedData.institute}</TableCell>
                <TableCell align="left">
                  {mappedData.academic_program_name}
                </TableCell>
                <TableCell align="left">{mappedData.quota}</TableCell>
                <TableCell align="left">{mappedData.seat_type}</TableCell>
                <TableCell align="left">{mappedData.gender}</TableCell>
                <TableCell align="left">{mappedData.opening_rank}</TableCell>
                <TableCell align="left">{mappedData.closing_rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
