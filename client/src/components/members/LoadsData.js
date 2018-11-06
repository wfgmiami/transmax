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
    if(this.props.load.length === 0)
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

  // when entering data into editable fields of the table
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

    // for numbers stored as strings:
    if( typeof(fieldValue) === 'string' && !isNaN(fieldValue) && cellInfo.column.id !== 'loadNumber') {
      fieldValue = isNaN(Number(fieldValue)) ? fieldValue : Number(fieldValue).toLocaleString()
    }

    // if edit is enabled- first case, if it is not- second case
    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {

          const keyToUpdate = cellInfo.column.id;
          const valueToUpdate = e.target.innerHTML;
          const indexToUpdate = cellInfo.index;

          const updateInfo = {
            keyToUpdate: keyToUpdate,
            valueToUpdate: valueToUpdate,
            indexToUpdate: indexToUpdate
          }

          console.log('updateInfo on bluer', updateInfo)
          this.props.editLoad(updateInfo);
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

  // used in editRow to persist the calculated fields(ie fuel cost, expenses, etc)
  createLoad(row){
    let load = {};

    Object.keys(row).forEach( key => {
      if( typeof row[key] === "object" && key !== "_original" ){
        load[key] = row[key].props.dangerouslySetInnerHTML.__html;
        if(load[key] && load[key].substring(0,1) === '$') load[key] = load[key].slice(1);
      }else if(!key.includes('_') && !key.includes(".") && key !== 'edit') {
        load[key] = row[key];
      }
    })

    return load;
  }

  // when activating/deactivating row edit mode
  editRow(row) {

    const alreadyEditable = this.state.editableRowIndex.find(
      editableRow => editableRow === row.index
    );

    // console.log("LoadsData.js editRow ", row, "state: ", this.state, " ",alreadyEditable);

    if (alreadyEditable || alreadyEditable === 0) {
      this.setState({
        editableRowIndex: this.state.editableRowIndex.filter(
          editableRow => editableRow !== row.index
        )
      });
      let load = this.createLoad(row.row);

      if(row.original.id){
        load.id = row.original.id;
      }
      else load.rowIndex = row.index;
      // console.log('row.............',load)
      this.props.updateLoad(load);
    } else {
      this.setState({
        editableRowIndex: [...this.state.editableRowIndex, row.index]
      });
    }
  }

  deleteRow(row) {
    let result = window.confirm("Do you want to delete this row?")
    // console.log('result ', result)
    if(result) this.props.deleteLoad(row)
  }

  saveRow(selectedRow) {
    let rowToUpdate = {};
    let toSaveRow = {};

    const mandatoryItems = ['pickupDate', 'truckId', 'driverName', 'driverId','loadNumber', 'brokerName',
      'brokerId','pickUpCityState', 'dropOffCityState', 'pickUpAddress', 'dropOffAddress', 'payment',
      'mileage', 'fuelCost', 'driverPay', 'totalExpenses']

    rowToUpdate = selectedRow.row;

    // console.log("*** selectedRow ",  selectedRow, " ", selectedRow.original.id)

    let keys = Object.keys(rowToUpdate);

    const emptyFields = keys.map( key => {
      if(!rowToUpdate[key])
        return key
      else return null
    })
      .filter( loadItem => loadItem )

    const requiredFieldsCheck = emptyFields.map( loadItem => {
      if(mandatoryItems.includes( loadItem ))
        return loadItem
      else return null
    })
      .filter( result => result)



    if(requiredFieldsCheck.length > 0) {
      const msgString = requiredFieldsCheck.join(", ");
      alert("Required fields: \n" +  msgString)

    }else{

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

      const newRow = Object.assign(rowToUpdate, toSaveRow);
      // console.log("*** save row ",  newRow)
      if(selectedRow.original.id) this.props.editExistingLoad(newRow);
      else  this.props.saveNewLoad(newRow);
      alert("The load was saved")

    }

  }

  addEmptyRow() {
    let emptyRow = Object.assign({}, ...loadsConfig);
    this.props.addLoad(emptyRow);
  }

  calculateTotal({ data, column }) {
    // console.log("*** LoadsData calculateTotal data", data, "column ", column);
    const loadsCount = data.length;
    let dollarSign = false;
    let value;

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

  // showing/hiding columns
  onColumnUpdate(index) {

    const columns = this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    // console.log("onColumnUpdate index ", index, "...", this.state);
    this.setState( prevState => {
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
        console.log('onColumnUpdate columns: ', this.state.columns)
      }
    );
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

  // showing data from db when not in edit mode
  returnTableData(data, field){
    const editable = this.state.editableRowIndex;
    let check = 0;
    let dec = (field === "dollarPerMile") ? 2 : 0;
    let dollar = field === "mileage" ? '' : '$';

    if (editable.length === 0) return this.dollarFormat(data[field],dec,dollar);
    for(let index of editable){
      check++;
      if( this.props.load[index].id === data.id ) return null;
      if( this.props.load[index].id !== data.id && check === editable.length)
        return this.dollarFormat(data[field],dec,'$')
    }
  }

  createColumns() {
    // console.log("LoadsData.js createColumns this.props: ", this.props);
    let { mpg, dispatchPercent, dieselppg, driverPay } = this.props;
    mpg = Number(mpg);
    dispatchPercent = Number(dispatchPercent);
    dieselppg = Number(dieselppg);
    driverPay = Number(driverPay);

    let columns = [
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

          const tableData = this.returnTableData(d, 'mileage');
          if( tableData ) return tableData;

          const loadedMiles = this.numberFormat(d.loadedMiles);
          const emptyMiles = this.numberFormat(d.emptyMiles);
          const totalMiles = loadedMiles + emptyMiles;
        //  console.log('..............', loadedMiles, typeof loadedMiles, typeof emptyMiles, loadedMiles + emptyMiles)

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.dollarFormat(totalMiles,0,'')
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

          const tableData = this.returnTableData(d, 'dollarPerMile');

          if( tableData ) return tableData;

          let payment = this.numberFormat(d.payment);
          let loadedMiles = this.numberFormat(d.loadedMiles);
          let emptyMiles = this.numberFormat(d.emptyMiles);

          let dollarPerMile =
            payment / (loadedMiles + emptyMiles)

          dollarPerMile = isNaN(dollarPerMile) ? null : dollarPerMile;
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.dollarFormat(dollarPerMile,2,'$')
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

          const tableData = this.returnTableData(d, 'fuelCost');
          if( tableData ) return tableData;

          let fuelCost = null;
          const loadedMiles = this.numberFormat(d.loadedMiles);
          const emptyMiles = this.numberFormat(d.emptyMiles);

          fuelCost = (loadedMiles + emptyMiles) / mpg * dieselppg;
          fuelCost = isNaN(fuelCost) ? null : fuelCost;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.dollarFormat(fuelCost,0,"$")
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
          const tableData = this.returnTableData(d, 'driverPay');
          if( tableData ) return tableData;

          const loadedMiles = this.numberFormat(d.loadedMiles);
          const emptyMiles = this.numberFormat(d.emptyMiles);
          let totalDriverPay = (loadedMiles + emptyMiles) * driverPay
          totalDriverPay = isNaN(totalDriverPay) ? null : totalDriverPay;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.dollarFormat(totalDriverPay, 0, "$")
              }}
            />
          );

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

          const tableData = this.returnTableData(d, 'dispatchFee');
          if( tableData ) return tableData;

          let payment = this.numberFormat(d.payment)
          let dispatchFee = payment * dispatchPercent;

          dispatchFee = isNaN(dispatchFee) ? null : dispatchFee;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.dollarFormat(dispatchFee, 0, "$")
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

          const tableData = this.returnTableData(d, 'totalExpenses');
          if( tableData ) return tableData;

          let payment = this.numberFormat(d.payment)
          const loadedMiles = this.numberFormat(d.loadedMiles);
          const emptyMiles = this.numberFormat(d.emptyMiles);

          let totalExpenses =
            ((loadedMiles + emptyMiles) / mpg * dieselppg) +
            ((loadedMiles + emptyMiles) * driverPay) +
            (payment * dispatchPercent) +
            this.numberFormat(d.lumper) + this.numberFormat(d.detention) +
            this.numberFormat(d.detentionDriverPay) + this.numberFormat(d.lateFee) +
            this.numberFormat(d.toll) + this.numberFormat(d.roadMaintenance) +
            this.numberFormat(d.otherExpenses);

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
        minWidth: 80,
        accessor: d => {
          const tableData = this.returnTableData(d, 'profit');
          if( tableData ) return tableData;

          let payment = this.numberFormat(d.payment)
          const loadedMiles = this.numberFormat(d.loadedMiles);
          const emptyMiles = this.numberFormat(d.emptyMiles);

          let totalExpenses =
            ((loadedMiles + emptyMiles) / mpg * dieselppg) +
            ((loadedMiles + emptyMiles) * driverPay) +
            (payment * dispatchPercent) +
            this.numberFormat(d.lumper) + this.numberFormat(d.detention) +
            this.numberFormat(d.detentionDriverPay) + this.numberFormat(d.lateFee) +
            this.numberFormat(d.toll) + this.numberFormat(d.roadMaintenance) +
            this.numberFormat(d.otherExpenses);

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

    if(this.state.columns.length > 0){
      this.state.columns.forEach( (col, idx) => {
        columns[idx].show = col.show;
      })
    }
    return columns;
  }

  render() {

    const { load, classes } = this.props;
    console.log("*** render LoadsData this.props ", this.props, "state ", this.state);

    const columns = this.createColumns()
      // this.state.columns.length > 0 ? this.state.columns : this.createColumns();

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
      editLoad: freightActions.editLoad,
      saveNewLoad: freightActions.saveNewLoad,
      editExistingLoad: freightActions.editExistingLoad,
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
