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

export const popoverStyles = {
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
};

class ColumnChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
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

  render() {
    let { classes, columns } = this.props;
    // console.log("columnChooser this props: ", this.props);
    const cols = columns.map( col => Object.assign({}, col) );

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
                        onChange={() => this.handleColChange(index)}
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

export default withStyles(popoverStyles)(ColumnChooser);
