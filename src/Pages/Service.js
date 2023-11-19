import { useLocation } from "react-router-dom";
import { useFetch } from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import "./Service.css";
import ReactStars from "react-rating-stars-component";
export default function Service(){
    const location = useLocation();
    const {loading, error, data} = useFetch(`http://localhost:8085/service/${parseInt(location.pathname.split("/")[3])}`)
    console.log(data)
    if(loading) return <Loading/>
    if(error) return <Error/>
    if(data.error) return <Error/>
    return <div className="serviceWrap">
        <div className="serviceUp">
        <img className="serviceImage" alt="img" src={data.service.image}/>
        <div className="details">
            <span className="on-surface-text headline-medium primary-text">{data.service.name}</span>
            <div className="df"><ReactStars
                count={5}
                isHalf={true}
                value={data.service.rating}
                size={16}
                activeColor="rgb(212, 232, 208)"
                edit={false}
            /> <span className="on-secondary-container-text">{data.service.num_ratings} ratings</span></div>
            <p className="on-surface-text lead primary-text">{data.service.business}</p>
            <p className="on-surface-text lead primary-text">{data.service.desc}</p>
            <div className="contactWrap">
            <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">phone </div>
            <a target="_blank" href={`tel:${data.service.phno}`} className="contactInfo on-surface-text lead primary-text" rel="noreferrer">{data.service.phno+" "}</a>
            <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">mail </div>
            <a target="_blank" href={`mailto:${data.service.email}`} className="contactInfo on-surface-text lead primary-text" rel="noreferrer">{data.service.email}</a>
            <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">star </div>
            <div className="on-surface-text lead primary-text" rel="noreferrer">Click to Rate</div>
            </div>
        </div>
        </div>
       <div className="serviceDown">
        <div className="ratings">
            {data.service.reviews.map((item, index)=>{
                return <ReviewItem key={index} review={item}></ReviewItem>
            })}
        </div>
       </div>
    </div>
}

function ReviewItem({review}){
    return <div className="secondary-container reviewItem">
        <p className="on-secondary-container-text headline-small">{review.user}</p>
        <div className="df"><ReactStars
                count={5}
                isHalf={true}
                value={review.rating}
                size={16}
                activeColor="rgb(212, 232, 208)"
                edit={false}
            /> <span className="on-secondary-container-text">{review.rating}</span></div>
            <p className="on-secondary-container-text lead">{review.review}</p>
    </div>
}