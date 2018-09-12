import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AlarmIcon from "@material-ui/icons/Reorder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "react-table/react-table.css";
import { Datatable } from "./Datatable";
import { tripsConfig } from "../../configs/tripsConfig";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import Inputs from "./Inputs";
import AddSaveBtn from "./AddSaveBtn";

import * as loadActions from "../../store/actions/load";

const copyOfDatable = [].concat(Datatable);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  toolbar: {
    background: "#7D818C"
  }
});

class TripsData extends Component {
  constructor() {
    super();
    this.state = {
      data: copyOfDatable,
      columns: [],
      editableRowIndex: [],
      driverPay: 0.55
    };

    this.editTable = this.editTable.bind(this);
    this.editRow = this.editRow.bind(this);
    this.saveRows = this.saveRows.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addEmptyRow = this.addEmptyRow.bind(this);
    this.onColumnUpdate = this.onColumnUpdate.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    this.props.getTrip();
  }

  getConfirmDoc(docLink) {
    // console.log("TripsData docLink ", docLink);
    axios
      .post(
        "/api/pdf",
        { docLink },
        {
          method: "POST",
          responseType: "blob"
        }
      )
      .then(response => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch(error => console.log(error));
  }

  editTable(cellInfo) {
    // console.log(
    //   "cell info........",
    //   cellInfo,
    //   "id: ",
    //   cellInfo.row[cellInfo.column.id]
    // );
    let dollarSign;
    const findEditableRow = this.state.editableRowIndex.find(
      row => row === cellInfo.index
    );

    switch (cellInfo.column.id) {
      case "amount":
      case "dieselPrice":
      case "lumper":
      case "detention":
      case "detentionDriverPay":
      case "lateFee":
      case "toll":
      case "roadMaintenance":
      case "otherExpenses":
        dollarSign = "$";
        break;
      default:
        dollarSign = "";
    }

    // if (cellInfo.column.id === "amount") {
    //   dollarSign = "$";
    // }

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.trip];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateTrip({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.trip[cellInfo.index][cellInfo.column.id].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.trip];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateTrip({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.trip[cellInfo.index][cellInfo.column.id].toLocaleString()
        }}
      />
    );
  }

  editRow(row) {
    // console.log("TripsData.js editRow ", row, "row index: ", row.index);
    const alreadyEditable = this.state.editableRowIndex.find(
      editableRow => editableRow === row.index
    );
    if (alreadyEditable || alreadyEditable === 0) {
      this.setState({
        editableRowIndex: this.state.editableRowIndex.filter(
          editableRow => editableRow !== row.index
        )
      });
    } else {
      this.setState({
        editableRowIndex: [...this.state.editableRowIndex, row.index]
      });
    }
  }

  deleteRow(row) {
    this.props.updateTrip({
      data: [
        ...this.props.trip.slice(0, row.index),
        ...this.props.trip.slice(row.index + 1)
      ]
    });
  }

  saveRows() {
    console.log("TripsData.js saveRows this.props", this.props);
    this.props.saveTrips(this.props.trip);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...tripsConfig);
    // console.log("TripsData.js addEmptyRow ", emptyRow);
    this.props.setTrip(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("TripsData calculateTotal data", data, "column", column);
    const tripsCount = data.length;
    let dollarSign = false;
    let value;

    const total = data.reduce((memo, trip) => {
      // console.log("....info", trip,column.id, trip[column.id]);

      if (typeof trip[column.id] === "object") {
        value = trip[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = trip[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(trip[column.id].replace(/,/g, ""));
        }

        memo += amount;
      }

      return memo;
    }, 0);

    if (dollarSign || column.id === "amount" || column.id === "toll") {
      if (column.id === "dollarPerMile") {
        return "$" + Number((total / tripsCount).toFixed(2)).toLocaleString();
      }
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "dieselPrice") {
      return "$" + Number((total / tripsCount).toFixed(2)).toLocaleString();
    } else if (column.id === "bookDate") {
      return `Total Trips: ${tripsCount}`;
    }

    return Number(Number(total).toFixed(0)).toLocaleString();
  }

  onColumnUpdate(index) {
    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    // console.log("onColumnUpdate index ", index, "...", columns[index]);
    this.setState(
      prevState => {
        const columns1 = [];
        columns1.push(...columns);
        columns1[index].show = !columns1[index].show;
        if (columns1[index].columns) {
          columns1[index].columns.forEach(item => {
            item.show = !item.show;
          });
        }

        return {
          columns: columns1
        };
      },
      () => {
        // console.log('onColumnUpdate columns: ', this.state.columns)
      }
    );
  }

  createColumns() {
    console.log("TripsData.js createColumns this.props: ", this.props);
    const { mpg, dispatchPercent } = this.props;

    return [
      {
        Header: "Date",
        Footer: this.calculateTotal,
        accessor: "bookDate",
        show: true,
        Cell: this.editTable
      },
      {
        Header: "Truck Number",
        accessor: "truckNumber",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Driver",
        accessor: "driverName",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Load",
        accessor: "loadNumber",
        show: true,
        Cell: this.editTable
      },
      {
        Header: "Broker",
        accessor: "brokerName",
        show: true,
        Cell: this.editTable
      },
      {
        Header: "Amount",
        accessor: "amount",
        show: true,
        Footer: this.calculateTotal,
        Cell: this.editTable
      },
      {
        Header: "Loaded Miles",
        accessor: "loadedMiles",
        Footer: this.calculateTotal,
        show: true,
        Cell: this.editTable
      },
      {
        Header: "Empty Miles",
        Footer: this.calculateTotal,
        accessor: "emptyMiles",
        show: true,
        Cell: this.editTable
      },
      {
        Header: "Mileage",
        Footer: this.calculateTotal,
        id: "mileage",
        show: true,
        accessor: d => {
          const totalMiles = Number(d.loadedMiles) + Number(d.emptyMiles);

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: totalMiles
              }}
            />
          );
        }
      },
      {
        Header: "$/Mile",
        Footer: this.calculateTotal,
        id: "dollarPerMile",
        show: true,
        accessor: d => {
          let amount = d.amount;
          if (typeof d.amount === "string")
            amount = parseFloat(d.amount.replace(/,/g, ""));
          let dollarPerMile =
            Number(amount) / (Number(d.loadedMiles) + Number(d.emptyMiles));
          dollarPerMile = isNaN(dollarPerMile) ? null : dollarPerMile;
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(dollarPerMile).toFixed(2)
              }}
            />
          );
        }
      },

      {
        Header: "Diesel Price",
        Footer: this.calculateTotal,
        show: true,
        accessor: "dieselPrice",
        Cell: this.editTable
      },
      {
        Header: "Fuel Cost",
        Footer: this.calculateTotal,
        id: "fuelCost",
        show: true,
        accessor: d => {
          let fuelCost =
            ((Number(d.loadedMiles) + Number(d.emptyMiles)) / Number(mpg)) *
            Number(d.dieselPrice);

          fuelCost = isNaN(fuelCost) ? null : fuelCost;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(fuelCost).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Driver Pay",
        Footer: this.calculateTotal,
        id: "driverPay",
        show: true,
        accessor: d => {
          let driverPay =
            (Number(d.loadedMiles) + Number(d.emptyMiles)) *
            this.state.driverPay;
          driverPay = isNaN(driverPay) ? null : driverPay;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(driverPay).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Dispatch Fee",
        Footer: this.calculateTotal,
        id: "dispatchFee",
        show: true,
        accessor: d => {
          let amount = d.amount;
          if (typeof d.amount === "string")
            amount = parseFloat(d.amount.replace(/,/g, ""));

          let dispatchFee = Number(amount) * Number(dispatchPercent);

          dispatchFee = isNaN(dispatchFee) ? null : dispatchFee;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(dispatchFee).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Lumper",
        Footer: this.calculateTotal,
        accessor: "lumper",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Detention",
        Footer: this.calculateTotal,
        accessor: "detention",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Detention Driver Pay",
        Footer: this.calculateTotal,
        accessor: "detentionDriverPay",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Late Fee",
        Footer: this.calculateTotal,
        accessor: "lateFee",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Toll",
        Footer: this.calculateTotal,
        accessor: "toll",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Road Maintenance",
        Footer: this.calculateTotal,
        accessor: "roadMaintenance",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Other Expenses",
        Footer: this.calculateTotal,
        accessor: "otherExpenses",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Total Expenses",
        Footer: this.calculateTotal,
        id: "totalExpenses",
        show: true,
        accessor: d => {
          let amount = d.amount;
          if (typeof d.amount === "string")
            amount = parseFloat(d.amount.replace(/,/g, ""));

          let totalExpenses =
            ((Number(d.loadedMiles) + Number(d.emptyMiles)) / Number(mpg)) *
              Number(d.dieselPrice) +
            (Number(d.loadedMiles) + Number(d.emptyMiles)) *
              this.state.driverPay +
            Number(amount) * Number(dispatchPercent) +
            Number(d.lumper) +
            Number(d.detention) +
            Number(d.detentionDriverPay) +
            Number(d.lateFee) +
            Number(d.toll) +
            Number(d.roadMaintenance) +
            Number(d.otherExpenses);

          totalExpenses = isNaN(totalExpenses) ? null : totalExpenses;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(totalExpenses).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Profit",
        Footer: this.calculateTotal,
        id: "profit",
        show: true,
        accessor: d => {
          let amount = d.amount;
          if (typeof d.amount === "string")
            amount = parseFloat(d.amount.replace(/,/g, ""));

          let profit =
            amount -
            (((Number(d.loadedMiles) + Number(d.emptyMiles)) / Number(mpg)) *
              Number(d.dieselPrice) +
              (Number(d.loadedMiles) + Number(d.emptyMiles)) *
                this.state.driverPay +
              Number(amount) * Number(dispatchPercent) +
              Number(d.lumper) +
              Number(d.detention) +
              Number(d.detentionDriverPay) +
              Number(d.lateFee) +
              Number(d.toll) +
              Number(d.roadMaintenance) +
              Number(d.otherExpenses));

          profit = isNaN(profit) ? null : profit;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(profit).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Confirm Doc",
        accessor: "confirmFilePath",
        show: true,
        Cell: ({ row }) => {
          console.log("row", row, row.confirmFilePath);
          return (
            <a
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => this.getConfirmDoc(row.confirmFilePath)}
            >
              pdf
            </a>
          );
        }
      },
      {
        Header: "Edit",
        id: "edit",
        accessor: "edit",
        minWidth: 200,
        show: true,
        Cell: row => {
          const editableRow = this.state.editableRowIndex.filter(
            editableRow => editableRow === row.index
          );
          let editBtnColor = "secondary";
          let editBtnName = "Edit";

          if (editableRow.length > 0) {
            editBtnName = "Editing...";
            editBtnColor = "primary";
          }

          return (
            <div>
              <Button
                variant="contained"
                color={editBtnColor}
                onClick={() => this.editRow(row)}
              >
                {editBtnName}
              </Button>&nbsp;
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.deleteRow(row)}
              >
                Delete
              </Button>
            </div>
          );
        }
      }
    ];
  }

  render() {
    // const { data } = this.state;
    const { trip, classes } = this.props;

    // console.log("TripsData.js this.props ", this.props);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <SideMenu />
          <AddSaveBtn saveRows={this.saveRows} addEmptyRow={this.addEmptyRow} />
          &nbsp;
          <ColumnChooser
            columns={columns}
            onColumnUpdate={this.onColumnUpdate}
          />
          <div>&nbsp;</div>
          <Inputs />
        </Toolbar>

        <ReactTable
          data={trip}
          showPaginationBottom={true}
          columns={columns}
          defaultPageSize={10}
          style={
            {
              // height: "400px"
            }
          }
          className="-striped -highlight"
        />
      </div>
    );
  }
}

function mapStateToProps({ load }) {
  return {
    trip: load.trip,
    mpg: load.inputVariable.mpg,
    dispatchPercent: load.inputVariable.dispatchPercent
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTrip: loadActions.getTrip,
      setTrip: loadActions.setTrip,
      updateTrip: loadActions.updateTrip,
      saveTrips: loadActions.saveTrips
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TripsData)
  )
);
