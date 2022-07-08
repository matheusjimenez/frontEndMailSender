import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Login } from "./pages/login";
import { Home } from "./pages/home";

const AppRoutes = () => {
   return(
       <BrowserRouter>
        <Routes>
            <Route element={ <Login/> }  path="/" exact />
            <Route element={<Home/>} path="/home" />
        </Routes>
       </BrowserRouter>
   )
}

export default AppRoutes;