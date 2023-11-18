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
            navigate("/business/notifications");
        }}>
        <span className="material-symbols-rounded headerIcon primary-text">
          chat_bubble
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/business/edit");
        }}>
        <span className="material-symbols-rounded headerIcon primary-text">
          Settings
        </span></div>
      </div>
        <Outlet/>
    </div>)
}

export default Business;