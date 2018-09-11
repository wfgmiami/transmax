import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import AlarmIcon from "@material-ui/icons/Reorder";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as loadActions from "../../store/actions/load";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class Inputs extends React.Component {
  state = {
    open: false
  };

  handleChange = key => ({ target: { value } }) => {
    this.props.setInputVariableValue({ [key]: value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, inputVariable } = this.props;

    return (
      <div>
        <Button
          size="small"
          variant="outlined"
          onClick={this.handleClickOpen}
          style={{
            backgroundColor: "white",
            height: "32px",
            padding: "2px",
            marginLeft: "5px"
          }}
        >
          INPUTS
          <AlarmIcon className={classes.icon} />
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>TRIP INPUTS</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired
};

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
    )(Inputs)
  )
);
