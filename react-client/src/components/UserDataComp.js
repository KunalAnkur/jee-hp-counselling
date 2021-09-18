import React from "react";
import "./UserDataComp.css";
const UserDataComp = ({ userFormData }) => {
  const { fullName, email, phoneNumber } = userFormData;
  return (
    <div className="UserCompData">
      <div className="fullName">
        <span>Full Name: </span> <span className="data">{fullName}</span>
      </div>
      <div className="email">
        <span>Email:</span> <span className="data">{email}</span>
      </div>
      <div className="phoneNumber">
        <span>Phone Number: </span>
        <span className="data">{phoneNumber}</span>
      </div>
    </div>
  );
};

export default UserDataComp;
