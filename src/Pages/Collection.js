import { useParams } from "react-router-dom"
import {useFetch} from "../useFetch"
import Loading from "./Loading"
import Error from "./Error"

export default function Collection(){
    const {id} = useParams();
    const {loading, data, error} = useFetch(`http://localhost:8085/userutil/getCollection/${id}`);
    console.log(`/userutil/getCollection/${id}`)
    if(loading) return <Loading />;
    if(error) {console.log(error);return <Error/>};
    // console.log(data)
    return <div className="collection">
        <span className="on-surface-text">{JSON.stringify(data)}</span>
    </div>
}