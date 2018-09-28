import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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

class VariableCostInputs extends React.Component {
  state = {
    open: false,
    originalInputs: {}
  };

  componentDidMount() {
    this.setState({ originalInputs: this.props.costInputs });
  }

  handleChange = key => ({ target: { value } }) => {
    this.props.setInputVariableValue({ [key]: value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseCancel = () => {
    this.setState({ open: false });
    this.props.setInputVariableValue(this.state.originalInputs);
  };

  handleCloseOK = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, costInputs } = this.props;

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
          <DialogTitle>VARIABLE COST INPUTS</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
            <TextField
                id="driverpayDollarPerMile"
                label="Driver's Pay"
                className={classes.textField}
                value={costInputs.driverpayDollarPerMile}
                onChange={this.handleChange("driverpayDollarPerMile")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="dieselPrice"
                label="Diesel Price"
                className={classes.textField}
                value={costInputs.dieselppg}
                onChange={this.handleChange("dieselppg")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="mpg"
                label="MPG"
                className={classes.textField}
                value={costInputs.mpg}
                onChange={this.handleChange("mpg")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="defPrice"
                label="DEF Price"
                className={classes.textField}
                value={costInputs.defppg}
                onChange={this.handleChange("defppg")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="defConsumptionRate"
                label="DEF % Diesel Burned"
                className={classes.textField}
                value={costInputs.defConsumptionRate}
                onChange={this.handleChange("defConsumptionRate")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="oilChangeMiles"
                label="Oil Change Miles"
                className={classes.textField}
                value={costInputs.oilChangeMiles}
                onChange={this.handleChange("oilChangeMiles")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="oilChangeCost"
                label="Oil Change Cost"
                className={classes.textField}
                value={costInputs.oilChangeCost}
                onChange={this.handleChange("oilChangeCost")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="truckTiresChangeMiles"
                label="Truck Tires Change Miles"
                className={classes.textField}
                value={costInputs.truckTiresChangeMiles}
                onChange={this.handleChange("truckTiresChangeMiles")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="truckTiresChangeCost"
                label="Truck Tires Change Cost"
                className={classes.textField}
                value={costInputs.truckTiresChangeCost}
                onChange={this.handleChange("truckTiresChangeCost")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="trailerTiresChangeMiles"
                label="Trailer Tires Change Miles"
                className={classes.textField}
                value={costInputs.trailerTiresChangeMiles}
                onChange={this.handleChange("trailerTiresChangeMiles")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="trailerTiresChangeCost"
                label="Trailer Tires Change Cost"
                className={classes.textField}
                value={costInputs.trailerTiresChangeCost}
                onChange={this.handleChange("trailerTiresChangeCost")}
                margin="normal"
              />
              &nbsp;
              <TextField
                id="dispatchFee"
                label="Dispatch"
                className={classes.textField}
                value={costInputs.dispatchPercent}
                onChange={this.handleChange("dispatchPercent")}
                margin="normal"
              />
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

VariableCostInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ load }) {
  return {
    costInputs: load.costInputs
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
    )(VariableCostInputs)
  )
);
