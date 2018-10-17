import React, { Component } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "react-table/react-table.css";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Input from '@material-ui/icons/Input';
import IconButton from '@material-ui/core/IconButton';
import { exportTableToCSV } from "./export.js";
import { exportTableToJSON } from "./export.js";
import { loadsConfig } from "../../configs/loadsConfig";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import ActionBtn from "./ActionBtn";
import DateFilter from "./DateFilter";
import CustomPagination from "./CustomPagination.js";
import InputsVariableCost from './InputsVariableCost';

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
    // console.log('***componentDidUpdate ')
    if(this.props.load !== prevProps.load){
      this.props.getInputVariable()
    }
  }

  handleDownload() {
    const data = this.reactTable.getResolvedState().sortedData;
    const columns = this.createColumns();
    // console.log("handle download ", data, columns);
    exportTableToCSV(data, columns, "data.csv");
  }

  handleDownloadToJson() {
    // console.log("test json", this);
    const data = this.reactTable.getResolvedState().sortedData;
    exportTableToJSON(data, this.state.columns, "data.json");
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

  getColumnWidth(accessor){
    let data = this.props.load;
    let max = 0;
    const maxWidth = 400;
    const spacing = 7.3;

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

    if( typeof(fieldValue) === 'string' && dollarSign ) {
      fieldValue = Number(fieldValue).toLocaleString();
    }
    // if edit is enabled- first case, if it is not- second case
    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          {/* const data = [...this.props.load]; */}
          {/* data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML; */}
          const keyToUpdate = cellInfo.column.id;
          const valueToUpdate = e.target.innerHTML;
          const indexToUpdate = cellInfo.index;
        ``
          const updateInfo = {
            keyToUpdate: keyToUpdate,
            valueToUpdate: valueToUpdate,
            indexToUpdate: indexToUpdate
          }

          console.log('updateInfo ', updateInfo, cellInfo, cellInfo.column)
          this.props.updateLoad(updateInfo);
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
    // console.log('row.index ', row.index, ' ', row)
    this.props.deleteLoad(row.index)
  }

  // getId(){
  //   const loads = this.props.load;
  //   const arrayIds = loads.filter( load => load.id )
  //     .map(load => load.id)
  //   return Math.max(...arrayIds) + 1;
  // }

  saveRow(selectedRow) {
    let rowId = null;
    let rowToUpdate = {};
    let toSaveRow = {};

      const mandatoryItems = ['pickupDate', 'truckId', 'driverName', 'driverId','loadNumber', 'brokerName',
      'brokerId','pickUpCityState', 'dropOffCityState', 'pickUpAddress', 'dropOffAddress', 'payment',
      'mileage', 'fuelCost', 'driverPay', 'totalExpenses']

    // if(selectedRow.original.id){
    //   rowId = selectedRow.original.id;
    //   rowToUpdate = this.props.load.filter( load => load.id === rowId )[0];
    // }else{
      rowToUpdate = selectedRow.row;
    // }

    // console.log('**** rowToUpdate; selectedRow ', rowToUpdate, selectedRow)

    let keys = Object.keys(rowToUpdate);

    const emptyFields = keys.map( key => { if(!rowToUpdate[key]) return key })
      .filter( loadItem => loadItem )

    const requiredFieldsCheck = emptyFields.map( loadItem => {
      if(mandatoryItems.includes( loadItem )) return loadItem
    })
      .filter( result => result)

    // console.log("emtyFields, checkRequired ",emptyFields, " ", requiredFieldsCheck)

    if(requiredFieldsCheck.length > 0) {
      const msgString = requiredFieldsCheck.join(", ");
      alert("Required fields: \n" +  msgString)
    }


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

    })

    const newRow = Object.assign(rowToUpdate, toSaveRow);
    this.props.saveLoads(newRow);
  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...loadsConfig);
    this.props.addLoad(emptyRow);
  }

  calculateTotal({ data, column }) {
    // console.log("LoadsData calculateTotal data", data, "column", column);
    const loadsCount = data.length;
    let dollarSign = false;
    let value;

    const total = data.reduce((memo, load) => {
      // console.log("....info", load,column.id, load[column.id]);
      let payment = load[column.id];

      if (typeof payment === "object") {
        value = payment.props.dangerouslySetInnerHTML.__html;

        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
          value = parseFloat(value.replace(/,/g, ""));
        }
        memo += Number(value);
      } else {

        if (payment === "") payment = 0;
        if (typeof payment === "string") {
          payment = parseFloat(payment.replace(/,/g, ""));
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
    } else if (column.id === "pickupDate") {
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
    console.log("LoadsData.js createColumns this.props: ", this.props);
    const { mpg, dispatchPercent, dieselppg } = this.props;

    return [
      {
        Header: "Date",
        Footer: this.calculateTotal,
        accessor: "pickupDate",
        show: true,
        className: "columnBorder",
        minWidth: 120,
        Cell: this.editTable
      },
      {
        Header: "Truck Id",
        accessor: "truckId",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("truckId"),
        Cell: this.editTable
      },
      {
        Header: "Driver",
        accessor: "driverName",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("driverName"),
        Cell: this.editTable
      },
      {
        Header: "Driver Id",
        accessor: "driverId",
        show: false,
        className: "columnBorder",
        width: 70,
        Cell: this.editTable
      },
      {
        Header: "Company",
        accessor: "truck.company.name",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("truck.company.name"),
        Cell: this.editTable
      },
      {
        Header: "Load",
        accessor: "loadNumber",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("loadNumber"),
        Cell: this.editTable
      },
      {
        Header: "Broker",
        accessor: "brokerName",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("brokerName"),
        Cell: this.editTable
      },
      {
        Header: "Broker Id",
        accessor: "brokerId",
        show: false,
        className: "columnBorder",
        width: 70,
        Cell: this.editTable
      },
      {
        Header: "Shipper",
        accessor: "shipper",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("shipper"),
        Cell: this.editTable
      },
      {
        Header: "Consignee",
        accessor: "consignee",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("consignee"),
        Cell: this.editTable
      },
      {
        Header: "Pick Up",
        accessor: "pickUpCityState",
        show: true,
        className: "columnBorder",
        minWidth: this.getColumnWidth("pickUpCityState"),
        Cell: this.editTable
      },
      {
        Header: "Drop Off",
        accessor: "dropOffCityState",
        show: true,
        className: "columnBorder",
        minWidth: this.getColumnWidth("dropOffCityState"),
        Cell: this.editTable
      },
      {
        Header: "Origin",
        accessor: "pickUpAddress",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("pickUpAddress"),
        Cell: this.editTable
      },
      {
        Header: "Destination",
        accessor: "dropOffAddress",
        show: false,
        className: "columnBorder",
        minWidth: this.getColumnWidth("dropOffAddress"),
        Cell: this.editTable
      },
      {
        Header: "Commodity",
        accessor: "commodity",
        show: false,
        minWidth: this.getColumnWidth("commodity"),
        Cell: this.editTable
      },
      {
        Header: "Weight",
        accessor: "weight",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Trailer",
        accessor: "trailer",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Payment",
        Footer: this.calculateTotal,
        accessor: "payment",
        show: true,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Loaded Miles",
        Footer: this.calculateTotal,
        accessor: "loadedMiles",
        className: "columnBorder",
        minWidth: 80,
        show: true,
        Cell: this.editTable
      },
      {
        Header: "Empty Miles",
        Footer: this.calculateTotal,
        accessor: "emptyMiles",
        show: true,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Mileage",
        Footer: this.calculateTotal,
        id: "mileage",
        show: true,
        minWidth: 80,
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
        minWidth: 80,
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
        minWidth: 80,
        accessor: d => {
          let fuelCost = null;
          const findEditableRow = this.state.editableRowIndex.find(
            row => row === d.id
          );

          // console.log('*** findEditableRow ', findEditableRow, " d.index ", d, "state ", this.state.editableRowIndex)
          // if(findEditableRow === d.id){
            fuelCost = ((Number(d.loadedMiles) + Number(d.emptyMiles)) / Number(mpg)) *
            Number(dieselppg);
          // }

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
        minWidth: 80,
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
        show: false,
        className: "columnBorder",
        minWidth: 80,
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
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Detention",
        Footer: this.calculateTotal,
        accessor: "detention",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Detention Driver Pay",
        Footer: this.calculateTotal,
        accessor: "detentionDriverPay",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Second Stop Driver Pay",
        Footer: this.calculateTotal,
        accessor: "secondStopDriverPay",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Late Fee",
        Footer: this.calculateTotal,
        accessor: "lateFee",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Toll",
        Footer: this.calculateTotal,
        accessor: "toll",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Road Maintenance",
        Footer: this.calculateTotal,
        accessor: "roadMaintenance",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Other Expenses",
        Footer: this.calculateTotal,
        accessor: "otherExpenses",
        show: false,
        className: "columnBorder",
        minWidth: 80,
        Cell: this.editTable
      },
      {
        Header: "Total Expenses",
        Footer: this.calculateTotal,
        id: "totalExpenses",
        show: true,
        className: "columnBorder",
        minWidth: 80,
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
                __html: "$" + Number(Number(totalExpenses).toFixed(0)).toLocaleString()
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
        minWidth: 80,
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
                __html: "$" + Number(Number(profit).toFixed(0)).toLocaleString()
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
        minWidth: 50,
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

    const { load, classes } = this.props;
    // console.log("*** render LoadsData this.props ", this.props);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();

    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <SideMenu />
          &nbsp;
          <DateFilter />
          &nbsp;
          <InputsVariableCost />
          &nbsp;
          <ColumnChooser
            columns={columns}
            onColumnUpdate={this.onColumnUpdate}
          />
          &nbsp;
          <ActionBtn addEmptyRow={this.addEmptyRow} />

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
      deleteLoad: freightActions.deleteLoad,
      addLoad: freightActions.addLoad,
      updateLoad: freightActions.updateLoad,
      saveLoads: freightActions.saveLoads,
      getInputVariable: companyActions.getInputVariable
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
