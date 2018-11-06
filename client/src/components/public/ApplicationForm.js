import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { validateCandidate } from "./validate";
import { usStates } from "./us-states";

import * as applicationActions from "../../store/actions/application";

const styles = theme => ({
  root: {},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "45%"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "45%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const experienceRange = [
  "less than 2 years",
  "from 2 to 5 year",
  "more than 5 years"
];

class ApplicationForm extends Component {
  handleSubmit = () => {
    let errorMsg = null;
    const candidate = this.props.candidate;

    const validationObj = validateCandidate(candidate);
    const validationArray = Object.keys(validationObj);
    const requiredViolation = validationArray.findIndex(
      field => validationObj[field] === "Required"
    );

    errorMsg =
      validationObj.email === "Invalid email address"
        ? "Invalid email address"
        : null;
    errorMsg =
      validationObj.phone === "Invalid phone number"
        ? "Invalid phone number"
        : null;

    errorMsg =
      validationObj.dob === "Invalid birthdate" ? "Invalid birthdate" : null;

    if (requiredViolation !== -1) {
      let field = "";
      switch (validationArray[requiredViolation]) {
        case "firstName":
          field = "First Name";
          break;
        case "lastName":
          field = "Last Name";
          break;
        case "phone":
          field = "Phone";
          break;
        case "streetAddress":
          field = "Street Address";
          break;
        case "city":
          field = "City";
          break;
        case "state":
          field = "State";
          break;
        case "zipCode":
          field = "Zip Code";
          break;
        case "driversLicense":
          field = "Drivers Licence";
          break;
        case "dob":
          field = "Date of birth";
          break;
        // case "ssn":
        //   field = "Social Security Number";
        //   break;
        case "experience":
          field = "Experience";
          break;
        // case "formerEmployer":
        //   field = "Former Employer";
        //   break;
        // case "formerEmployerPhone":
        //   field = "Former Employer Phone";
        //   break;
        default:
          field = "";
      }
      // errorMsg = validationArray[requiredViolation] + " is a required field";
      errorMsg = field + " is a required field";
    }

    if (!errorMsg) {
      // this.props.onCreate(candidate);
      this.props.setCandidate(candidate);
    } else {
      alert(errorMsg);
    }
  };

  handleChange = key => ({ target: { value } }) => {
    this.props.setCandidateAttributes({ [key]: value });
  };

  render() {
    const { classes, candidate } = this.props;

    return (
      <React.Fragment>
        <form>
          <TextField
            id="firstName"
            label="First Name"
            className={classes.textField}
            value={candidate.firstName}
            onChange={this.handleChange("firstName")}
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            className={classes.textField}
            value={candidate.lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={candidate.email}
            onChange={this.handleChange("email")}
            margin="normal"
          />

          <InputMask
            mask="(999) 999 9999"
            maskChar="-"
            value={candidate.phone}
            onChange={this.handleChange("phone")}
          >
            {() => (
              <TextField
                id="phone"
                label="Phone"
                className={classes.textField}
                margin="normal"
                type="text"
              />
            )}
          </InputMask>
          <TextField
            id="streetAddress"
            lavel="Street Address"
            className={classes.textField}
            value={candidate.streetAddress}
            placeholder={"Street Address"}
            onChange={this.handleChange("streetAddress")}
            margin="normal"
          />
          <TextField
            id="city"
            label="City"
            className={classes.textField}
            value={candidate.city}
            onChange={this.handleChange("city")}
            margin="normal"
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="state-simple">State</InputLabel>
            <Select
              value={candidate.state}
              onChange={this.handleChange("state")}
              inputProps={{
                name: "state",
                id: "state-simple"
              }}
            >
              {Object.keys(usStates).map((stateAbbr, id) => (
                <MenuItem key={id} value={stateAbbr}>
                  {usStates[stateAbbr]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="zipCode"
            label="Zip Code"
            inputProps={{ maxLength: 5 }}
            className={classes.textField}
            value={candidate.zipCode}
            onChange={this.handleChange("zipCode")}
            margin="normal"
          />
          <TextField
            id="dlicense"
            label="Driver's License"
            className={classes.textField}
            value={candidate.driverslicense}
            onChange={this.handleChange("driversLicense")}
            margin="normal"
          />
          <InputMask
            mask="99/99/9999"
            maskChar="_"
            value={candidate.dob}
            onChange={this.handleChange("dob")}
          >
            {() => (
              <TextField
                id="birthdate"
                label="Birthdate (mm/dd/yyyy)"
                className={classes.textField}
                margin="normal"
                type="text"
              />
            )}
          </InputMask>
          {/* <InputMask
            mask="999-99-9999"
            maskChar="_"
            value={candidate.ssn}
            onChange={this.handleChange("ssn")}
          >
            {() => (
              <TextField
                id="ssn"
                label="Social Security Number"
                className={classes.textField}
                margin="normal"
                type="text"
              />
            )}
          </InputMask> */}
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="experience-simple">Experience</InputLabel>
            <Select
              value={candidate.experience}
              onChange={this.handleChange("experience")}
              inputProps={{
                name: "experience",
                id: "experience-simple"
              }}
            >
              {experienceRange.map((rng, id) => (
                <MenuItem key={id} value={rng}>
                  {rng}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="formerEmployer"
            label="Former Employer Name"
            className={classes.textField}
            value={candidate.formeremployer}
            onChange={this.handleChange("formerEmployer")}
            margin="normal"
          />
          {/* <InputMask
            mask="(999) 999 9999"
            maskChar="-"
            value={candidate.formerEmployerPhone}
            onChange={this.handleChange("formerEmployerPhone")}
          >
            {() => (
              <TextField
                id="formerEmployerPhone"
                label="Former Employer Phone"
                className={classes.textField}
                margin="normal"
                type="text"
              />
            )}
          </InputMask> */}
          <div>&nbsp;</div>
        </form>
        <br />
        <br />
        <Button
          color="primary"
          variant="raised"
          onClick={() => this.handleSubmit()}
        >
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ application }) {
  return {
    candidate: application.candidate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setCandidateAttributes: applicationActions.setCandidateAttributes,
      setCandidate: applicationActions.setCandidate
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ApplicationForm)
  )
);
