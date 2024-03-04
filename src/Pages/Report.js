import { useLocation } from "react-router-dom";
import { ReviewItem } from "./Service";
import Service from "./Service";
import "./Report.css"
import { useSelector } from "react-redux";
import { useState } from "react";
export default function Report(){
    const {state} = useLocation();
    const userId = useSelector((state)=> state.stateReducer.object.userDetails.userId)
    const [cause, setCause] = useState(0);
    const [addInf, setAddInf] = useState("")
    return <div className="report on-secondary-container-text">
        {state.type === "comment" && <div>
            Commented on '{state.service} by {state.business}',
             <ReviewItem review={state.review}/>
             Why are you reporting? :
             <select>
                <option value="0">Offensive Content</option>
                <option value="1">Explicit Content</option>
                <option value="3">Mention of sensitive topics</option>
                <option value="4">Other</option>
             </select><br/><br/>
             <textarea 
             class="on-surface-text" 
             style={{backgroundColor:"rgb(36, 38, 35)", border:"none", borderRadius:"25px", padding:"1em"}} 
             cols={24} rows={5} 
             placeholder="Add additional information">
             </textarea><br/>
             <button className="report-btn tertiary-container on-tertiary-container-text">Report</button>
             </div>
             } 
        {state.type === "service" && <div>
             <Service showDown ={false} serviceId={state.service_id}/>
             Why are you reporting? :
             <select value={cause} onChange={(e)=>{setCause(e.target.value)}}>
                <option value="0">Offensive Content</option>
                <option value="1">Explicit Content</option>
                <option value="3">Mention of sensitive topics</option>
                <option value="4">Other</option>
             </select><br/><br/>
             <textarea 
             value={addInf}
             onChange={(e)=>setAddInf(e.target.value)}
             class="on-surface-text" 
             style={{backgroundColor:"rgb(36, 38, 35)", border:"none", borderRadius:"25px", padding:"1em"}} 
             cols={24} rows={5} 
             placeholder="Add additional information">
             </textarea><br/>
             <button onClick={()=>{ 
                const report = {
                    serviceId: state.service_id,
                    userId,
                    cause,
                    additional: addInf
                }
                console.log(report)
                fetch(`http://localhost:8085/userutil/reportService`, {
                    method: "POST", headers: {'content-Type': 'application/json'},
                    body:JSON.stringify(report)
                }).then(body=>body.json()).then(body=>{
                    if(body.error)return alert("Something went wrong")
                    if(body.success) return alert("Success")
                })
             }} className="report-btn tertiary-container on-tertiary-container-text">Report</button>
             </div>
             } 
    </div>
}
