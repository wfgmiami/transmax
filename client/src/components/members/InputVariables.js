import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validateInput } from "../public/validate";

import * as loadActions from "../../store/actions/load";

const styles = theme => ({
  root: {},
  textField: {
    [theme.breakpoints.up("md")]: {
      width: "5%"
    },
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "20%"
  }
});

class InputVariables extends React.Component {
  handleChange = key => ({ target: { value } }) => {
    this.props.setInputVariableValue({ [key]: value });
  };

  render() {
    const { classes, inputVariable } = this.props;
    console.log("this props ", this.props);

    return (
      <form>
        <TextField
          id="mpg"
          label="MPG"
          className={classes.textField}
          value={inputVariable.mpg}
          onChange={this.handleChange("mpg")}
          margin="normal"
        />
        <TextField
          id="dispatchFee"
          label="Dispatch"
          className={classes.textField}
          value={inputVariable.dispatchPercent}
          onChange={this.handleChange("dispatchPercent")}
          margin="normal"
        />
      </form>
    );
  }
}

function mapStateToProps({ load }) {
  return {
    inputVariable: load.inputVariable
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setInputVariableValue: loadActions.setInputVariableValue,
      setInputVariable: loadActions.setInputVariable
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(InputVariables)
  )
);
