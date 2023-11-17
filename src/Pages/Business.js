import {Outlet} from "react-router-dom";

import './Business.css'
function Business(){
    return (<div className="BusinessMain">
        <Outlet/>
    </div>)
}

export default Business;