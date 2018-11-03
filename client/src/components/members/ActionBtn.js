import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
// import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircle from '@material-ui/icons/AddCircle';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as companyActions from "../../store/actions/company";

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

    return (
      <div>
        <Button
          size="small"
          variant="outlined"
          onClick={this.handleAddEmptyRow}
          style={{
            backgroundColor: "white",
            height: "32px",
            padding: "2px",
            marginLeft: "5px"
          }}
        >
          Add Row &nbsp;
          <AddCircle />
        </Button>
      </div>
    );
  }
}

AddSaveBtn.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ company }) {
  return {
    inputVariable: company.inputVariable
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setInputVariableValue: companyActions.setInputVariableValue,
      // setInputVariable: freightActions.setInputVariable
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
