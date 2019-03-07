import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Popover, { PopoverAnimationVertical } from "@material-ui/core/Popover";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { withStyles } from "@material-ui/core/styles";
//import 'font-awesome/css/font-awesome.min.css';

const Styles = (theme) => ({
  root: {
    display: "inline-block"
  },
  boxElementPad: {
    padding: "16px 24px 16px 24px",
    height: "auto"
  },

  formGroup: {
    marginTop: "8px"
  },
  formControl: {},
  checkbox: {
    width: "12px",
    height: "12px"
  },
  buttonWrap: {
    display: "inline-block",
  },
  button: {
    margin: theme.spacing.unit
  },
  // checkboxColor: {
  //     "&$checked": {
  //         color: "#027cb5",
  //     },
  // },
  checked: {},
  label: {
    fontSize: "15px",
    marginLeft: "5px",
    color: "green",
    fontFamily: "seriff"
  }
});

class ColumnChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      chosenColumns: [],

    };
  }

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  handleColChange = index => {
    this.props.onColumnUpdate(index);
  };

  selectColumns = ( button ) => {

    let selectedColumns = this.props.columns.map( col => Object.assign({}, col) );
    let chosenColumns = [];
    let chosenColumnsIndexes = [];

    if ( button === "inputs" ) {
      chosenColumns = selectedColumns.map( ( col, idx ) => {
        if ( typeof col.accessor === 'function' ) {
          switch( col.id ){
            case 'mileage':
            case 'dollarPerMile':
            case 'fuelCost':
            case 'driverPay':
            case 'totalExpenses':
            case 'profit':
              col.show = true;
              chosenColumnsIndexes.push( idx );
              break;
            default:
              return col;
          }
          return col;
        }

        switch( col.accessor ){
          case 'pickupDate':
          case 'truckId':
          case 'driverName':
          case 'driverId':
          case 'truck.company.name':
          case 'loadNumber':
          case 'brokerName':
          case 'brokerId':
          case 'shipper':
          case 'consignee':
          case 'pickUpCityState':
          case 'dropOffCityState':
          case 'pickUpAddress':
          case 'dropOffAddress':
          case 'payment':
          case 'loadedMiles':
          case 'emptyMiles':
          case 'commodity':
          case 'weight':
          case 'trailer':
          case 'confirmFilePath':
          case 'edit':
            col.show = true;
            chosenColumnsIndexes.push( idx );
            break;
          default:
            col.show = false;
            return col;
        }
        return col;
      })
      this.handleColChange( chosenColumnsIndexes );
      this.setState( { chosenColumns })
      // console.log(selectedColumns)
    } else if ( button === "all") {

      chosenColumns = selectedColumns.map( ( col, idx ) => {
        col.show = true;
        chosenColumnsIndexes.push( idx );
        return col;
      })

      this.handleColChange( chosenColumnsIndexes );
      this.setState( { chosenColumns })

    } else if ( button === "default") {

      chosenColumns = selectedColumns.map( ( col, idx ) => {

        if ( typeof col.accessor === 'function' ) {
          switch( col.id ){
            case 'mileage':
            case 'dollarPerMile':
            case 'fuelCost':
            case 'driverPay':
            case 'totalExpenses':
            case 'profit':
              col.show = true;
              chosenColumnsIndexes.push( idx );
              break;
            default:
              col.show = false;
              return col;
          }
          return col;
        }

        switch( col.accessor ){
          case 'pickupDate':
          case 'brokerName':
          case 'pickUpCityState':
          case 'dropOffCityState':
          case 'payment':
          case 'loadedMiles':
          case 'emptyMiles':
          case 'confirmFilePath':
          case 'edit':
            col.show = true;
            chosenColumnsIndexes.push( idx );
            break;
          default:
            col.show = false;
            return col;
        }
        return col;
      })
      this.handleColChange( chosenColumnsIndexes );
      this.setState( { chosenColumns })
    }
  }

  render() {
    let { classes, columns } = this.props;
    const stateColumns = this.state.chosenColumns.length;

    // const cols = stateColumns > 0 ?
    //   this.state.chosenColumns : columns.map( col => Object.assign({}, col) );
    const cols =  columns.map( col => Object.assign({}, col) );

    cols.forEach( column => {

      switch(column.Header){
        case "Date":
          column.Header = "Date (req)";
          break;
        case "Truck Id":
          column.Header = "Truck Id (req)";
          break;
        case "Driver":
          column.Header = "Driver (req)";
          break;
        case "Driver Id":
          column.Header = "Driver Id (req)";
          break;
        case "Load":
          column.Header = "Load (req)";
          break;
        case "Broker":
          column.Header = "Broker (req)";
          break;
        case "Broker Id":
          column.Header = "Broker Id (req)";
          break;
        case "Pick Up":
          column.Header = "Pick Up (req)";
          break;
        case "Drop Off":
          column.Header = "Drop Off (req)";
          break;
        case "Origin":
          column.Header = "Origin (req)";
          break;
        case "Destination":
          column.Header = "Destination (req)";
          break;
        case "Payment":
          column.Header = "Payment (req)";
          break;
        case "Loaded Miles":
          column.Header = "Loaded Miles (req)";
          break;
        case "Empty Miles":
          column.Header = "Empty Miles (req)";
          break;
        default:
          column.Header = column.Header;
      }
    })


    return (
      <div className={classes.root}>
        <Button
          size="small"
          variant="outlined"
          onClick={this.handleClick}
          style={{
            backgroundColor: "white",
            height: "32px",
            padding: "2px",
            marginLeft: "5px"
          }}
        >
          Columns &nbsp;
          <ViewColumn />
        </Button>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          onClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <FormControl component={"fieldset"} className={classes.boxElementPad}>
            <div className={classes.buttonWrap}>
              <Button
                onClick={() => this.selectColumns("inputs")}
                variant="outlined"
                size="small"
                className={classes.Button}>Inputs
              </Button>
              <Button
                onClick={() => this.selectColumns("all")}
                variant="outlined"
                size="small"
                className={classes.Button}>All
              </Button>
              <Button
                onClick={() => this.selectColumns("default")}
                variant="outlined"
                size="small"
                className={classes.Button}>Default
              </Button>
            </div>
            <FormGroup className={classes.formGroup}>
              {cols.map((column, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    classes={{
                      root: classes.formControl,
                      label: classes.label
                    }}
                    control={
                      <Checkbox
                        className={classes.checkbox}
                        onChange={() => {
                          console.log('click checkbox')
                          this.handleColChange(index)}}
                        checked={column.show}
                        value={column.id}
                      />
                    }
                    label={column.Header}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Popover>
      </div>
    );
  }
}

export default withStyles(Styles)(ColumnChooser);
