import { useFetch } from "../useFetch"
import Error from "./Error";
import Loading from "./Loading"
import "./Search.css"
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate} from "react-router-dom";

export default function Search() {
    const location = useLocation();
    const query_term = new URLSearchParams(location.search).get("q")
    // console.log(query_term)
    const { loading, error, data } = useFetch(query_term&&query_term!==''?`http://localhost:8085/user/search?q=${query_term}`:"http://localhost:8085/user/search/default")

    if (loading) return <Loading />;

    if (error) return <Error />

    return <div className="SearchWrap">
        <div className="results">
            {data.services.map((item, index) => {
                return <SearchItem key={index} item={item} />
            })}
        </div>
        <div></div>
    </div>
}

function SearchItem({ item }) {
    const navigate = useNavigate();
    return <div onClick={
        ()=>{
            navigate(`/u/service/${item.id}`)
        }
    } className="searchItem secondary-container">
        <img className="searchImage" src={item.image} alt="img" />
        <div>
            <span className="on-secondary-container-text headline-small">{item.name}</span>
            <div className="df"><ReactStars
                count={5}
                isHalf={true}
                value={item.rating}
                size={16}
                activeColor="rgb(212, 232, 208)"
                edit={false}
            /> <span className="on-secondary-container-text">   {item.num_ratings}</span></div>
            <span className="on-secondary-container-text">{item.desc}</span>
        </div>

    </div>
}