import * as React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { GridLoader } from "../Helper/GridLoader";
import { Button } from '@progress/kendo-react-buttons';

export const PageGrid = () => {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [editID, setEditID] = React.useState(null);
  const [dataState, setDataState] = React.useState({
    take: 5,
    skip: 0,
  });

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const dataReceived = (products) => {
    console.log("dataReceived");
    if (products.data) {
      var data = products.data.map((item) => ({
        ...item,
        inEdit: item.ID === editID,
      }));
      setData(data);
      setTotal(products.total);
    } else {
      setData([]);
      setTotal(0);
    }
  };

  const handleChange = (e) => {
    console.log("handle change");
    console.log(e);
    const newData = data.map((item) =>
      item.ID === e.dataItem.ID ? { ...item, [e.field]: e.value } : item
    );
    console.log(newData);
    setData(newData);
  };

  const handleEdit = (e) => {
    console.log(e.dataItem.ID);
    setEditID(e.dataItem.ID);
  };

  const closeEdit = (event) => {
    if (event.target === event.currentTarget) {
      setEditID(null);
    }
  };
  const addRecord = () => {
    const newRecord = {
      ID: -1,
    };
    console.log(newRecord);
    const addedData = [newRecord, ...data];
    setData(addedData);
    setEditID(newRecord.ID);
  };

  const saveEdit = async () => {
    const editItem = data.find(f=>f.ID === editID);
    console.log(editItem);
    setEditID(null);
    try {
      const response = await fetch('http://localhost:5027/api/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(editItem),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      // Optimistic UI update
      const newData = data.filter(d => d.id !== item.id);
      setData(newData);
    }
  };

  const DeleteButtonCell = (props) => {
    return (
      <td>
        <Button onClick={() => handleDelete(props.dataItem)}>Delete</Button>
      </td>
    );
  };

  return (
    <div className="m-2">
      <Grid
        dataItemKey={"ID"}
        filterable={true}
        sortable={true}
        pageable={true}
        {...dataState}
        //  data={products}
        data={data.map((item) => ({
          ...item,
          inEdit: item.ID === editID,
        }))}
        total={total}
        editField="inEdit"
        onRowClick={handleEdit}
        onItemChange={handleChange}
        onDataStateChange={dataStateChange}
      >
        <GridToolbar>
          <div onClick={closeEdit}>
            <button
              title="Add new"
              className=" mr-2 k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={addRecord}
            >
              Add new
            </button>
            <Button className=" mr-2 k-button k-button-md k-rounded-md k-button-solid k-button-solid-success" onClick={saveEdit} disabled={editID === null}>Save All Changes</Button>
          </div>
        </GridToolbar>
        {/* <Column field="ProductID" filter="numeric" title="Id" /> */}
        <Column
          field="PurePosId"
          filter="numeric"
          title="Pos Menu Id"
          editable={true}
          editor="numeric"
        />
        <Column field="Name" title="Name" editor="text" />
        <Column cell={DeleteButtonCell} title="Actions" />
        {/* <Column field="ExeName" title="Exe Name" />
        <Column field="StartMode" filter="numeric"  title="Start Mode" /> */}
        {/* <Column field="UnitsInStock" filter="numeric" title="In stock" /> */}
      </Grid>

      <GridLoader
        Controller="Page"
        dataState={dataState}
        onDataReceived={dataReceived}
      />
    </div>
  );
};
