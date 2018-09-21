import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { EarningsData } from "./Datatable";
import { earningsConfig } from "../../configs/earningsConfig";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import ActionBtn from "./ActionBtn";
import axios from "axios";

import * as companyActions from "../../store/actions/company";

const copyOfDatable = [].concat(EarningsData);

const styles = theme => ({
  root: {},
  toolbar: {
    background: "#7D818C"
  }
});

class Earnings extends Component {
  constructor() {
    super();
    this.state = {
      data: copyOfDatable,
      columns: [],
      editableRowIndex: []
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
    this.props.getEarnings();
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
    dollarSign = cellInfo.column.id === "payment" ? "$" : "";

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.earnings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateEarnings({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.earnings[cellInfo.index][
              cellInfo.column.id
            ].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.earnings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateEarnings({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.earnings[cellInfo.index][
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
    this.props.updateEarnings({
      data: [
        ...this.props.earnings.slice(0, row.index),
        ...this.props.earnings.slice(row.index + 1)
      ]
    });
  }

  saveRows() {
    // console.log("SarningssData.js saveRows this.props", this.props);
    this.props.saveEarnings(this.props.earnings);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...earningsConfig);
    // console.log("EarningsData.js addEmptyRow ", emptyRow);
    this.props.setEarnings(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const earningsCount = data.length;
    let value;

    const total = data.reduce((memo, earnings) => {
      // console.log("....info", earnings,column.id, earnings[column.id]);
      if (typeof earnings[column.id] === "object") {
        value = earnings[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = earnings[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(earnings[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "earnings") {
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "firstName") {
      return `Total Earnings: ${earningsCount}`;
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
    // console.log("EarningsData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Week",
        accessor: "weekNumber",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Week Dates",
        accessor: "weekRange",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Revenue",
        Footer: this.calculateTotal,
        accessor: "revenue",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Dispatch",
        Footer: this.calculateTotal,
        accessor: "dispatchFee",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Driver Pay",
        Footer: this.calculateTotal,
        accessor: "driverPay",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Miles Paid",
        Footer: this.calculateTotal,
        accessor: "milesPaid",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Fuel",
        Footer: this.calculateTotal,
        accessor: "fuelCost",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Toll",
        Footer: this.calculateTotal,
        accessor: "toll",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Lumper",
        Footer: this.calculateTotal,
        accessor: "lumper",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Detention",
        Footer: this.calculateTotal,
        accessor: "detention",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Detention Driver Pay",
        Footer: this.calculateTotal,
        accessor: "detentionDriverPay",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Late Fee",
        Footer: this.calculateTotal,
        accessor: "lateFee",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Road Maintenance",
        Footer: this.calculateTotal,
        accessor: "roadMaintenance",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Other Expenses",
        Footer: this.calculateTotal,
        accessor: "otherExpenses",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Total Expenses",
        Footer: this.calculateTotal,
        id: "totalExpenses",
        show: true,
        className: "columnBorder",
        accessor: d => {

          let totalExpenses =
            Number(d.fuelCost) +
            Number(d.driverPay) +
            Number(d.dispatchFee) +
            Number(d.lumper) +
            Number(d.detention) +
            Number(d.detentionDriverPay) +
            Number(d.lateFee) +
            Number(d.toll) +
            Number(d.roadMaintenance);

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
        className: "columnBorder",
        accessor: d => {
          let revenue = d.revenue;
          if (typeof d.revenue === "string")
            revenue = parseFloat(revenue.replace(/,/g, ""));

          let totalExpenses =
              Number(d.fuelCost) +
              Number(d.driverPay) +
              Number(d.dispatchFee) +
              Number(d.lumper) +
              Number(d.detention) +
              Number(d.detentionDriverPay) +
              Number(d.lateFee) +
              Number(d.toll) +
              Number(d.roadMaintenance) +
              Number(d.otherExpense);

          let profit = revenue - totalExpenses;

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
        Header: "Op Margin",
        Footer: this.calculateTotal,
        id: "margin",
        show: true,
        className: "columnBorder",
        accessor: d => {
          let revenue = d.revenue;
          if (typeof d.revenue === "string")
            revenue = parseFloat(revenue.replace(/,/g, ""));

          let totalExpenses =
            Number(d.fuelCost) +
            Number(d.driverPay) +
            Number(d.dispatchFee) +
            Number(d.lumper) +
            Number(d.detention) +
            Number(d.detentionDriverPay) +
            Number(d.lateFee) +
            Number(d.toll) +
            Number(d.roadMaintenance) +
            Number(d.otherExpense);

          let profit = revenue - totalExpenses;

          profit = isNaN(profit) ? null : profit;
          let margin = (profit / revenue) * 100;
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: Number(margin).toFixed(2) + "%"
              }}
            />
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
    const { earnings, classes } = this.props;

    // console.log("Earnings.js this.props ", this.props);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <SideMenu />
          <ActionBtn saveRows={this.saveRows} addEmptyRow={this.addEmptyRow} />
          &nbsp;
          <ColumnChooser
            columns={columns}
            onColumnUpdate={this.onColumnUpdate}
          />
        </Toolbar>

        <ReactTable
          data={earnings}
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

function mapStateToProps({ company }) {
  return {
    earnings: company.earnings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getEarnings: companyActions.getEarnings,
      setEarnings: companyActions.setEarnings,
      updateEarnings: companyActions.updateEarnings,
      saveEarnings: companyActions.saveEarnings
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Earnings)
  )
);
