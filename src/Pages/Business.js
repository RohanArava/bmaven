import {Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './Business.css'
function Business(){
    const navigate = useNavigate();
    const location = useLocation();
    return (<div className="BusinessMain">
        <div className="header" >
        <p className="title primary-text">{location.pathname==="/b/dash"?"Dashboard":location.pathname==="/b/edit"?"Edit":"Notifications"} </p>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/notifications");
        }}>
        <span className="material-symbols-rounded headerIcon primary-text">
          chat_bubble
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/notifications");
        }}>
        <span className="material-symbols-rounded headerIcon primary-text">
          info
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/edit");
        }}>
        
        <span className="material-symbols-rounded headerIcon primary-text">
          Settings
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/dash");
        }}>
        <span className="material-symbols-rounded headerIcon primary-text">
          Home
        </span></div>
      </div>
      
        <Outlet/>
    </div>)
}

export default Business;