import { useLocation } from "react-router-dom";
import { ReviewItem } from "./Service";
import Service from "./Service";
import "./Report.css"
export default function Report(){
    const {state} = useLocation();
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
    </div>
}
