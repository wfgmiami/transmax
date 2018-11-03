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
import { truckConfig } from "../../configs/truckConfig";
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

class TrucksData extends Component {
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
    this.props.getTruck();
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
    //   "cellInfo.column.id: ",
    //   cellInfo.column.id,
    //   'cellInfo.row[cellInfo.column.id]:',
    //   cellInfo.row[cellInfo.column.id]
    // );
    let dollarSign;
    let fieldValue;

    const findEditableRow = this.state.editableRowIndex.find(
      row => row === cellInfo.index
    );
    dollarSign = cellInfo.column.id === "purchasePrice" ? "$" : "";

    if( cellInfo.column.id === 'company.name'){
      // console.log('field: ', this.props.truck[cellInfo.index])
      fieldValue = this.props.truck[cellInfo.index][
       'company'] ? this.props.truck[cellInfo.index][
        'company'].name : '';

    } else {
      fieldValue = this.props.truck[cellInfo.index][
        cellInfo.column.id
      ]
    }

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.truck];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateTruck({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            fieldValue.toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.truck];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateTruck({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            fieldValue.toLocaleString()
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
      this.props.updateTruck({
        data: [
          ...this.props.truck.slice(0, row.index),
          ...this.props.truck.slice(row.index + 1)
        ]
      });
    }
  }

  saveRow() {
    // console.log("TrucksData.js saveRow this.props", this.props);
    this.props.saveTruck(this.props.truck);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...truckConfig);
    // console.log("TrucksData.js addEmptyRow ", emptyRow);
    this.props.setTruck(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const truckCount = data.length;
    let value;

    const total = data.reduce((memo, truck) => {
      // console.log("....info", truck,column.id, truck[column.id]);
      if (typeof truck[column.id] === "object") {
        value = truck[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = truck[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(truck[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "purchasePrice") {
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "model") {
      return `Total Trucks: ${truckCount}`;
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
    // console.log("TrucksData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Truck Id",
        Footer: this.calculateTotal,
        accessor: "id",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Model",
        Footer: this.calculateTotal,
        accessor: "model",
        show: true,
        minWidth: 150,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Year",
        accessor: "year",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Purchase Date",
        accessor: "purchaseDate",
        show: true,
        minWidth: 120,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Purchase Price",
        Footer: this.calculateTotal,
        accessor: "purchasePrice",
        show: true,
        minWidth: 120,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Original Miles",
        accessor: "originalMiles",
        show: true,
        minWidth: 120,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Maintenance Date",
        accessor: "maintenanceDate",
        show: false,
        minWidth: 120,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Maintenance Type",
        accessor: "maintenanceType",
        show: false,
        minWidth: 120,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Maintenance Cost",
        Footer: this.calculateTotal,
        accessor: "maintenanceCost",
        show: false,
        minWidth: 120,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Repair Date",
        accessor: "repairDate",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Repair Type",
        accessor: "repairType",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Repair Cost",
        Footer: this.calculateTotal,
        accessor: "repairCost",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Company",
        accessor: "company.name",
        show: false,
        className: "columnBorder",
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
    const { truck, classes } = this.props;

    // console.log("TrucksData.js this.props", this.props);

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
          data={truck}
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
    truck: company.truck
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTruck: companyActions.getTruck,
      setTruck: companyActions.setTruck,
      updateTruck: companyActions.updateTruck,
      saveTruck: companyActions.saveTruck
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TrucksData)
  )
);
