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
import { fixedCostConfig } from "../../configs/fixedCostConfig";
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

class FixedCost extends Component {
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
    this.props.getFixedCost();
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
          const data = [...this.props.fixedCost];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateFixedCost({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.fixedCost[cellInfo.index][
              cellInfo.column.id
            ].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.fixedCost];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateFixedCost({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.fixedCost[cellInfo.index][
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
    this.props.updateFixedCost({
      data: [
        ...this.props.fixedCost.slice(0, row.index),
        ...this.props.fixedCost.slice(row.index + 1)
      ]
    });
  }

  saveRows() {
    // console.log("FixedCost.js saveRows this.props", this.props);
    this.props.saveFixedCost(this.props.fixedCost);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...fixedCostConfig);
    // console.log("FixedCostsData.js addEmptyRow ", emptyRow);
    this.props.setFixedCost(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const fixedCostCount = data.length;
    let value;

    const total = data.reduce((memo, fixedCost) => {
      // console.log("....info", fixedCost,column.id, fixedCost[column.id]);
      if (typeof fixedCost[column.id] === "object") {
        value = fixedCost[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = fixedCost[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(fixedCost[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "costValue") {
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "costName") {
      return `Total Count: ${fixedCostCount}`;
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
    // console.log("fixedCostsData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Fixed Cost",
        Footer: this.calculateTotal,
        id: "costName",
        accessor: d => d.truckLoadPayment,
        show: true,
        minWidth: 170,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Monthly Amount",
        Footer: this.calculateTotal,
        accessor: "costValue",
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
    const { fixedCost, classes } = this.props;

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
          data={fixedCost}
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
    fixedCost: company.fixedCost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFixedCost: companyActions.getFixedCost,
      setFixedCost: companyActions.setFixedCost,
      updateFixedCost: companyActions.updateFixedCost,
      saveFixedCost: companyActions.saveFixedCost
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(FixedCost)
  )
);
