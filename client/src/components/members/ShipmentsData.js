import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { Datatable } from "./Datatable";
import { shipmentsConfig } from "../../configs/shipmentsConfig";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import AddSaveBtn from "./AddSaveBtn";
import axios from "axios";


import * as loadActions from "../../store/actions/load";

const copyOfDatable = [].concat(Datatable);

const styles = theme => ({
  root: {},
  toolbar: {
    background: "#7D818C"
  }
});

class ShipmentsData extends Component {
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
    this.props.getShipment();
  }

  getConfirmDoc(docLink) {
    // console.log("ShipmentsData docLink ", docLink);
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
        // console.log("ShipmentsData docLink ", {fileURL});
        window.open(fileURL);
      })
      .catch(error => console.log(error));
  }

  editTable(cellInfo) {
    // console.log(
    //   "cell info: ",
    //   cellInfo,
    //   "column.id",
    //   cellInfo.column.id,
    //   "cellInfo.row[cellInfo.column.id]: ",
    //   cellInfo.row[cellInfo.column.id]
    // );
    let dollarSign;
    const findEditableRow = this.state.editableRowIndex.find(
      row => row === cellInfo.index
    );
    dollarSign = cellInfo.column.id === "payment" ? "$" : "";

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.shipment];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateShipment({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.shipment[cellInfo.index][
              cellInfo.column.id
            ].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.shipment];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateShipment({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.shipment[cellInfo.index][
              cellInfo.column.id
            ].toLocaleString()
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
    this.props.updateShipment({
      data: [
        ...this.props.shipment.slice(0, row.index),
        ...this.props.shipment.slice(row.index + 1)
      ]
    });
  }

  saveRows() {
    console.log("ShipmentsData.js saveRows this.props", this.props);
    this.props.saveShipments(this.props.trip);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...shipmentsConfig);
    // console.log("TripsData.js addEmptyRow ", emptyRow);
    this.props.setShipment(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const shipmentsCount = data.length;
    let value;

    const total = data.reduce((memo, shipment) => {
      // console.log("....info", trip,column.id, trip[column.id]);

      if (typeof shipment[column.id] === "object") {
        value = shipment[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = shipment[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(shipment[column.id].replace(/,/g, ""));
        }

        memo += amount;
      }

      return memo;
    }, 0);

    if (dollarSign || column.id === "payment") {
      if (column.id === "dollarPerMile") {
        return (
          "$" + Number((total / shipmentsCount).toFixed(2)).toLocaleString()
        );
      }
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "bookDate") {
      return `Total Trips: ${shipmentsCount}`;
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
    console.log("ShipmentsData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Date",
        Footer: this.calculateTotal,
        accessor: "bookDate",
        show: true,
        className: "columnBorder",
        borderRight: "2px solid rgba(0, 0, 0, 0.6)!important",
        Cell: this.editTable
      },
      {
        Header: "Load",
        accessor: "loadNumber",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Broker",
        accessor: "brokerName",
        show: true,
        className: "columnBorder",
        minWidth: 160,
        Cell: this.editTable
      },
      {
        Header: "Pick Up",
        accessor: "pickUpCityState",
        show: true,
        className: "columnBorder",
        minWidth: 130,
        Cell: this.editTable
      },
      {
        Header: "Drop Off",
        accessor: "dropOffCityState",
        show: true,
        className: "columnBorder",
        minWidth: 130,
        Cell: this.editTable
      },
      {
        Header: "PickUp",
        accessor: "pickUpAddress",
        show: false,
        className: "columnBorder",
        minWidth: 240,
        Cell: this.editTable
      },
      {
        Header: "Destination",
        accessor: "dropOffAddress",
        show: false,
        className: "columnBorder",
        minWidth: 240,
        Cell: this.editTable
      },
      {
        Header: "Payment",
        Footer: this.calculateTotal,
        show: true,
        className: "columnBorder",
        accessor: "payment",
        Cell: this.editTable
      },
      {
        Header: "Miles",
        Footer: this.calculateTotal,
        accessor: "miles",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "$/Mile",
        Footer: this.calculateTotal,
        id: "dollarPerMile",
        show: true,
        className: "columnBorder",
        accessor: d => {
          let payment = d.payment;
          if (typeof d.payment === "string")
            payment = parseFloat(d.payment.replace(/,/g, ""));
          let dollarPerMile = Number(payment) / Number(d.miles);
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
        Header: "Commodity",
        accessor: "commodity",
        show: false,
        Cell: this.editTable
      },
      {
        Header: "Weight",
        accessor: "weight",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Trailer",
        accessor: "trailer",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Confirm Doc",
        accessor: "confirmFilePath",
        show: true,
        className: "columnBorder",
        minWidth: 80,
        Cell: ({ row }) => {
          // console.log('row',row,row.confirmFilePath)
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
        className: "columnBorder",
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
    const { shipment, classes } = this.props;

    // console.log("TripsData.js this.state ", this.state);

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
        </Toolbar>

        <ReactTable
          data={shipment}
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
    shipment: load.shipment
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getShipment: loadActions.getShipment,
      setShipment: loadActions.setShipment,
      updateShipment: loadActions.updateShipment,
      saveShipment: loadActions.saveShipment
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ShipmentsData)
  )
);
