import React from 'react'
import ViewRecords from './ViewRecords';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddRecord from './AddRecord';
import EditRecord from './EditRecord';

const ParentComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='' element={<ViewRecords/>}></Route>
            <Route path='/add_record' element={<AddRecord/>}></Route>
            <Route path='/edit_record/:p_id/:p_name/:p_cost/:p_image' element={<EditRecord/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default ParentComponent
