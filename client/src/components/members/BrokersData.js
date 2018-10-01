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
import { brokerConfig } from "../../configs/brokerConfig";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import ActionBtn from "./ActionBtn";
import axios from "axios";

import * as companyActions from "../../store/actions/company";

const copyOfDatable = [].concat(Datatable);

const styles = theme => ({
  root: {},
  toolbar: {
    background: "#7D818C"
  }
});

class BrokersData extends Component {
  constructor() {
    super();
    this.state = {
      data: copyOfDatable,
      columns: [],
      editableRowIndex: []
    };

    this.editTable = this.editTable.bind(this);
    this.editRow = this.editRow.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addEmptyRow = this.addEmptyRow.bind(this);
    this.onColumnUpdate = this.onColumnUpdate.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    this.props.getBroker();
  }

  getConfirmDoc(docLink) {
    // console.log("CompaniesData docLink ", docLink);
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
    dollarSign = cellInfo.column.id === "totalBooked" ? "$" : "";

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.broker];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateBroker({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.broker[cellInfo.index][
              cellInfo.column.id
            ].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.broker];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateBroker({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.broker[cellInfo.index][
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
    let result = window.confirm("Do you want to delete this row?")
    if(result){
      this.props.updateBroker({
        data: [
          ...this.props.broker.slice(0, row.index),
          ...this.props.broker.slice(row.index + 1)
        ]
      });
    }
  }

  saveRow() {
    // console.log("CompaniesData.js saveRow this.props", this.props);
    this.props.saveBroker(this.props.broker);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...brokerConfig);
    // console.log("CompaniesData.js addEmptyRow ", emptyRow);
    this.props.setBroker(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const brokersCount = data.length;
    let value;

    const total = data.reduce((memo, broker) => {
      // console.log("....info", broker,column.id, broker[column.id]);
      if (typeof broker[column.id] === "object") {
        value = broker[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = broker[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(broker[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "totalBooked") {
      if (column.id === "avgDollarPerMile") {
        return "$" + Number((total / brokersCount).toFixed(2)).toLocaleString();
      }
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "brokerId") {
      return `Brokers: ${brokersCount}`;
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
    // console.log("BrokersData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Broker Id",
        Footer: this.calculateTotal,
        accessor: "brokerId",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Name",
        accessor: "name",
        show: true,
        minWidth: 170,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Address",
        accessor: "address",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Phone",
        accessor: "phone",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Email",
        accessor: "email",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Booked Loads",
        Footer: this.calculateTotal,
        accessor: "bookedLoads",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Total Payment",
        Footer: this.calculateTotal,
        accessor: "totalPayment",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Total Loaded Miles",
        Footer: this.calculateTotal,
        accessor: "totalLoadedMiles",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "$/Mile",
        Footer: this.calculateTotal,
        id: "avgDollarPerMile",
        show: true,
        className: "columnBorder",
        accessor: d => {
          let amount = d.totalBooked;
          if (typeof d.totalBooked === "string")
            amount = parseFloat(d.totalBooked.replace(/,/g, ""));
          let dollarPerMile = Number(amount) / Number(d.totalMiles);
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
              </Button>&nbsp;
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.saveRow(row)}
              >
                Save
              </Button>
            </div>
          );
        }
      }
    ];
  }

  render() {
    // const { data } = this.state;
    const { broker, classes } = this.props;

    // console.log("TripsData.js this.state ", this.state);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <SideMenu />
          <ActionBtn saveRow={this.saveRow} addEmptyRow={this.addEmptyRow} />
          &nbsp;
          <ColumnChooser
            columns={columns}
            onColumnUpdate={this.onColumnUpdate}
          />
        </Toolbar>

        <ReactTable
          data={broker}
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
    broker: company.broker
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBroker: companyActions.getBroker,
      setBroker: companyActions.setBroker,
      updateBroker: companyActions.updateBroker,
      saveBroker: companyActions.saveBroker
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(BrokersData)
  )
);
