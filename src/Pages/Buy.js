import { useParams } from "react-router-dom"
// import {useFetch} from "../useFetch"
// import Loading from "./Loading"
// import Error from "./Error"
import {useDispatch, useSelector} from "react-redux";
import {modifyOrders} from "../app/store"
import { useState } from "react";

export default function Buy(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const user = useSelector(state=>state.stateReducer.object.userDetails.userId);
    console.log(user);
    const [date, setDate] = useState(null);
    const [count, setCount] = useState(0);
    return <div className="on-surface-text">
        Count : <input value={count} onChange={(e)=>setCount(e.target.value)} type="number"></input>
        Date: <input value={date} onChange={(e)=>setDate(e.target.value)}  type="date"></input>
        {/* Additional Information : <textarea ></textarea>  */}
        <button onClick={()=>{
            
            fetch("http://localhost:8085/userutil/buyService", {
                method: "POST", headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user,
                    date,
                    count,
                    item:id
                })
            }).then(data=>data.json()).then(data=>{
                console.log(data)
                if(data.error) alert(data.error)
                if(data.success) alert("success")
                dispatch()
            })
        }}>Buy</button>
    </div>
}