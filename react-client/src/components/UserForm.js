import React from "react";
import { TextField } from "@material-ui/core";

const userForm = ({ handleInput, userFormData }) => {
  const { emailError, fullNameError, phoneNumberError } = userFormData;
  return (
    <div className="userInputDiv">
      <div className="enterDetailsText">Enter Your Details</div>
      <TextField
        onChange={handleInput}
        type="text"
        name="fullName"
        label="Full Name"
        fullWidth
        variant="outlined"
        error={fullNameError !== ""}
        helperText={fullNameError}
      />
      <TextField
        onChange={handleInput}
        type="text"
        name="email"
        label="Email"
        fullWidth
        variant="outlined"
        error={emailError !== ""}
        helperText={emailError}
      />

      <TextField
        onChange={handleInput}
        type="number"
        name="phoneNumber"
        label="Phone Number"
        fullWidth
        variant="outlined"
        error={phoneNumberError !== ""}
        helperText={phoneNumberError}
      />
    </div>
  );
};

export default userForm;
