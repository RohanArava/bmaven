import {
    createBrowserRouter,
    Route,
    createRoutesFromElements
  } from "react-router-dom";

import App from "./App";
import Business from "./Pages/Business";
import Dashboard from "./Pages/Dashboard";

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<App/>}> 
      <Route path="business" element={<Business/>}>
        <Route path="dash" element={<Dashboard/>}/>
        <Route path="services" element={<div></div>}/>
      </Route>
      </Route>
    ), {
      location:"/business/dash"
    });
export default router; 