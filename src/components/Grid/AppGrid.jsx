import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { GridLoader } from '../Helper/GridLoader';

export const  AppGrid = () => {
  const [products, setProducts] = React.useState({
    data: [],
    total: 77
  });
  const [dataState, setDataState] = React.useState({
    take: 10,
    skip: 0
  });
  const dataStateChange = e => {
    setDataState(e.dataState);
  };
  const dataReceived = products => {
    if (products.data) {
      setProducts(products);
    } else {
      setProducts({
        data: [],
        total: 0
      });
    }
  };
  return <div className='m-2'>
      <Grid filterable={true} sortable={true} pageable={true} {...dataState} data={products} onDataStateChange={dataStateChange}>
        {/* <Column field="ProductID" filter="numeric" title="Id" /> */}
        <Column field="Name" title="Name" />
        <Column field="ExeName" title="Exe Name" />
        <Column field="StartMode" filter="numeric"  title="Start Mode" />
        {/* <Column field="UnitsInStock" filter="numeric" title="In stock" /> */}
      </Grid>

      <GridLoader Controller="Application" dataState={dataState} onDataReceived={dataReceived} />
    </div>;
};
