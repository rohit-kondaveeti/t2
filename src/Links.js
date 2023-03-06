import React from 'react';
import {Link, Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import Habits from './Habits';


const Links = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/habits" element={Habits} />
    </Routes>
    </BrowserRouter>
  )
}

export default Links