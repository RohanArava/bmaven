import { useParams } from "react-router-dom"
import {useFetch} from "../useFetch"
import Loading from "./Loading"
import Error from "./Error"
import Service from "./Service"

export default function Collection(){
    const {id} = useParams();
    const {loading, data, error} = useFetch(`http://localhost:8085/userutil/getCollection/${id}`);
    console.log(`/userutil/getCollection/${id}`)
    if(loading) return <Loading />;
    if(error) {console.log(error);return <Error/>};
    console.log(data)
    return <div className="collection">
        <span className="on-surface-text">{data.collection.items.map((item, index)=>{
            return <div className="secondary-container" style={{overflowY: "hidden",height: "20em",width:"50vw", borderRadius:"20px"}}><Service key={index} showDown ={false} serviceId={item.item.id}/>
            </div>
        })}</span>
    </div>
}