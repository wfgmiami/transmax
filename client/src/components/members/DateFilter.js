import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import AlarmIcon from "@material-ui/icons/Reorder";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DatePicker from "./DatePicker";

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

class DateFilter extends React.Component {
  state = {
    open: false,
    originalInputs: {}
  };

  componentDidMount() {
    this.setState({ originalInputs: this.props.dateRange });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = key => ({ target: { value } }) => {
    this.props.setDateRangeValue({ [key]: value });
  };

  handleCloseCancel = () => {
    this.setState({ open: false });
    this.props.setInputVariableValue(this.state.originalInputs);
  };

  handleCloseOK = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

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
          DATE RANGE
          <AlarmIcon className={classes.icon} />
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogContent>
            <form className={classes.container}>
              <DatePicker />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseOK} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DateFilter.propTypes = {
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
    )(DateFilter)
  )
);
