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
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addEmptyRow = this.addEmptyRow.bind(this);
    this.onColumnUpdate = this.onColumnUpdate.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    this.props.getEarnings();
  }

  dollarFormat(strNum,dec,sign){
    // 1200 => "$1,200"
    // "1200" || "1,200" => "$1,200.00" or "1,200"
    // console.log('strNum ', strNum, dec, sign)
    if(strNum === null || strNum === "") return strNum;
    if(typeof strNum === 'number') return  sign + Number(strNum.toFixed(dec)).toLocaleString();
    return sign + Number(Number(strNum.replace(",","")).toFixed(dec)).toLocaleString();
  }

  numberFormat(num){
    // '$1,200' || '1200' => 1200

    if (typeof num === 'number') return num;
    num = num.includes("$") ? num.slice(1,0) : num;
    return parseFloat(num.replace(",",""));
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
    let fieldValue;

    const findEditableRow = this.state.editableRowIndex.find(
      row => row === cellInfo.index
    );

    switch (cellInfo.column.id) {
      case "revenue":
      case "dispatchFee":
      case "fuelCost":
      case "driverPay":
      case "toll":
        dollarSign = "$";
        break;
      default:
        dollarSign = "";
    }

    fieldValue = this.props.earnings[cellInfo.index][cellInfo.column.id];

    // for numbers stored as strings:
    if( typeof(fieldValue) === 'string' && !isNaN(fieldValue)) {
      fieldValue = isNaN(Number(fieldValue)) ? fieldValue : Number(fieldValue).toLocaleString()
    }

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
            fieldValue.toLocaleString()
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
    // console.log('result ', result)
    if(result) this.props.deleteEarnings(row)

    // if(result){
    //   this.props.updateEarnings({
    //     data: [
    //       ...this.props.earnings.slice(0, row.index),
    //       ...this.props.earnings.slice(row.index + 1)
    //     ]
    //   });
    // }

  }

  saveRow(selectedRow) {
    let result = window.confirm("Do you want to save this row");
    if(!result) return null;

    let rowToUpdate = {};
    let toSaveRow = {};

    rowToUpdate = selectedRow.row;

     console.log("*** selectedRow ",  selectedRow)

    let keys = Object.keys(rowToUpdate);

    keys.forEach( key => {
      let loadItem = rowToUpdate[key];
      if(typeof(loadItem) === 'object' && key !== '_original'){

        let value = loadItem.props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          value = value.slice(1);
          value = parseFloat(value.replace(/,/g, ""));
        }
        toSaveRow[key] = value;
      }

      if(!isNaN(loadItem) && typeof loadItem === 'string'){
        toSaveRow[key] = Number(loadItem)
      }

      if (typeof loadItem === "string" && loadItem.substring(0, 1) === "$") {
        loadItem = loadItem.slice(1);
        loadItem = parseFloat(loadItem.replace(/,/g, ""));
        toSaveRow[key] = loadItem;
      }

    })
    const dashPos = rowToUpdate.weekRange.indexOf('-');
    const begWeekDate = rowToUpdate.weekRange.substring(0, dashPos);
    const endWeekDate = rowToUpdate.weekRange.substring(dashPos + 1);

    const newRow = Object.assign(rowToUpdate, toSaveRow, {rowIndex: selectedRow.index,
    begWeekDate: begWeekDate, endWeekDate: endWeekDate });
    // console.log("*** save row ",  newRow)
    if(selectedRow.original.id) this.props.editExistingEarnings(newRow);
    else  this.props.saveEarnings(newRow);
    alert("The earnings was saved")
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

    const depositsCount = data.length;
    let dollarSign = false;
    let value;
    console.log("*** Earnings calculateTotal data", data, "column ", column);
    const total = data.reduce((memo, load) => {

      let payment = load[column.id];

      if (typeof payment === "object") {
        value = payment.props.dangerouslySetInnerHTML.__html;

        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
          value = parseFloat(value.replace(/,/g, ""));

        // mileage that might have , in the number (shows as string)
        } else if (typeof value === "string") {
          value = parseFloat(value.replace(",",""));
        }
        memo += Number(value);

      } else {
        if (payment === "") payment = 0;
        // formula values(eg fuel cost) from db are not objects but strings with $
        if (typeof payment === "string" && payment.substring(0,1) === '$') {
          dollarSign = true;
          payment = payment.slice(1);
          payment = parseFloat(payment.replace(",",""));
        // parseFload will convert to number the string, ok if no "," is found
        }else if(typeof payment === "string"){
          payment = parseFloat(payment.replace(",",""));
        }

        memo += payment;
      }

      return memo;
    }, 0);

    if ( dollarSign ||  (column.id !== "milesPaid" && column.id !== "weekRange")
    ) {
      if (column.id === "margin") {
        return Number((total / depositsCount).toFixed(2)).toLocaleString() + "%";
      }
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "weekRange") {
      return `Weeks: ${depositsCount}`;
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
        Header: "Week Dates",
        Footer: this.calculateTotal,
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
          this.numberFormat(d.fuelCost) + this.numberFormat(d.driverPay) +
          this.numberFormat(d.dispatchFee) + this.numberFormat(d.lumper) +
          this.numberFormat(d.detention) + this.numberFormat(d.detentionDriverPay) +
          this.numberFormat(d.lateFee) + this.numberFormat(d.toll) +
          this.numberFormat(d.roadMaintenance) + this.numberFormat(d.otherExpenses);


          totalExpenses = isNaN(totalExpenses) ? null : totalExpenses;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.dollarFormat(totalExpenses, 0, "$")
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
          let payment = this.numberFormat(d.revenue)
          let totalExpenses =
          this.numberFormat(d.fuelCost) + this.numberFormat(d.driverPay) +
          this.numberFormat(d.dispatchFee) + this.numberFormat(d.lumper) +
          this.numberFormat(d.detention) + this.numberFormat(d.detentionDriverPay) +
          this.numberFormat(d.lateFee) + this.numberFormat(d.toll) +
          this.numberFormat(d.roadMaintenance) + this.numberFormat(d.otherExpenses);

          let profit = payment - totalExpenses;
          profit = isNaN(profit) ? null : profit;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.dollarFormat(profit, 0, "$")
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
            this.numberFormat(d.fuelCost) + this.numberFormat(d.driverPay) +
            this.numberFormat(d.dispatchFee) + this.numberFormat(d.lumper) +
            this.numberFormat(d.detention) + this.numberFormat(d.detentionDriverPay) +
            this.numberFormat(d.lateFee) + this.numberFormat(d.toll) +
            this.numberFormat(d.roadMaintenance) + this.numberFormat(d.otherExpenses);

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
    const { earnings, classes } = this.props;

    // console.log("Earnings.js this.props ", this.props);

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
          data={earnings}
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
    earnings: company.earnings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getEarnings: companyActions.getEarnings,
      setEarnings: companyActions.setEarnings,
      updateEarnings: companyActions.updateEarnings,
      saveEarnings: companyActions.saveEarnings,
      deleteEarnings: companyActions.deleteEarnings,
      editExistingEarnings: companyActions.editExistingEarnings
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
