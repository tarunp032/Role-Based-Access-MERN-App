import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from './pages/Navbar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar /> 
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/view-products" element={<ViewProducts />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App