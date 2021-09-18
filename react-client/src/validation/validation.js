export const validateForm = (userFormData, setUserFormData) => {
  const { fullName, email, phoneNumber } = userFormData;

  let isError = false;

  // we spread it in userDetails after setting the error (this prevent us to do setUserDetails for every error)
  const errors = {
    fullNameError: "",
    emailError: "",
    phoneNumberError: "",
  };

  if (email.indexOf("@") === -1) {
    isError = true;
    errors.emailError = "Enter a valid email address";
  }

  if (fullName === "") {
    isError = true;
    errors.fullNameError = "First Name is required";
  }

  if (phoneNumber.length !== 10) {
    isError = true;
    errors.phoneNumberError =
      "Enter correct phone number";
  }

  setUserFormData({
    ...userFormData,
    ...errors,
  });

  return isError;
};
