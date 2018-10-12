import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "react-table/react-table.css";
// import { Datatable } from "./Datatable";
import { loadsConfig } from "../../configs/loadsConfig";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import ActionBtn from "./ActionBtn";
import DateFilter from "./DateFilter";
import CustomPagination from "./CustomPagination.js";
import { exportTableToCSV } from "./export.js";
import { exportTableToJSON } from "./export.js";

import * as freightActions from "../../store/actions/freight";
import * as companyActions from "../../store/actions/company";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  toolbar: {
    background: "#7D818C"
  }
});

class LoadsData extends Component {
  constructor() {
    super();
    this.state = {
      columns: [],
      editableRowIndex: [],
    };

    this.editTable = this.editTable.bind(this);
    this.editRow = this.editRow.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addEmptyRow = this.addEmptyRow.bind(this);
    this.onColumnUpdate = this.onColumnUpdate.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleDownloadToJson = this.handleDownloadToJson.bind(this);
  }

  componentDidMount() {
    this.props.getLoad();
  }

  componentDidUpdate(prevProps, prevState, snapshop){
    console.log('..............')
    if(this.props.load !== prevProps.load){
      console.log('..............////////////////')
      this.props.getVariableCost();
    }
  }

  handleDownload() {
    const data = this.reactTable.getResolvedState().sortedData;
    const columns = this.createColumns();
    // console.log("handle download ", data, columns);
    exportTableToCSV(data, columns, "data.csv");
    //console.log(data);
  }
  handleDownloadToJson() {
    // console.log("test json", this);
    const data = this.reactTable.getResolvedState().sortedData;
    exportTableToJSON(data, this.state.columns, "data.json");
    //console.log(data[0]._original);
  }

  getConfirmDoc(docLink) {
    // console.log("LoadsData docLink ", Modal, SideMenu);

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
        // console.log("getConfirmDoc ", fileURL);
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                  width=500,height=500,left=300,top=300`;
        window.open(fileURL, "", params);
        // window.open(fileURL);
      })
      .catch(error => console.log(error));
  }

  editTable(cellInfo) {
    // console.log(
    //   "cell info........",
    //   cellInfo,
    //   "cellInfo.column.id ",
    //   cellInfo.column.id,
    //   'cellInfo.row[cellInfo.column.id]:',
    //   cellInfo.row[cellInfo.column.id]
    // );

    let dollarSign;
    let fieldValue;
    const findEditableRow = this.state.editableRowIndex.find(
      row => row === cellInfo.index
    );

    if( cellInfo.column.id === 'truck.company.name'){
      console.log('field: ', this.props.load[cellInfo.index])
      fieldValue = this.props.load[cellInfo.index][
       'truck'] ? this.props.load[cellInfo.index][
        'truck']['company'].name : '';

    } else {
      fieldValue = this.props.load[cellInfo.index][
        cellInfo.column.id
      ]
    }

    if( cellInfo.column.id === 'pickupDate' && this.props.load[cellInfo.index][
      cellInfo.column.id
    ] !== ''){
      fieldValue = new Date(this.props.load[cellInfo.index][
        cellInfo.column.id
      ]).toLocaleDateString();
    }

    switch (cellInfo.column.id) {
      case "payment":
      case "dieselPrice":
      case "lumper":
      case "detention":
      case "detentionDriverPay":
      case "lateFee":
      case "toll":
      case "roadMaintenance":
      case "otherExpenses":
        dollarSign = "$";
        break;
      default:
        dollarSign = "";
    }

    // if (cellInfo.column.id === "payment") {
    //   dollarSign = "$";
    // }

    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.load];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateLoad({ data });
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
          const data = [...this.props.load];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateLoad({ data });
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
    // console.log("LoadsData.js editRow ", row, "row index: ", row.index);
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
      this.props.updateLoad({
        data: [
          ...this.props.load.slice(0, row.index),
          ...this.props.load.slice(row.index + 1)
        ]
      });
    }
  }

  saveRow() {
    // console.log("LoadsData.js saveRow this.props", this.props);
    this.props.saveLoads(this.props.load);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...loadsConfig);
    // console.log("LoadsData.js addEmptyRow ", emptyRow);
    this.props.setLoad(emptyRow);
    // this.props.setLoad({
    //   data: this.props.load.concat(emptyRow)
    // });
  }

  calculateTotal({ data, column }) {
    // console.log("LoadsData calculateTotal data", data, "column", column);
    const loadsCount = data.length;
    let dollarSign = false;
    let value;

    const total = data.reduce((memo, load) => {
      // console.log("....info", load,column.id, load[column.id]);

      if (typeof load[column.id] === "object") {
        value = load[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let payment = load[column.id];
        if (payment === "") payment = 0;
        if (typeof payment === "string") {
          payment = parseFloat(load[column.id].replace(/,/g, ""));
        }

        memo += payment;
      }

      return memo;
    }, 0);

    if (dollarSign || column.id === "payment" || column.id === "toll") {
      if (column.id === "dollarPerMile") {
        return "$" + Number((total / loadsCount).toFixed(2)).toLocaleString();
      }
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "dieselPrice") {
      return "$" + Number((total / loadsCount).toFixed(2)).toLocaleString();
    } else if (column.id === "bookDate") {
      return `Total Loads: ${loadsCount}`;
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
    // console.log("LoadsData.js createColumns this.props: ", this.props);
    const { mpg, dispatchPercent, dieselppg } = this.props;

    return [
      {
        Header: "Date",
        Footer: this.calculateTotal,
        accessor: "pickupDate",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Truck Id",
        accessor: "truckId",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Driver",
        accessor: "driverName",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Company",
        accessor: "truck.company.name",
        show: false,
        className: "columnBorder",
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
        Cell: this.editTable
      },
      {
        Header: "Shipper",
        accessor: "shipper",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Consignee",
        accessor: "consignee",
        show: true,
        className: "columnBorder",
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
        Header: "Origin",
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
        Header: "Payment",
        Footer: this.calculateTotal,
        accessor: "payment",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Loaded Miles",
        Footer: this.calculateTotal,
        accessor: "loadedMiles",
        className: "columnBorder",
        show: true,
        Cell: this.editTable
      },
      {
        Header: "Empty Miles",
        Footer: this.calculateTotal,
        accessor: "emptyMiles",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Mileage",
        Footer: this.calculateTotal,
        id: "mileage",
        show: true,
        className: "columnBorder",
        accessor: d => {
          const totalMiles = Number(d.loadedMiles) + Number(d.emptyMiles);

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: totalMiles
              }}
            />
          );
        }
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
          let dollarPerMile =
            Number(payment) / (Number(d.loadedMiles) + Number(d.emptyMiles));
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
      // {
      //   Header: "Diesel Price",
      //   id: 'dieselPrice',
      //   Footer: this.calculateTotal,
      //   show: true,
      //   accessor: d => dieselppg,
      //   className: "columnBorder",
      //   Cell: this.editTable
      // },
      {
        Header: "Fuel Cost",
        Footer: this.calculateTotal,
        id: "fuelCost",
        show: true,
        className: "columnBorder",
        accessor: d => {
          let fuelCost =
            ((Number(d.loadedMiles) + Number(d.emptyMiles)) / Number(mpg)) *
            Number(dieselppg);

          fuelCost = isNaN(fuelCost) ? null : fuelCost;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(fuelCost).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Driver Pay",
        Footer: this.calculateTotal,
        id: "driverPay",
        show: true,
        className: "columnBorder",
        accessor: d => {
          // if(this.state.editableRowIndex.length > 0){

            let driverPay =
              (Number(d.loadedMiles) + Number(d.emptyMiles)) *
              this.props.driverPay;
            driverPay = isNaN(driverPay) ? null : driverPay;

            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: "$" + Number(driverPay).toFixed(0)
                }}
              />
            );
          // } else {
          //   d.driverPay
          // }
        }
      },
      {
        Header: "Dispatch Fee",
        Footer: this.calculateTotal,
        id: "dispatchFee",
        show: true,
        className: "columnBorder",
        accessor: d => {
          let payment = d.payment;
          if (typeof d.payment === "string")
            payment = parseFloat(d.payment.replace(/,/g, ""));

          let dispatchFee = Number(payment) * Number(dispatchPercent);

          dispatchFee = isNaN(dispatchFee) ? null : dispatchFee;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(dispatchFee).toFixed(0)
              }}
            />
          );
        }
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
        Header: "Second Stop Driver Pay",
        Footer: this.calculateTotal,
        accessor: "secondStopDriverPay",
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
        Header: "Toll",
        Footer: this.calculateTotal,
        accessor: "toll",
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
          let payment = d.payment;
          if (typeof d.payment === "string")
            payment = parseFloat(d.payment.replace(/,/g, ""));

          let totalExpenses =
            ((Number(d.loadedMiles) + Number(d.emptyMiles)) / Number(mpg)) *
              Number(dieselppg) +
            (Number(d.loadedMiles) + Number(d.emptyMiles)) *
              this.props.driverPay +
            Number(payment) * Number(dispatchPercent) +
            Number(d.lumper) +
            Number(d.detention) +
            Number(d.detentionDriverPay) +
            Number(d.lateFee) +
            Number(d.toll) +
            Number(d.roadMaintenance) +
            Number(d.otherExpenses);

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
          let payment = d.payment;
          if (typeof d.payment === "string")
            payment = parseFloat(d.payment.replace(/,/g, ""));

          let profit =
            payment -
            (((Number(d.loadedMiles) + Number(d.emptyMiles)) / Number(mpg)) *
              Number(dieselppg) +
              (Number(d.loadedMiles) + Number(d.emptyMiles)) *
                this.props.driverPay +
              Number(payment) * Number(dispatchPercent) +
              Number(d.lumper) +
              Number(d.detention) +
              Number(d.detentionDriverPay) +
              Number(d.lateFee) +
              Number(d.toll) +
              Number(d.roadMaintenance) +
              Number(d.otherExpenses));

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
        Header: "Confirm Doc",
        accessor: "confirmFilePath",
        show: true,
        className: "columnBorder",
        Cell: ({ row }) => {
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
    const { load, classes } = this.props;

    console.log("LoadsData.js this.props ", this.props);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <SideMenu />
          <DateFilter />
          &nbsp;
          <ColumnChooser
            columns={columns}
            onColumnUpdate={this.onColumnUpdate}
          />
          &nbsp;
          <ActionBtn saveRow={this.saveRow} addEmptyRow={this.addEmptyRow} />

        </Toolbar>

        <ReactTable
          ref={r => (this.reactTable = r)}
          data={load}
          showPaginationBottom={true}
          handleDownloadToJson={this.handleDownloadToJson}
          handleDownload={this.handleDownload}
          PaginationComponent={CustomPagination}
          columns={columns}
          defaultPageSize={20}
          style={
            {
              height: "800px"
            }
          }
          className="-sloaded -highlight"
        />
      </div>
    );
  }
}

function mapStateToProps({ freight, company }) {
  return {
    load: freight.load,
    driverPay: company.inputsVariableCost.driverpayDollarPerMile,
    mpg: company.inputsVariableCost.mpg,
    dieselppg: company.inputsVariableCost.dieselppg,
    dispatchPercent: company.inputsVariableCost.dispatchPercent
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getLoad: freightActions.getLoad,
      setLoad: freightActions.setLoad,
      updateLoad: freightActions.updateLoad,
      saveLoads: freightActions.saveLoads,
      getVariableCost: companyActions.getVariableCost,
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(LoadsData)
  )
);
