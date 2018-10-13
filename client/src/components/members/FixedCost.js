import React, { Component } from "react";
import ReactTable from "react-table";
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
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Input from '@material-ui/icons/Input';
import IconButton from '@material-ui/core/IconButton';
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
    this.saveRow = this.saveRow.bind(this);
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
    dollarSign = ( cellInfo.column.id === "monthlyAmount" || cellInfo.column.id === "yearlyAmount" ) ? "$" : "";

    let value = this.props.fixedCost[cellInfo.index][ cellInfo.column.id];

    if( typeof(value) === 'string' && dollarSign ) {
      value = Number(value).toLocaleString();
    }

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
          __html: value
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
            dollarSign + value
        }}
      />
    );
  }

  editRow(row) {
    // console.log("FixedCost.js editRow ", row, "row index: ", row.index);
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
      this.props.updateFixedCost({
        data: [
          ...this.props.fixedCost.slice(0, row.index),
          ...this.props.fixedCost.slice(row.index + 1)
        ]
      });
    }

  }

  saveRow(row) {
    console.log("FixedCost.js saveRow row", row);
    this.props.saveFixedCost(row);
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

    if (dollarSign || column.id === "monthlyAmount" || column.id === "yearlyAmount") {
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

  getColumnWidth(accessor){
    let data = this.props.fixedCost;
    let max = 0;
    const maxWidth = 400;
    const spacing = 7.2;

    for (let i = 0; i < data.length; i++){
      if(data[i] !== undefined && data[i][accessor] !== null){
        if(JSON.stringify(data[i][accessor] || 'null').length > max){
          max = JSON.stringify(data[i][accessor] || 'null').length;
        }
      }
    }
    // console.log('max ', max)
    return Math.min(maxWidth, max * spacing);
  }

  createColumns() {
    // console.log("fixedCostsData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Fixed Cost",
        Footer: this.calculateTotal,
        accessor: "costName",
        show: true,
        width: this.getColumnWidth("costName"),
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Monthly Cost",
        Footer: this.calculateTotal,
        accessor: "monthlyAmount",
        show: true,
        width: 80,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Yearly Cost",
        Footer: this.calculateTotal,
        accessor: "yearlyAmount",
        show: true,
        width: 80,
        className: "columnBorder",
        Cell: this.editTable
      },

      {
        Header: "Edit",
        id: "edit",
        accessor: "edit",
        show: true,
        width: 200,
        Cell: row => {
          const editableRow = this.state.editableRowIndex.filter(
            editableRow => editableRow === row.index
          );
          let editBtnColor = "secondary";
          let editIcon = <Edit />;

          if (editableRow.length > 0) {
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
    const { fixedCost, classes } = this.props;
    // console.log("*** FixedCost this.props ", this.props);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();

    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <SideMenu />
          <ActionBtn addEmptyRow={this.addEmptyRow} />
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
          defaultPageSize={20}
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
