import React, { Component } from "react";
import ReactTable from "react-table";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { Datatable } from "./Datatable";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import ActionBtn from "./ActionBtn";
import Edit from '@material-ui/icons/Edit';
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

class BrokersData extends Component {
  constructor() {
    super();
    this.state = {
      data: copyOfDatable,
      columns: [],
      editableRowIndex: []
    };

    this.editTable = this.editTable.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.onColumnUpdate = this.onColumnUpdate.bind(this);
  }

  componentDidMount() {
    if(this.props.broker.length === 0){
      this.props.getBroker();
    }
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
    let fieldToReturn;

    const findEditableRow = this.state.editableRowIndex.find(
      row => row === cellInfo.index
    );
    fieldValue = this.props.broker[cellInfo.index][cellInfo.column.id]

    switch (cellInfo.column.id) {
      case "payment":
      case "dieselPrice":
        dollarSign = "$";
        break;
      default:
        dollarSign = "";
    }

    // for numbers stored as strings:
    if( typeof(fieldValue) === 'string' && !isNaN(fieldValue) && cellInfo.column.id !== 'loadNumber') {
      fieldValue = isNaN(Number(fieldValue)) ? fieldValue : Number(fieldValue).toLocaleString()
    }

    fieldToReturn = ( cellInfo.value === '' || cellInfo.value === 0 || fieldValue === '' || fieldValue === '0' )  ? '' :
      (findEditableRow || findEditableRow === 0) ? fieldValue.toLocaleString() :
      dollarSign + fieldValue.toLocaleString()
    // console.log('field to return ', fieldToReturn)
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

          {/* console.log('updateInfo on bluer', updateInfo) */}
          this.props.editBroker(updateInfo);
        }}
        dangerouslySetInnerHTML={{
          __html:fieldToReturn
            // dollarSign +
            //fieldValue.toLocaleString()
        }}
      />
    ) : (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{
          __html: fieldToReturn
          //  dollarSign +
          //  fieldValue.toLocaleString()
        }}
      />
    );
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const brokersCount = data.length;
    let value;

    const total = data.reduce((memo, broker) => {
      // console.log("....info", broker,column.id, broker[column.id]);
      if (typeof broker[column.id] === "object") {
        value = broker[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = broker[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(broker[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "totalPayment") {
      if (column.id === "avgDollarPerMile") {
        return "$" + Number((total / brokersCount).toFixed(2)).toLocaleString();
      }
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "name") {
      return `Brokers: ${brokersCount}`;
    }

    return Number(Number(total).toFixed(0)).toLocaleString();
  }

  onColumnUpdate(index) {
     console.log("onColumnUpdate index ", index, "...", this.state.columns);
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

  createBroker(row){
    let broker = {};

    Object.keys(row).forEach( key => {
      if( typeof row[key] === "object" && key !== "_original" ){
        broker[key] = row[key].props.dangerouslySetInnerHTML.__html;
        if(broker[key] && broker[key].substring(0,1) === '$') broker[key] = broker[key].slice(1);
      }else if(!key.includes('_') && !key.includes(".") && key !== 'edit') {
        broker[key] = row[key];
      }
    })

    return broker;
  }

  editRow = (row) => {
    // console.log('.....',row)

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
      let broker = this.createBroker(row.row);

      console.log('*** editRow before updateBroker ', broker)
      this.props.updateBroker(broker);
    } else {
      this.setState({
        editableRowIndex: [...this.state.editableRowIndex, row.index]
      });
    }
  }

  saveRow = (selectedRow) => {
    let result = window.confirm("Do you want to save this row");
    if(!result) return null;

    let rowToUpdate = {};
    let toSaveRow = {};

    rowToUpdate = selectedRow.row;

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

    const newRow = Object.assign(rowToUpdate, toSaveRow);
    console.log("*** BrokersData save row ",  newRow)
    this.props.saveBroker(newRow);
    alert("The broker was saved")
  }

  createColumns() {
    console.log("BrokersData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Broker Id",
        accessor: "id",
        show: false,
        className: "columnBorder",
      },
      {
        Header: "Name",
        Footer: this.calculateTotal,
        accessor: "name",
        show: true,
        minWidth: 170,
        className: "columnBorder",
      },
      {
        Header: "Address",
        accessor: "address",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Phone",
        accessor: "phone",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Email",
        accessor: "email",
        show: false,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Booked Loads",
        Footer: this.calculateTotal,
        accessor: "bookedLoads",
        show: true,
        className: "columnBorder",
      },
      {
        Header: "Total Payment",
        Footer: this.calculateTotal,
        accessor: "totalPayment",
        show: true,
        className: "columnBorder",
      },
      {
        Header: "Total Loaded Miles",
        Footer: this.calculateTotal,
        accessor: "totalLoadedMiles",
        show: true,
        className: "columnBorder",
      },
      {
        Header: "$/Mile",
        Footer: this.calculateTotal,
        id: "avgDollarPerMile",
        show: true,
        className: "columnBorder",
        accessor: d => {
        let dollarPerMile = Number(d.totalPayment) / Number(d.totalLoadedMiles);
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
    const { broker, classes } = this.props;

    console.log("BrokersData.js broker ", broker);

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
          data={broker}
          showPaginationBottom={true}
          columns={columns}
          defaultPageSize={20}
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
    broker: company.broker
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBroker: companyActions.getBroker,
      updateBroker: companyActions.updateBroker,
      editBroker: companyActions.editBroker,
      saveBroker: companyActions.saveBroker
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(BrokersData)
  )
);
