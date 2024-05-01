import { Outlet } from "react-router";
import {useEffect} from 'react';
import './App.css'
export default function App(){
    useEffect(() => {
        window.history.scrollRestoration = 'manual'
      }, []);
      console.log(process.env.REACT_APP_SERVER_URL)
    return (
        <div className="surface app">
        <Outlet/>
        </div>
    )
};