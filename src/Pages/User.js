import {Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./User.css";
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../app/store";

export default function User(){
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signedIn = useSelector(state=> state.stateReducer.object.signedIn)
    return <div className="user">
        <div className="userHeader">
            <span className="headline-large primary-text pl-8">BizMaven</span>
            <div className="searchbar">
            <input value={searchTerm} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            console.log(searchTerm)
                            navigate(`/u/search?q=${searchTerm}`)
                        }}} onChange={(e)=>{
                setSearchTerm(e.target.value)
            }} className="searchInput" placeholder="Search" type="text"/>
            <button onClick={()=>{
                navigate(`/u/search?q=${searchTerm}`)
            }} className="searchSubmit on-secondary-container-text"><span className="material-symbols-rounded">search</span></button>
            </div>
            {/* <div onClick={()=>{
                navigate("/u/bills")
            }}>
                <span className="material-symbols-rounded header-medium primary-text">
                    chat_bubble
                </span>
            </div> */}
            <div onClick={()=>{
                navigate("/u/about")
            }}>
                <span className="material-symbols-rounded header-medium primary-text">
                    info
                </span>
            </div>
            
            {signedIn && <><div onClick={()=>{navigate("/u/profile")}}>
                <span className="material-symbols-rounded header-medium primary-text">
                    account_circle
                </span>
            </div>
            <div onClick={()=>{
                dispatch(userLogout());
                navigate("/u/sign")
            }}>
                <span className="material-symbols-rounded header-medium primary-text">
                    logout
                </span>
            </div></>}
        </div>
        <Outlet />
    </div>
}