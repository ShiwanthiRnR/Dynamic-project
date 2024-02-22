import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import {SERVER_IP,DEVICE_ENVIRONMENT4_END_POINT} from '../Pages/CommanConstants.jsx';

// import FormDialog from '../../../components/Quantity_dialogbox'
// import { Button, Grid } from '@mui/material';

const Aggrid = () => {
    const[gridApi,setGridApi]=useState(null)
const [tableData, setTableData] = useState(null);
const [open, setOpen] = React.useState(false);
const [formData, setFormData] = useState({ Quantity:''})
const [rowData, setRowData] = useState([]);
const [selectedRows, setSelectedRows] = useState([]);

axios.defaults.baseURL = `http://${SERVER_IP}`;


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setFormData(formData)
};

  const columnDefs = [
    {headerName:"ID", field:  "id", filter: true, editable: true, cellEditor: 'agTextCellEditor' },
    {headerName:"Quantity", field: "quantity", filter: true ,editable: true, cellEditor: 'agTextCellEditor'},
    {headerName:"Item", field: "item", filter: true ,editable: true, cellEditor: 'agTextCellEditor'},
    {headerName:"Date_and_time" ,field: "uploadDateAndTime",editable: true, cellEditor: 'agTextCellEditor' },
    // {headerName:"Time" ,field: "Time",editable: true, cellEditor: 'agTextCellEditor' },
 
  ];

  const onChange = (e) => {
  const { value, id } = e.target
   // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  useEffect(() => {
    getItem ();
  }, []); 


  const getItem = () => {
   
    axios.get("/"+ DEVICE_ENVIRONMENT4_END_POINT+"/getAll")
      .then(response => {
        console.log(response);
        setTableData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
  }

 const onGridReady =(params) => {
  setGridApi(params.api)
 
 }
 const handleUpdate = (oldData) => {
  setFormData(oldData)
  handleClickOpen()
}


  const handleDelete = () => {
    const confirm = window.confirm("Are you sure, you want to delete this row?");
    if (confirm) {
      if (gridApi) {
        const selectedNodes = gridApi.getSelectedNodes();
        if (selectedNodes.length > 0) {
          const selectedNode = selectedNodes[0];
          const { id } = selectedNode.data;
          console.log(selectedNode);
          
          axios.delete(`http://192.168.1.6:8082/Delete_user/${id}`)
            .then(() => {
              // Remove the deleted row from the grid's data
              const updatedRowData = rowData.filter((row) => row.id !== id);
              setRowData(updatedRowData);
            })
            .catch((error) => {
              console.error('Error deleting the row:', error);
            });
        }
      }
    }
  };
    
  





// Send the updated data 
// const onCellEditingStopped = useCallback((event) => {
//   const { data, colDef, newValue } = event;
//   console.log(data);
//   axios.put("http://192.168.1.6:8082/Update_user", {
//     id: data.id, 
//     field: colDef.field,
//     value: newValue,
//   })
//   console.log(data)
//     .then((response) => {
//       if (response.emailAssociated) {
//         // Data updated successfully
//         console.log('Data updated successfully');
//       } else {
//         console.error('Data update failed');
//       }
//     })
//     .catch((error) => {
//       console.error('Network error:', error);
//     });
// }, []);

 const handleFormSubmit = () => {
  console.log(formData);

  
  
  // adding new item
  axios
  .post("http://192.168.1.6:8082/add_user", formData,)
  .then((response) => {
    if(response.data.emailAssociated){
      console.log(response);
      getItem();
    }
    console.log(response);
     handleClose();
    
   })
  .catch((error) => {
     console.error('Error:', error);
   });  
  }
  const defaultColDef = {
    sortable:true,
    flex:1,filter:true,
    floatingFilter:true
  };
  return (

  <div >
   {/* <Grid align="right" >
   <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Quantity</Button>
   </Grid> */}
  
   <div className="ag-theme-alpine m-3 " style={{width: "100%", height: 920,marginLeft:10}}>
  <AgGridReact
     rowData={tableData}
     columnDefs={columnDefs}

     defaultColDef={defaultColDef}
     onGridReady={onGridReady}
    //  onCellEditingStopped={onCellEditingStopped}//add this
     rowSelection="single"
     
      
   />
    
 </div>
  {/* <FormDialog open={open} handleClose={handleClose}
  data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} /> */}
</div>


  )
}


export default Aggrid