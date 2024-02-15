import React from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import { info } from "./info";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";

const App = () => {
  const [data, setData] = React.useState(info);
  const [editID, setEditID] = React.useState(null);
  const rowClick = (event) => {
    setEditID(event.dataItem.Company);
  };
  const itemChange = (event) => {
    const inEditID = event.dataItem.Company;
    const field = event.field || "";
    const newData = data.map((item) =>
      item.Company === inEditID
        ? {
            ...item,
            [field]: event.value,
          }
        : item
    );
    setData(newData);
  };
  const closeEdit = (event) => {
    if (event.target === event.currentTarget) {
      setEditID(null);
    }
  };
  const addRecord = () => {
    const newRecord = {
      Company: data.length + 1,
    };
    setData([newRecord, ...data]);
    setEditID(newRecord.Company);
  };
  return (
    <Grid
      style={{
        height: "420px",
      }}
      data={data.map((item) => ({
        ...item,
        inEdit: item.Company === editID,
      }))}
      editField="inEdit"
      onRowClick={rowClick}
      onItemChange={itemChange}
    >
      <GridToolbar>
        <div onClick={closeEdit}>
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={addRecord}
          >
            Add new
          </button>
        </div>
      </GridToolbar>
      <GridColumn
        field="Company"
        title="Company"
        width="150px"
        editor="text"
      />
      <GridColumn
        field="Primary_Tag"
        title="Primary Tag"
        width="150px"
        editor="text"
      />
      <GridColumn
        field="Beginning_Balance"
        title="Beginning Balance"
        width="150px"
        editor="numeric"
      />
      <GridColumn
        field="Invoice"
        title="Invoice"
        width="150px"
        editor="numeric"
      />
      <GridColumn
        field="Adjustment"
        title="Adjustment"
        width="150px"
        editor="numeric"
      />
      <GridColumn
        field="Accrual"
        title="Accrual"
        width="150px"
        editor="numeric"
      />
      <GridColumn
        title="Calculated End Balance"
        width="150px"
        cell={props => (
          <td>
            {(props.dataItem.Beginning_Balance + props.dataItem.Invoice + props.dataItem.Adjustment + props.dataItem.Accrual).toLocaleString()}
          </td>
        )}
      />
    </Grid>
  );
};

export default App;
