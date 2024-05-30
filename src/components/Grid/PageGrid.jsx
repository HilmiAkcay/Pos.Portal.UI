import * as React from "react";
import { Grid, GridColumn as Column,GridToolbar } from "@progress/kendo-react-grid";
import { GridLoader } from "../Helper/GridLoader";

export const PageGrid = () => {
  const [products, setProducts] = React.useState({
    data: [],
    total: 0,
  });

  const [editID, setEditID] = React.useState(null);
  const [dataState, setDataState] = React.useState({
    take: 5,
    skip: 0,
  });

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const dataReceived = (products) => {
    console.log('dataReceived');
    if (products.data) {
      var data = products.data.map((item) => ({
        ...item,
        inEdit: item.ID === editID,
      }));
      products.data = data;
      setProducts(products);
    } else {
      setProducts({
        data: [],
        total: 0,
      });
    }
  };

  const handleChange = (e) => {
    console.log('handle change');
    console.log(e);
    const newData = products.data.map((item) =>
      item.ID === e.dataItem.ID ? { ...item, [e.field]: e.value } : item
    );
    console.log(newData);

    products.data = newData;
    setProducts(products);
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
      PurePosId:0
    };
    console.log(newRecord);
    products.data = [newRecord, ...products.data];
    setProducts(products);
   
    setEditID(newRecord.ID);
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
         data={ 
           products.data.map((item) => ({
           ...item,
           inEdit: item.ID === editID,
         }))}
         total={products.total}
        editField="inEdit"
        onRowClick={handleEdit}
        onItemChange={handleChange}
        onDataStateChange={dataStateChange}
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
        {/* <Column field="ProductID" filter="numeric" title="Id" /> */}
        <Column
          field="PurePosId"
          filter="numeric"
          title="Pos Menu Id"
          editable={true}
          editor="numeric"
        />
        <Column field="Name" title="Name" editor="text" />
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
