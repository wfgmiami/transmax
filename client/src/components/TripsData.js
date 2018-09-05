import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class TripsData extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          bookDate: "08/31/18",
          truckNumber: "117",
          driverName: "Kelvin",
          loadNumber: "0277377",
          broker: "Transplace",
          amount: 600,
          loadedMiles: 300,
          emptyMiles: 258,
          mileage: 0,
          dollarPeMile: 0,
          dieselPrice: 0,
          fuelCost: 0,
          driverPay: 0,
          dispatchFee: 0,
          lumper: 0,
          detention: 0,
          detentionDriverPay: 0,
          lateFee: 0,
          tollFee: 0,
          roadMaintenance: 0,
          otherExpenses: 0,
          totalExpense: 0,
          profit: 0
        },
        {
          bookDate: "09/01/18",
          truckNumber: "118",
          driverName: "Kelvin",
          loadNumber: "0277377",
          broker: "Transplace",
          amount: 1200,
          loadedMiles: 600,
          emptyMiles: 358,
          mileage: 0,
          dollarPeMile: 0,
          dieselPrice: 0,
          fuelCost: 0,
          driverPay: 0,
          dispatchFee: 0,
          lumper: 0,
          detention: 0,
          detentionDriverPay: 0,
          lateFee: 0,
          tollFee: 0,
          roadMaintenance: 0,
          otherExpenses: 0,
          totalExpense: 0,
          profit: 0
        },
        {
          bookDate: "09/03/18",
          truckNumber: "119",
          driverName: "Kelvin",
          loadNumber: "0277377",
          broker: "Transplace",
          amount: 850,
          loadedMiles: 400,
          emptyMiles: 150,
          mileage: 0,
          dollarPeMile: 0,
          dieselPrice: 0,
          fuelCost: 0,
          driverPay: 0,
          dispatchFee: 0,
          lumper: 0,
          detention: 0,
          detentionDriverPay: 0,
          lateFee: 0,
          tollFee: 0,
          roadMaintenance: 0,
          otherExpenses: 0,
          totalExpense: 0,
          profit: 0
        }
      ],
      editable: false
    };

    this.editTable = this.editTable.bind(this);
    this.editRow = this.editRow.bind(this);
    this.saveRows = this.saveRows.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addEmptyRow = this.addEmptyRow.bind(this);
  }

  editTable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  editRow(row) {
    console.log("edit", row);
    this.setState({ editable: true });
  }

  deleteRow(row) {
    console.log("delete", row);
  }

  saveRows() {
    console.log("save");
  }

  addEmptyRow() {
    this.setState({
      data: this.state.data.concat({})
    });
  }

  render() {
    const { data } = this.state;
    const editFunc = this.state.editable ? this.editTable : null;

    return (
      <div>
        <div>
          <button onClick={this.addEmptyRow}>Add</button>&nbsp;
          <button onClick={this.saveRows}>Save</button>
        </div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Date",
              accessor: "bookDate",
              Cell: editFunc
            },
            {
              Header: "Truck Number",
              accessor: "Truck",
              Cell: editFunc
            },
            {
              Header: "Driver",
              accessor: "driverName",
              Cell: editFunc
            },
            {
              Header: "Load",
              accessor: "loadNumber",
              Cell: editFunc
            },
            {
              Header: "Broker",
              accessor: "broker",
              Cell: editFunc
            },
            {
              Header: "Amount",
              accessor: "amount",
              Cell: editFunc
            },
            {
              Header: "Loaded Miles",
              accessor: "loadedMiles",
              Cell: editFunc
            },
            {
              Header: "Empty Miles",
              accessor: "emptyMiles",
              Cell: editFunc
            },
            {
              Header: "Mileage",
              id: "mileage",
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
              id: "dollarPerMile",
              accessor: d => {
                let dollarPerMile =
                  Number(d.amount) /
                  (Number(d.loadedMiles) + Number(d.emptyMiles));
                dollarPerMile = isNaN(dollarPerMile) ? null : dollarPerMile;
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: Number(dollarPerMile).toFixed(2)
                    }}
                  />
                );
              }
            },
            {
              id: "edit",
              accessor: "edit",
              Cell: row => (
                <div>
                  <button onClick={() => this.editRow(row)}>Edit</button>&nbsp;
                  <button onClick={() => this.deleteRow(row)}>Delete</button>
                </div>
              )
            }
          ]}
          defaultPageSize={10}
          style={{
            height: "400px"
          }}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
