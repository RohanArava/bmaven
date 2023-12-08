import {
  createBrowserRouter,
  Route,
  createRoutesFromElements
} from "react-router-dom";

import App from "./App";
import Business from "./Pages/Business";
import Dashboard from "./Pages/Dashboard";
import Edit from "./Pages/Edit";
import Notifications from "./Pages/Notifications";
import User from "./Pages/User";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import { Navigate } from 'react-router-dom';
import Service from "./Pages/Service";
import { Payment } from "./Pages/Payment";
import  Bills  from "./Pages/Bills";
import SignUser from "./Pages/SignUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="b" element={<Business />}>
        <Route path="dash" element={<Dashboard />} />
        <Route path="edit" element={<Edit />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route path="u" element={<User/>}>
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} />
        <Route path="service/:id" element={<Service />} />
        <Route path="payment" element={<Payment />} />
        <Route path="bills" element={<Bills />} />
        <Route path="sign" element={<SignUser />} />
        {/* <Route path="*" element={<Navigate to="/u/search"/>}/> */}
      </Route>
      <Route path="" element={<Navigate to="/u/search"/>}/>
    </Route>
  ), {
  location: "/business/dash"
});
export default router; 