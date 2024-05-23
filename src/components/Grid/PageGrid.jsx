import * as React from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { GridLoader } from "../Helper/GridLoader";

export const PageGrid = () => {
  const [products, setProducts] = React.useState({
    data: [],
    total: 77,
  });

  const [editID, setEditID] = React.useState(null);
  const [dataState, setDataState] = React.useState({
    take: 10,
    skip: 0,
  });

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const handleSave = () => {
    setEditID(null);
  };

  const handleCancel = () => {
    setEditID(null);
  };

  const dataReceived = (products) => {
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
    const newData = products.map((item) =>
      item.id === e.dataItem.id ? { ...item, [e.field]: e.value } : item
    );
    setProducts(newData);
  };

  const handleEdit = (dataItem) => {
    setEditID(dataItem.id);
  };

  return (
    <div className="m-2">
      <Grid
        dataItemKey={"ID"}
        filterable={true}
        sortable={true}
        pageable={true}
        {...dataState}
        data={products}
        editField="inEdit"
        onRowClick={handleEdit}
        onItemChange={(e) => handleEdit(e.dataItem)}
        onDataStateChange={dataStateChange}
      >
        {/* <Column field="ProductID" filter="numeric" title="Id" /> */}
        <Column
          field="PurePosId"
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
