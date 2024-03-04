import { useParams } from "react-router-dom"
import {useFetch} from "../useFetch"
import {useNavigate} from "react-router-dom"
import Loading from "./Loading"
import Error from "./Error"
import Service from "./Service"
import "./collectionScreen.css"

export default function Collection(){
    const navigate = useNavigate()
    const {id} = useParams();
    const {loading, data, error} = useFetch(`http://localhost:8085/userutil/getCollection/${id}`);
    console.log(`/userutil/getCollection/${id}`)
    if(loading) return <Loading />;
    if(error) {console.log(error);return <Error/>};
    console.log(data)
    return <div className="collectionScreenItem on-surface-text">
{data.collection.items.map((item, index)=>{
            return <div onClick={()=>{navigate(`/u/service/${item.item.id}`)}}><Service key={index} showDown ={false} serviceId={item.item.id}/>
            </div>
        })}
    </div>
}