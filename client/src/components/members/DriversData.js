import React, { Component } from "react";
import ReactTable from "react-table";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Input from '@material-ui/icons/Input';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { Datatable } from "./Datatable";
import { driverConfig } from "../../configs/driverConfig";
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

class DriversData extends Component {
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
    this.props.getDriver();
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
    dollarSign = cellInfo.column.id === "earnings" ? "$" : "";

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.driver];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateDriver({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.driver[cellInfo.index][
              cellInfo.column.id
            ].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.driver];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateDriver({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.driver[cellInfo.index][
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
      this.props.updateDriver({
        data: [
          ...this.props.driver.slice(0, row.index),
          ...this.props.driver.slice(row.index + 1)
        ]
      });
    }
  }

  saveRow() {
    // console.log("DriversData.js saveRow this.props", this.props);
    this.props.saveDriver(this.props.driver);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...driverConfig);
    // console.log("DriversData.js addEmptyRow ", emptyRow);
    this.props.setDriver(emptyRow);
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const driverCount = data.length;
    let value;

    const total = data.reduce((memo, driver) => {
      // console.log("....info", driver,column.id, driver[column.id]);
      if (typeof driver[column.id] === "object") {
        value = driver[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = driver[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(driver[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "earnings") {
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "firstName") {
      return `Total Drivers: ${driverCount}`;
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
    // console.log("ShipmentsData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "First Name",
        Footer: this.calculateTotal,
        accessor: "firstName",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Hire Date",
        accessor: "hireDate",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "SSN",
        accessor: "ssn",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Drivers License",
        accessor: "driversLicense",
        show: true,
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
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Current Rate",
        accessor: "currentRate",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Earnings",
        Footer: this.calculateTotal,
        show: true,
        className: "columnBorder",
        accessor: "earnings",
        Cell: this.editTable
      },
      {
        Header: "Employed By",
        show: false,
        className: "columnBorder",
        accessor: "employedBy",
        Cell: this.editTable
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
          let editIcon = <Edit />;

          if (editableRow.length > 0) {
            editBtnColor = "primary";
            editIcon = <Input />;
          }

          return (
            <div>
              <IconButton
                variant="contained"
                color={editBtnColor}
                onClick={() => this.editRow(row)}
              >
                {editIcon}
              </IconButton>&nbsp;

              <IconButton
                variant="contained"
                color="secondary"
                onClick={() => this.deleteRow(row)}
              >
                <Delete/>
              </IconButton>&nbsp;

              <IconButton
                variant="contained"
                color="secondary"
                onClick={() => this.saveRow(row)}
              >
                <Save/>
              </IconButton>

            </div>
          );
        }
      }
    ];
  }

  render() {
    // const { data } = this.state;
    const { driver, classes } = this.props;

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
          data={driver}
          showPaginationBottom={true}
          columns={columns}
          defaultPageSize={10}
          style={
            {
              height: "700px"
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
    driver: company.driver
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDriver: companyActions.getDriver,
      setDriver: companyActions.setDriver,
      updateDriver: companyActions.updateDriver,
      saveDriver: companyActions.saveDriver
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(DriversData)
  )
);
