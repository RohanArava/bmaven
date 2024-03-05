import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import {useFetch} from "../useFetch"
import Loading from "./Loading"
import Error from "./Error"
import "./Admin.css"
import { useEffect, useState } from "react";
export default function Admin() {

    const location = useLocation();
    return <>
        <span className="title primary-text">{
            ({
                "/a/dashboard": "Admin Dashboard",
                "/a/managecustomers": "Manage Customers",
                "/a/managebusinesses": "Mange Businesses",
                "/a/auth": "Login"
            })[location.pathname] || "Admin"
        }</span>

        <Outlet />
    </>
}


export function AdminDash() {
    
    const navigate = useNavigate();
    const {loading, data, error} = useFetch("http://localhost:8085/admin/getReports");
    if(loading) return <Loading/>
    if(error) return <Error/>
    console.log(data)
    const reports = data.reports;
    // [
    //     { reported_by: "user_id", report_type: "type", description: "ftew eufyff iwbfuyw wufeyebfu wshfb7ys uweg7t", cause: "inappropriate" },
    //     { reported_by: "user_id", report_type: "type", description: "ftew eufyff iwbfuyw wufeyebfu wshfb7ys uweg7t", cause: "inappropriate" },
    //     { reported_by: "user_id", report_type: "type", description: "ftew eufyff iwbfuyw wufeyebfu wshfb7ys uweg7t", cause: "inappropriate" },
    //     { reported_by: "user_id", report_type: "type", description: "ftew eufyff iwbfuyw wufeyebfu wshfb7ys uweg7t", cause: "inappropriate" },
    //     { reported_by: "user_id", report_type: "type", description: "ftew eufyff iwbfuyw wufeyebfu wshfb7ys uweg7t", cause: "inappropriate" },
    // ]
    const stats = data.stats;
    // {
    //     views: 20,
    //     avgRating: 4.5,
    //     revenue: 7000,
    //     viewGraph: [6, 8.7, 8, 8.7, 8, 8.7, 8.7, 8, 8.7, 8, 8.7, 8, 7, 8.9, 8.7, 8, 8.7, 8, 8.7, 5]
    // }
    return <div className="adminDash">
        <div className="dashLeft">
            <div onClick={() => navigate("/a/managecustomers")} className="tertiary-container man_users_btn on-tertiary-container-text">
                <div style={{ fontSize: "0.4em", padding: "0", margin: "0 0 -20px 0" }}>Manage</div> Customers
            </div>
            <div onClick={() => navigate("/a/managebusinesses")} className="secondary-container man_users_btn on-secondary-container-text">
                <div style={{ fontSize: "0.4em", padding: "0", margin: "0 0 -20px 0" }}>Manage</div> Businesses
            </div>
        </div>
        <div className="dashRight">
            <span className="primary-text headline-medium">Reports</span>
            <div className="reports">{reports.map((report, idx) => {
                return <div className="report on-surface-text" key={idx}>{report.additional_info}<br />by: {report.user} <br/>on: {report.service}
                <br/>cause: {report.cause==="0"?"Offensive Content": report.cause==="1"?"Explicit Content":report.cause==="3"?"Mention of Sensitive topics":"Other"}</div>
            })}</div>
        </div>
        <div className="analyticsDash">
            <div className='statsDash'>
                <span className="primary-text headline-medium">Stats</span>
                <p className='secondary-text title-medium'>Total Views: {stats.views}</p>
                <p className='secondary-text title-medium'>Total businesses: {stats.vendors}</p>
                <p className='secondary-text title-medium'>Total users: {stats.users}</p>
            </div>
            <div className='graphDash'>
            <Line data={{
            labels: stats.viewGraph.map(view => view._id), datasets: [{
              label: "Views",
              data: stats.viewGraph.map(view => view.views),
              backgroundColor: "#75d0dd",
              borderColor: "#75d0dd",
              pointRadius: 5,
              // fill:{value: 0}
            }]
          }}
          />
                
            </div>
        </div>
    </div>
}

export function ManageCustomers() {
    // const [data, setData] = useState(null)
    const {loading, data, error} = useFetch("http://localhost:8085/admin/getusers")
    if(loading) return <Loading/>
    if(error) return <Error/>
    const customers = [
        { id: "customer_id", name: "customer" },
        { id: "customer_id", name: "customer" },
        { id: "customer_id", name: "customer" },
        { id: "customer_id", name: "customer" },
    ]
    return <div className="manage_customers">
        <div className="business_list">
            {data.users.map((customers, index) => {
                return <div className="business_listitem secondary-container on-secondary-container-text">{customers.userId}<br />{customers.email}<button onClick={()=>{
                    fetch("http://localhost:8085/admin/removeuser",{
                        method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({
                            id:customers._id
                        })
                    }).then(()=> window.location.reload())
                }}>delete</button></div>
            })}
        </div>
    </div>
}

export function ManageBusinesses() {
    
    const {loading, data, error} = useFetch("http://localhost:8085/admin/getvendors")
    if(loading) return <Loading/>
    if(error) return <Error/>
    console.log(data.vendors)
    const businesses = [
        { id: "bsnss01", name: "Bakery" },
        { id: "bsnss01", name: "Bakery" },
        { id: "bsnss01", name: "Bakery" },
        { id: "bsnss01", name: "Bakery" },
    ]
    return <div className="manage_businesses">
        <div className="business_list">
            {data.vendors.map((business, index) => {
                return <div className="business_listitem secondary-container on-secondary-container-text">{business.vendorName}<br />{business.email}<button onClick={()=>{fetch("http://localhost:8085/admin/removevendor",{
                    method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({
                        id:business._id
                    })
                }).then(()=> window.location.reload())}}>delete</button></div>
            })}
        </div>
        <div className="business_overview">

        </div>
        <div className="reports">

        </div>
    </div>
}