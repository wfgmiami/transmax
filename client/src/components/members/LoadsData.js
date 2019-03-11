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
import { loadsTextFields } from "../../configs/loadsConfig";
import { loadsNumberFields } from "../../configs/loadsConfig";
import { loadsMandatoryFields } from "../../configs/loadsConfig";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import ActionBtn from "./ActionBtn";
import DateFilter from "./DateFilter";
import CustomPagination from "./CustomPagination.js";
import InputsVariableCost from './InputsVariableCost';
import moment from 'moment';
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
  },
  reactTable: {
    height: '800px'
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
    this.updateFullRowState = this.updateFullRowState.bind(this);
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

  toFormatNumber(strNum, dec, sign){
    // 1200 => "$1,200"
    // "1200" || "1,200" => "$1,200" or "1,200"
    // console.log('strNum ', strNum, dec, sign)
    if(strNum === null || strNum === "") return strNum;

    if(typeof strNum === 'number') return  sign + Number(strNum.toFixed(dec)).toLocaleString();
    return sign + Number(Number(strNum.replace(",","")).toFixed(dec)).toLocaleString();
  }

  toNumber(num){
    // "$1,200" || "1,200" => 1200 OR "$600" || "600" => 600
    // console.log('*** toNumber num: ', num, ' type of ', typeof num === 'number')

    if (typeof num === 'number') return num;
    num = num.includes("$") ? num.slice(1) : num;
    return parseFloat(num.replace(",",""));
  }

  editTable(cellInfo) {
    // when entering data into editable fields of the table
    // will update only the editable fields in the state(payment, loaded miles, etc)
    // calculated fields (eg dispatch cost) will be changed by updateFullRowState

    // console.log(
    //   "cell info........",
    //   cellInfo,
    //   "cellInfo.column.id ",
    //   cellInfo.column.id,
    //   'cellInfo.row[cellInfo.column.id]:',
    //   cellInfo.row[cellInfo.column.id]
    // );

    //cellInfo.column.id is the column name (eg. pickupDate)
    //cellInfo.row[cellInfo.column.id] is the cell value for that column

    let fieldValue;
    // let fieldToReturn;

    const findEditableRow = this.state.editableRowIndex.find(
      row => row === cellInfo.index
    );

    switch (cellInfo.column.id) {
      case loadsNumberFields[1]:
      case loadsNumberFields[9]:
      case loadsNumberFields[10]:
      case loadsNumberFields[11]:
      case loadsNumberFields[12]:
      case loadsNumberFields[13]:
      case loadsNumberFields[14]:
      case loadsNumberFields[15]:
      case loadsNumberFields[16]:
        fieldValue = cellInfo.value ? this.toFormatNumber(cellInfo.value, 2 , '$') : null
        break;
      case loadsNumberFields[0]:
      case loadsNumberFields[2]:
      case loadsNumberFields[3]:
        fieldValue = cellInfo.value ? this.toFormatNumber(cellInfo.value, 0 , '') : null
        break;
      default:
        fieldValue = cellInfo.value;
    }

    if(cellInfo.column.id === 'pickupDate' &&
    cellInfo.value !== ''){
    let dt = new Date(cellInfo.value).toISOString().slice(0,10);
    fieldValue = moment(dt).format("MM/DD/YYYY");
  }

  //give the company name associated with the truck
  if(cellInfo.column.id === 'truck.company.name'){
    fieldValue = this.props.load[cellInfo.index]['truck'] ?
    this.props.load[cellInfo.index]['truck']['company'].name : '';
  }

  // fieldToReturn = ( cellInfo.value === '' || cellInfo.value === 0 || fieldValue === '' || fieldValue === '0' )  ? '' :
  // fieldValue

    // if edit is enabled- first case, if it is not- second case
    return findEditableRow || findEditableRow === 0 ? (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        // suppressContentEditableWarning
        onBlur = { e => {
          const keyToUpdate = cellInfo.column.id;
          let valueToUpdate = e.target.innerHTML;
          if (loadsTextFields.indexOf(keyToUpdate) == -1 && keyToUpdate !== 'truck.company.name')
            valueToUpdate = this.toNumber(e.target.innerHTML);

          const indexToUpdate = cellInfo.index;

          const updateInfo = {
            keyToUpdate: keyToUpdate,
            valueToUpdate: valueToUpdate,
            indexToUpdate: indexToUpdate
          }

          console.log('updateInfo on blur', updateInfo)
          this.props.editLoad(updateInfo);
        }}

        dangerouslySetInnerHTML={{
          __html:fieldValue
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        dangerouslySetInnerHTML={{
          __html: fieldValue
        }}
      />
    );
  }

  createLoad(row){
    // used in updateFullRowState to persist the calculated fields(ie fuel cost, expenses, etc)
    let load = {};
    let rowToSave = {}

    let keys = Object.keys(row);

    keys.forEach( key => {

      let loadItem = row[key];
      if(typeof(loadItem) === 'object' && key !== '_original'){
        let value = loadItem.props.dangerouslySetInnerHTML.__html;

        value = this.toNumber(value);
        console.log('object != _original value2: ', value)
        rowToSave[key] = value;
      } else if (!key.includes('_') && !key.includes(".") && key !== 'edit') {
        console.log('!key.incuded(_ .) ', row[key], ' key: ', key, 'load item: ', loadItem)
        rowToSave[key] = loadItem;
      }

      if ( typeof loadItem === "string" && loadItem.includes("&") ) {
        let ampPos = loadItem.indexOf("&");
        // console.log("ampPos ", loadItem.substring(0, ampPos).concat("&").concat(loadItem.substring(ampPos + 1)))

        loadItem = loadItem.substring(0, ampPos).concat("&").concat(loadItem.substring(ampPos + 1));
        rowToSave[key] = loadItem;

      }

    })

    return rowToSave;

  }

  updateFullRowState(row) {
    // when activating/deactivating row edit mode
    // needed so that the changes to the formula fields(eg dispatch cost) are
    // updated in the state
    const alreadyEditable = this.state.editableRowIndex.find(
      editableRow => editableRow === row.index
    );

    // console.log("LoadsData.js updateFullRowState ", row, "state: ", this.state, " ",alreadyEditable);
    // first condition triggers when button is clicked second time(to close edit mode)
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
      console.log('*** updateFullRowState ', load)
      this.props.updateLoad(load);

    //this condition triggers when button is clicked first time(to open edit mode)
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
    let result = window.confirm("Do you want to save this row");
    if(!result) return null;

    console.log("*** selectedRow ",  selectedRow)
    let rowToUpdate = selectedRow.row;
    let keys = Object.keys(rowToUpdate);

    const emptyFields = keys.map( key => {
      if(!rowToUpdate[key] && rowToUpdate[key] !== 0)
        return key
      else return null
    })
      .filter(loadItem => loadItem)

    const requiredFieldsCheck = emptyFields.map( loadItem => {
      if(loadsMandatoryFields.includes( loadItem ))
        return loadItem
      else return null
    })
      .filter(result => result)

    if(requiredFieldsCheck.length > 0) {
      const msgString = requiredFieldsCheck.join(", ");
      alert("Required fields: \n" +  msgString)

    } else {
      let loadToSave = {};
      const origId = selectedRow.original.id ? selectedRow.original.id : null;
      const rowIndex = selectedRow.index ? selectedRow.index : null;

      if (origId) {
        loadToSave = this.props.load.filter( load => load.id === origId )[0]
        this.props.saveExistingLoad(loadToSave);
      } else {
        loadToSave = this.props.load.filter( load => load.rowIndex === rowIndex )[0]
        this.props.saveNewLoad(loadToSave);
      }

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
      if (column.id === "dollarPerMile" ) {
        return "$" + Number((total / loadsCount).toFixed(2)).toLocaleString();
      } else if( column.id === 'dispatchFee'){
        return "$" + Number(total.toFixed(2)).toLocaleString();
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
    let columns1 = [];
    columns1.push(...columns);

    // console.log("*** LoadsData onColumnUpdate index: ", index, " columns1: ", columns1,
    // " isArray(index): ",  Array.isArray( index ));

    if ( Array.isArray( index ) ){
      columns1 = columns1.map( col => { col.show = false; return col } );
      index.forEach( async ( idx ) => {
        await this.setState( () => {
          columns1[idx].show = true;
          if (columns1[idx].columns) {
            columns1[idx].columns.forEach(item => {
              item.show = true;
            });
          }
          return {
            columns: columns1
          };
        });
      })
    } else {

      this.setState( () => {
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
  }

  // showing data from db when not in edit mode
  returnTableData(data, field){
    const editable = this.state.editableRowIndex;
    let check = 0;
    let dec = (field === "dollarPerMile" || field === 'dispatchFee') ? 2 : 0;
    let dollar = field === "mileage" ? '' : '$';

    if (editable.length === 0) return this.toFormatNumber(data[field],dec,dollar);
    for(let index of editable){
      check++;
      if( this.props.load[index].id === data.id ) return null;
      if( this.props.load[index].id !== data.id && check === editable.length)
        return this.toFormatNumber(data[field],dec,'$')
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
        Header: "Pickup Date",
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
        show: true,
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

          const loadedMiles = d.loadedMiles ? this.toNumber(d.loadedMiles) : 0;
          const emptyMiles = d.emptyMiles ? this.toNumber(d.emptyMiles) : 0;
          const totalMiles = loadedMiles + emptyMiles;
        //  console.log('..............', loadedMiles, typeof loadedMiles, typeof emptyMiles, loadedMiles + emptyMiles)

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.toFormatNumber(totalMiles,0,'')
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

          let payment = this.toNumber(d.payment);
          let loadedMiles = this.toNumber(d.loadedMiles);
          let emptyMiles = this.toNumber(d.emptyMiles);

          let dollarPerMile =
            payment / (loadedMiles + emptyMiles)

          dollarPerMile = isNaN(dollarPerMile) ? null : dollarPerMile;
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.toFormatNumber(dollarPerMile,2,'$')
              }}
            />
          );
        }
      },
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
          const loadedMiles = this.toNumber(d.loadedMiles);
          const emptyMiles = this.toNumber(d.emptyMiles);

          fuelCost = (loadedMiles + emptyMiles) / mpg * dieselppg;
          fuelCost = isNaN(fuelCost) ? null : fuelCost;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.toFormatNumber(fuelCost,0,"$")
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

          const loadedMiles = this.toNumber(d.loadedMiles);
          const emptyMiles = this.toNumber(d.emptyMiles);
          let totalDriverPay = (loadedMiles + emptyMiles) * driverPay
          totalDriverPay = isNaN(totalDriverPay) ? null : totalDriverPay;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.toFormatNumber(totalDriverPay, 0, "$")
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

          let payment = this.toNumber(d.payment)  + this.toNumber(d.detention) + this.toNumber(d.cancelFeeIncome) ;
          let dispatchFee = payment * dispatchPercent;

          dispatchFee = isNaN(dispatchFee) ? null : dispatchFee;
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.toFormatNumber(dispatchFee, 2, "$")
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
        Header: "Cancel Fee Income",
        Footer: this.calculateTotal,
        accessor: "cancelFeeIncome",
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

          let payment = this.toNumber(d.payment) + this.toNumber(d.detention) + this.toNumber(d.cancelFeeIncome)
          const loadedMiles = this.toNumber(d.loadedMiles);
          const emptyMiles = this.toNumber(d.emptyMiles);

          let totalExpenses =
            ((loadedMiles + emptyMiles) / mpg * dieselppg) +
            ((loadedMiles + emptyMiles) * driverPay) +
            (payment * dispatchPercent) +
            this.toNumber(d.lumper) +
            this.toNumber(d.detentionDriverPay) + this.toNumber(d.lateFee) +
            this.toNumber(d.toll) + this.toNumber(d.roadMaintenance) +
            this.toNumber(d.otherExpenses);

          totalExpenses = isNaN(totalExpenses) ? null : totalExpenses;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.toFormatNumber(totalExpenses, 0, "$")
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

          let payment = this.toNumber(d.payment) + this.toNumber(d.detention) + this.toNumber(d.cancelFeeIncome)
          const loadedMiles = this.toNumber(d.loadedMiles);
          const emptyMiles = this.toNumber(d.emptyMiles);

          let totalExpenses =
            ((loadedMiles + emptyMiles) / mpg * dieselppg) +
            ((loadedMiles + emptyMiles) * driverPay) +
            (payment * dispatchPercent) +
            this.toNumber(d.lumper) +
            this.toNumber(d.detentionDriverPay) + this.toNumber(d.lateFee) +
            this.toNumber(d.toll) + this.toNumber(d.roadMaintenance) +
            this.toNumber(d.otherExpenses);

          let profit = payment  - totalExpenses;
          profit = isNaN(profit) ? null : profit;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: this.toFormatNumber(profit, 0, "$")
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
                onClick={() => this.updateFullRowState(row)}
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
    // console.log("*** render LoadsData this.props ", this.props, "state ", this.state);

    const columns = this.createColumns()
      // this.state.columns.length > 0 ? this.state.columns : this.createColumns();

    return (
      <div className = { classes.root }>
        <Toolbar className = { classes.toolbar }>
          <SideMenu />
          &nbsp;
          <DateFilter />
          &nbsp;
          <InputsVariableCost />
          &nbsp;
          <ColumnChooser
            columns = { columns }
            onColumnUpdate = { this.onColumnUpdate }
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
          defaultPageSize={50}
          className={classes.reactTable}
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
      saveExistingLoad: freightActions.saveExistingLoad,
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
