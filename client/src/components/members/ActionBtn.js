import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
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

class AddSaveBtn extends React.Component {
  state = {
    open: false
  };

  handleAddEmptyRow = () => {
    this.props.addEmptyRow();
    this.handleClose();
  };

  // handleSaveRows = () => {
  //   this.props.saveRows();
  //   this.handleClose();
  // };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
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
          ACTION
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
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleAddEmptyRow}
              >
                Add Row
              </Button>&nbsp;
              {/* <Button
                variant="contained"
                color="primary"
                onClick={this.handleSaveRows}
              >
                Save
              </Button> */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddSaveBtn.propTypes = {
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
      // setInputVariable: loadActions.setInputVariable
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(AddSaveBtn)
  )
);
