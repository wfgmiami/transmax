export default values => {
    const errors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "driversLicense",
      "experience"
    ];
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = "Required";
      }
    });

    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.phone.match(phoneno)) errors.phone = "Invalid phone number";

    return errors;
  };
