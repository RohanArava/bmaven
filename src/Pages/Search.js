import { useState } from "react";
import { useFetch } from "../useFetch"
import Error from "./Error";
import Loading from "./Loading"
import "./Search.css"
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate} from "react-router-dom";

export default function Search() {
    const location = useLocation();
    const query_term = new URLSearchParams(location.search).get("q");
    const [showFilter, setShowFilter] = useState(false);
    // console.log(query_term)
    const { loading, error, data } = useFetch(query_term&&query_term!==''?`https://bmaven.onrender.com/rest/search?term=${query_term}`:`https://bmaven.onrender.com/userutil/search/default`, [query_term])

    if (loading) return <Loading />;

    if (error) return <Error />

    if(showFilter) return <Filter setShowFilter={setShowFilter}/>
    console.log(data);
    return <div className="Wrap">
        
    <div className="SearchWrap">
        <div className="results">
            {data.services.map((item, index) => {
                return <SearchItem key={index} item={item} />
            })}
        </div>
        <div></div>
    </div>
    {/* <div onClick={()=>{setShowFilter(true)}} className="header-large primary-text filter material-symbols-rounded">filter_alt</div> */}
    </div>
}

function Filter({setShowFilter}){
    return <div className="filter">
        <div onClick={()=>{setShowFilter(false)}}><span className="header-large primary-text filter material-symbols-rounded">close</span></div>
    </div>
}

function SearchItem({ item }) {
    const navigate = useNavigate();
    return <div onClick={
        ()=>{
            navigate(`/u/service/${item._id}`)
        }
    } className="clickable searchItem secondary-container">
        <img className="searchImage" src={"https://bmaven.onrender.com" + "/" + item.image} alt="img" />
        <div>
            <span className="on-secondary-container-text headline-small">{item.name}</span>
            <p className="on-secondary-container-text on-surface-text"><span>&#8377;</span>{item.ppp}</p>
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