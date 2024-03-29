import {
  createBrowserRouter,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import Report from "./Pages/Report";
import Error from "./Pages/Error";
import App from "./App";
import Business from "./Pages/Business";
import Dashboard from "./Pages/Dashboard";
import Edit from "./Pages/Edit";
import Notifications from "./Pages/Notifications";
import User from "./Pages/User";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import { Navigate } from 'react-router-dom';
import Admin, {AdminDash, ManageBusinesses, ManageCustomers} from "./Pages/Admin";
import AdminAuth from "./Pages/AdminAuth";
import Service from "./Pages/Service";
import { Payment } from "./Pages/Payment";
import  Bills  from "./Pages/Bills";
import SignUser from "./Pages/SignUser";
import EventForm from "./Pages/BillingForm";
import AboutUs from "./Pages/AboutUs";
import Landing from "./Pages/Landing";
import Collection from "./Pages/Collection";
import Buy from "./Pages/Buy";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="a" element={<Admin/>}>
        <Route path="auth" element={<AdminAuth/>}/>
        <Route path="dashboard" element={<AdminDash/>}/>
        <Route path="managecustomers" element={<ManageCustomers/>}/>
        <Route path="managebusinesses" element={<ManageBusinesses/>}/>
      </Route>
      <Route path="b" element={<Business />}>
        <Route path="dash" element={<Dashboard />} />
        <Route path="edit" element={<Edit />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="billing" element={<EventForm />} />
        <Route path="about" element={<AboutUs />} />
      </Route>
      <Route path="u" element={<User/>}>
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} />
        <Route path="service/:id" element={<Service />} />
        <Route path="payment" element={<Payment />} />
        <Route path="bills" element={<Bills />} />
        <Route path="sign" element={<SignUser />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="report" element={<Report/>}/>
        <Route path="buy/:id" element={<Buy/>}/>
        {/* <Route path="*" element={<Navigate to="/u/search"/>}/> */}
      </Route>
      <Route path="collection/:id" element={<Collection/>}/>
      <Route path="" element={<Landing/>}/>
      <Route path="*" element={<Error message="Not Found"/>}/>
    </Route>
  ), {
  location: "/u/sign"
});
export default router; 