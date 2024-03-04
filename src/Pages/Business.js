import {Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './Business.css'
function Business(){
    const navigate = useNavigate();
    const location = useLocation();
    return (<div className="BusinessMain">
        <div className="header" >
          <div className="center"><span className="title primary-text">{location.pathname==="/b/dash"?"Dashboard":location.pathname==="/b/edit"?"Edit":location.pathname==="/b/notifications"?"Accepted Orders":location.pathname==="/b/billing"?"Unaccepted Orders":"About Us"} </span></div>
          <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/billing");
        }}>
        <span className="material-symbols-rounded header-medium primary-text">
          receipt_long
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/notifications");
        }}>
        <span className="material-symbols-rounded header-medium primary-text">
          chat_bubble
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/about");
        }}>
        <span className="material-symbols-rounded header-medium primary-text">
          info
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/edit");
        }}>
        
        <span className="material-symbols-rounded header-medium primary-text">
          Settings
        </span></div>
        <div style={{display:"inline"}} onClick={()=>{
            navigate("/b/dash");
        }}>
        <span className="material-symbols-rounded header-medium primary-text">
          Home
        </span></div>
      </div>
      
        <Outlet/>
    </div>)
}

export default Business;