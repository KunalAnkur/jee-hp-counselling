import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import CollegeDataList from "./components/CollegeDataList";
import Filters from "./components/Filters";
import UserDataComp from "./components/UserDataComp";
import UserForm from "./components/UserForm";
import { validateForm } from "./validation/validation";

function App() {
  const [collegeData, setCollegeData] = useState("");
  const [collegeDataForFiltering, setCollegeDataForFiltering] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [userFormData, setUserFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    fullNameError: "",
    emailError: "",
    phoneNumberError: "",
  });

  const [userDataSubmitted, setUserDataSubmitted] = useState(false);

  const { fullName, email, phoneNumber } = userFormData;

  const [filterFormData, setFilterFormData] = useState({
    institute: "",
    academic_program_name: "",
    quota: "",
    seat_type: "",
    gender: "",
    rank: "",
    counselling: "",
  });

  const {
    institute,
    academic_program_name,
    quota,
    seat_type,
    gender,
    rank,
    counselling,
  } = filterFormData;

  useEffect(() => {
    axios
      .get("/getCollegeDataFiltering")
      .then((data) => {
        if (data) setCollegeDataForFiltering(data);
      });
  }, []);

  const handleInput = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterChange = (e) => {
    setFilterFormData({
      ...filterFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm(userFormData, setUserFormData);

    if (validationError) {
      setIsLoading(false)
      return;
    }
    //https://hp-jee-server.herokuapp.com

    axios
      .get(
        `/getCollegeData/${fullName}/${email}/${phoneNumber}?academic_program_name=${academic_program_name}&quota=${quota}&seat_type=${seat_type}&gender=${gender}&rank=${rank}&counselling=${counselling}`
      )
      .then((res) => {
        console.log(res.data);
        setCollegeData(res.data);
        setUserDataSubmitted(true);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="heading">
        Welcome to Joint Seat Allocation Authority 2020
      </div>

      <div className="form-container">
        {collegeDataForFiltering ? (
          <div>
            <div>
              <form onSubmit={(e) => {
                  setIsLoading(true);
                  onFormSubmit(e)
                }}>
                <div className="formdiv">
                  {/* User Form */}

                  <div className="userFormContainer">
                    {!userDataSubmitted ? (
                      <UserForm
                        userFormData={userFormData}
                        handleInput={handleInput}
                      />
                    ) : (
                      <div>
                        <UserDataComp userFormData={userFormData} />
                      </div>
                    )}
                  </div>

                  {/* Filter Form */}

                  <div>
                    <div style={{ marginLeft: "20px", flex: 1 }}>
                      <Filters
                        handleFilterChange={handleFilterChange}
                        collegeDataOptions={collegeDataForFiltering}
                      />

                      <br></br>
                    </div>
                  </div>
                </div>

                {/* Submit button */}

                <div style={{ textAlign: "center" }}>
                  <button
                    className="submitBtn"
                    disabled={!(userFormData.fullName && userFormData.email && userFormData.phoneNumber)}
                    type="submit">
                    Submit
                  </button>
                  {isLoading ? (
                  <div className="data-loadingContainer">
                    <CircularProgress /> ...loading results
                  </div>
                ) : ''}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="loadingContainer">
            <CircularProgress />
          </div>
        )}
      </div>

      <div className="collegeDataContainer">
        {collegeData && (
          <CollegeDataList
            collegeDataProp={collegeData}
            instituteTypeSelected={institute}
          />
        )}
      </div>
    </div>
  );
}

export default App;
