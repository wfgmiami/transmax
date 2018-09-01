import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { usStates } from "../us-states";
import { withStyles } from "@material-ui/core/styles";
import InputMask from 'react-input-mask';
import validate from "./validate";

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
  state = {
    candidate: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      driversLicense: "",
      experience: ""
    }
  };

  handleSubmit = () => {
    let errorMsg = null;
    const { candidate } = this.state;

    const validationObj = validate(this.state.candidate);
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

    if (requiredViolation !== -1)
      errorMsg = validationArray[requiredViolation] + " is a required field";

    if (!errorMsg) {
      this.props.onCreate(candidate);
    } else {
      alert(errorMsg);
    }
  };

  handleChange = key => ({ target: { value } }) => {
    this.setState({
      candidate: {
        ...this.state.candidate,
        [key]: value
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <form>
          <TextField
            id="firstName"
            label="First Name"
            className={classes.textField}
            value={this.state.candidate.firstName}
            onChange={this.handleChange("firstName")}
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            className={classes.textField}
            value={this.state.candidate.lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={this.state.candidate.email}
            onChange={this.handleChange("email")}
            margin="normal"
          />

          {/* <TextField
            id="phone"
            label="Phone"
            className={classes.textField}
            value={this.state.candidate.phone}
            onChange={this.handleChange("phone")}
            margin="normal"
          /> */}

          <InputMask
            mask="999 999 9999"
            maskChar="-"
            value={this.state.candidate.phone}
            onChange={this.handleChange("phone")}
            className={classes.textField}
          >
            {() => <TextField
              id="phone"
              label="Phone"
              className={classes.textField}
              margin="normal"
              type="text"
              />}
              </InputMask>
          <TextField
            id="city"
            label="City"
            className={classes.textField}
            value={this.state.candidate.city}
            onChange={this.handleChange("city")}
            margin="normal"
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="state-simple">State</InputLabel>
            <Select
              value={this.state.candidate.state}
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
            id="dlicense"
            label="Driver's License"
            className={classes.textField}
            value={this.state.candidate.driverslicense}
            onChange={this.handleChange("driversLicense")}
            margin="normal"
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="experience-simple">Experience</InputLabel>
            <Select
              value={this.state.candidate.experience}
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

export default withStyles(styles)(ApplicationForm);
