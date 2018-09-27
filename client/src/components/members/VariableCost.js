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
import { variableCostConfig } from "../../configs/variableCostConfig";
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

class VariableCost extends Component {
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
    this.props.getVariableCost();
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
    dollarSign = cellInfo.column.id === "costValue" ? "$" : "";

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.variableCost];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateVariableCost({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.variableCost[cellInfo.index][
              cellInfo.column.id
            ].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.variableCost];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateVariableCost({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.variableCost[cellInfo.index][
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
    this.props.updateVariableCost({
      data: [
        ...this.props.variableCost.slice(0, row.index),
        ...this.props.variableCost.slice(row.index + 1)
      ]
    });
  }

  saveRows() {
    // console.log("VariableCost.js saveRows this.props", this.props);
    this.props.saveVariableCost(this.props.variableCost);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...variableCostConfig);
    // console.log("VariableCostsData.js addEmptyRow ", emptyRow);
    this.props.setVariableCost(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const variableCostCount = data.length;
    let value;

    const total = data.reduce((memo, variableCost) => {
      // console.log("....info", variableCost,column.id, variableCost[column.id]);
      if (typeof variableCost[column.id] === "object") {
        value = variableCost[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = variableCost[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(variableCost[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "dollarPerMile") {
      return "$" + Number(total.toFixed(2)).toLocaleString();
    } else if (column.id === "costName") {
      return `Total Count: ${variableCostCount}`;
    }

    return Number(Number(total).toFixed(2)).toLocaleString();
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
    // console.log("variableCostsData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Variable Cost",
        Footer: this.calculateTotal,
        id: "costName",
        accessor: d => d.truckLoadPayment,
        show: true,
        minWidth: 170,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Dollar Per Mile",
        Footer: this.calculateTotal,
        accessor: "dollarPerMile",
        show: true,
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
    const { variableCost, classes } = this.props;

    // console.log("TripsData.js this.state ", this.state);

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
          data={variableCost}
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
    variableCost: company.variableCost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getVariableCost: companyActions.getVariableCost,
      setVariableCost: companyActions.setVariableCost,
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
    )(VariableCost)
  )
);
