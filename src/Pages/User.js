import {Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./User.css";
import { useState, useEffect} from "react";

export default function User(){
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    return <div className="user">
        <div className="userHeader">
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
            <div>
                <span className="material-symbols-rounded headerIcon primary-text">
                    chat_bubble
                </span>
            </div>
            <div>
                <span className="material-symbols-rounded headerIcon primary-text">
                    info
                </span>
            </div>
            <div>
                <span className="material-symbols-rounded headerIcon primary-text">
                    account_circle
                </span>
            </div>
            <div>
                <span className="material-symbols-rounded headerIcon primary-text">
                    menu
                </span>
            </div>
        </div>
        <Outlet />
    </div>
}