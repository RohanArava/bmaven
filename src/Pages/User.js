import {Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function User(){
    return <div>
        <Outlet />
    </div>
}