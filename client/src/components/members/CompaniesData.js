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
import { firmConfig } from "../../configs/firmConfig";
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

class CompaniesData extends Component {
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
    this.props.getFirm();
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
    dollarSign = cellInfo.column.id === "purchasePrice" ? "$" : "";

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.firm];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateFirm({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            // dollarSign +
            this.props.firm[cellInfo.index][cellInfo.column.id].toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.firm];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateFirm({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            this.props.firm[cellInfo.index][cellInfo.column.id].toLocaleString()
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
      this.props.updateFirm({
        data: [
          ...this.props.firm.slice(0, row.index),
          ...this.props.firm.slice(row.index + 1)
        ]
      });
    }
  }

  saveRow() {
    console.log("CompaniesData.js saveRow this.props", this.props);
    this.props.saveFirm(this.props.firm);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...firmConfig);
    // console.log("CompaniesData.js addEmptyRow ", emptyRow);
    this.props.setFirm(emptyRow);
    // this.props.setTrip({
    //   data: this.props.trip.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const firmCount = data.length;
    let value;

    const total = data.reduce((memo, firm) => {
      // console.log("....info", firm,column.id, firm[column.id]);
      if (typeof firm[column.id] === "object") {
        value = firm[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = firm[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(firm[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "purchasePrice") {
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "name") {
      return `Total Companies: ${firmCount}`;
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
    // console.log("CompaniesData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Name",
        Footer: this.calculateTotal,
        accessor: "name",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Tax Id",
        accessor: "taxId",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Founded Date",
        accessor: "foundedDate",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Incorporated State",
        accessor: "incorporatedState",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Number Of Employees",
        Footer: this.calculateTotal,
        accessor: "numberOfEmployees",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Number Of Trucks",
        Footer: this.calculateTotal,
        accessor: "numberOfTrucks",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Number Of Trailers",
        Footer: this.calculateTotal,
        accessor: "numberOfTrailers",
        show: false,
        minWidth: 120,
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
    const { firm, classes } = this.props;

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
          data={firm}
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
    firm: company.firm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFirm: companyActions.getFirm,
      setFirm: companyActions.setFirm,
      updateFirm: companyActions.updateFirm,
      saveFirm: companyActions.saveFirm
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(CompaniesData)
  )
);
