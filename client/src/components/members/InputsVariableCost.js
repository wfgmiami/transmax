import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Inputs from "@material-ui/icons/Input";
import VariableCost from './VariableCost';

import * as companyActions from "../../store/actions/company";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  varCostSection:{
    flexBasis: "50%"
  }
});

class InputsVariableCost extends React.Component {
  state = {
    open: false,
    originalInputs: {},
  };

  componentDidMount() {
    // this.props.getInputVariable()
    this.setState({ originalInputs: this.props.inputsVariableCost })
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
    // this.props.updateVariableCost(this.props.inputsVariableCost);
    this.props.saveInputVariable(this.props.inputsVariableCost);
    this.props.saveVariableCost(this.props.inputsVariableCost);
  };

  render() {
    const { classes, inputsVariableCost } = this.props;
    // console.log('this props', this.props)

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
          INPUTS &nbsp;
          <Inputs />
        </Button>

        <div>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div className={classes.container}>
            <div className={classes.varCostSection}>
            <DialogTitle>INPUTS</DialogTitle>
            <DialogContent >
              <form className={classes.container}>
                <TextField
                  id="driverpayDollarPerMile"
                  label="Driver's Pay"
                  className={classes.textField}
                  value={inputsVariableCost.driverpayDollarPerMile}
                  onChange={this.handleChange("driverpayDollarPerMile")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="dieselPrice"
                  label="Diesel Price"
                  className={classes.textField}
                  value={inputsVariableCost.dieselppg}
                  onChange={this.handleChange("dieselppg")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="mpg"
                  label="MPG"
                  className={classes.textField}
                  value={inputsVariableCost.mpg}
                  onChange={this.handleChange("mpg")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="defPrice"
                  label="DEF Price"
                  className={classes.textField}
                  value={inputsVariableCost.defppg}
                  onChange={this.handleChange("defppg")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="defConsumptionRate"
                  label="DEF % Diesel Burned"
                  className={classes.textField}
                  value={inputsVariableCost.defConsumptionRate}
                  onChange={this.handleChange("defConsumptionRate")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="oilChangeMiles"
                  label="Oil Change Miles"
                  className={classes.textField}
                  value={inputsVariableCost.oilChangeMiles}
                  onChange={this.handleChange("oilChangeMiles")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="oilChangeCost"
                  label="Oil Change Cost"
                  className={classes.textField}
                  value={inputsVariableCost.oilChangeCost}
                  onChange={this.handleChange("oilChangeCost")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="truckTiresChangeMiles"
                  label="Truck Tires Change Miles"
                  className={classes.textField}
                  value={inputsVariableCost.truckTiresChangeMiles}
                  onChange={this.handleChange("truckTiresChangeMiles")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="truckTiresChangeCost"
                  label="Truck Tires Change Cost"
                  className={classes.textField}
                  value={inputsVariableCost.truckTiresChangeCost}
                  onChange={this.handleChange("truckTiresChangeCost")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="trailerTiresChangeMiles"
                  label="Trailer Tires Change Miles"
                  className={classes.textField}
                  value={inputsVariableCost.trailerTiresChangeMiles}
                  onChange={this.handleChange("trailerTiresChangeMiles")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="trailerTiresChangeCost"
                  label="Trailer Tires Change Cost"
                  className={classes.textField}
                  value={inputsVariableCost.trailerTiresChangeCost}
                  onChange={this.handleChange("trailerTiresChangeCost")}
                  margin="normal"
                />
                &nbsp;
                <TextField
                  id="dispatchFee"
                  label="Dispatch"
                  className={classes.textField}
                  value={inputsVariableCost.dispatchPercent}
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
            </div>

            <div className={classes.varCostSection}>
            <DialogTitle>VARIABLE COST</DialogTitle>
            <DialogContent >
              <VariableCost />
            </DialogContent>
            </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

InputsVariableCost.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ company }) {
  return {
    inputsVariableCost: company.inputsVariableCost,
    variableCost: company.variableCost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getInputVariable: companyActions.getInputVariable,
      setInputVariableValue: companyActions.setInputVariableValue,
      saveInputVariable: companyActions.saveInputVariable,
      updateVariableCost: companyActions.updateVariableCost,
      saveVariableCost: companyActions.saveVariableCost
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(InputsVariableCost)
  )
);
