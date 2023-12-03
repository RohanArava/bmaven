import { useLocation } from "react-router-dom";
import { useFetch } from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import "./Service.css";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
export default function Service(){
    const location = useLocation();
    const {loading, error, data} = useFetch(`http://localhost:8085/service/${parseInt(location.pathname.split("/")[3])}`);
    const [showRateScreen, setShowRateScreen] = useState(false);
    const [showAddToCollectionScreen, setShowAddToCollectionScreen] = useState(false);
    console.log(data)
    if(loading) return <Loading/>
    if(error) return <Error/>
    if(data.error) return <Error/>
    if(showRateScreen) return <RateScreen setShowRateScreen={setShowRateScreen}/>
    if(showAddToCollectionScreen) return <AddToCollectionScreen setShowAddToCollectionScreen={setShowAddToCollectionScreen}/>
    return <div className="serviceWrap">
        <div className="serviceUp">
        <img className="serviceImage" alt="img" src={data.service.image}/>
        <div className="details">
            <span className="on-surface-text headline-small primary-text">{data.service.name}</span>
            <div className="df"><ReactStars
                count={5}
                isHalf={true}
                value={data.service.rating}
                size={16}
                activeColor="rgb(212, 232, 208)"
                edit={false}
            /> <span className="on-secondary-container-text">{data.service.num_ratings} ratings</span></div>
            <p className="on-surface-text body-large primary-text">{data.service.business}</p>
            <p className="on-surface-text body-large primary-text">{data.service.desc}</p>
            <div className="contactWrap">
            <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">phone </div>
            <a target="_blank" href={`tel:${data.service.phno}`} className="contactInfo on-surface-text body-large primary-text" rel="noreferrer">{data.service.phno+" "}</a>
            <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">mail </div>
            <a target="_blank" href={`mailto:${data.service.email}`} className="contactInfo on-surface-text body-large primary-text" rel="noreferrer">{data.service.email}</a>
            <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">star </div>
            <div onClick={()=>{setShowRateScreen(true)}} className="pointer contactInfo on-surface-text body-large primary-text">Click to Rate </div>
            <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">add </div>
            <div onClick={()=>{setShowAddToCollectionScreen(true)}} className="contactInfo pointer on-surface-text body-large primary-text">Add To Collection</div>
            </div>
        </div>
        </div>
       <div className="serviceDown">
        <div className="ratings">
            <span className="on-surface-text headline-medium">Reviews</span> 
            {data.service.reviews.map((item, index)=>{
                return <ReviewItem key={index} review={item}></ReviewItem>
            })}
        </div>
        <div className="additional">
        <p className="on-surface-text headline-medium">Additional Information</p> 
        <p className="on-secondary-container-text title-medium">{data.service.additional} lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.<br/><br/>
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.</p>
        </div>
       </div>
    </div>
}

function ReviewItem({review}){
    return <div className="secondary-container reviewItem">
        <p className="on-secondary-container-text title-medium">{review.user}</p>
        <div className="df"><ReactStars
                count={5}
                isHalf={true}
                value={review.rating}
                size={16}
                activeColor="rgb(212, 232, 208)"
                edit={false}
            /> <span className="on-secondary-container-text">{review.rating}</span></div>
            <p className="on-secondary-container-text body-medium">{review.review}</p>
    </div>
}

function RateScreen({setShowRateScreen}){
    return <div className="rateScreen">
    <div onClick={()=>{setShowRateScreen(false)}}><span className="header-large primary-text filter material-symbols-rounded">close</span></div>
    
    <div className="rating-form">
        <div className="df"><span style={{marginTop: "10px"}} className="on-surface-text title-large">Click to rate: </span><ReactStars
                count={5}
                // isHalf={true}
                size={32}
                activeColor="rgb(212, 232, 208)"
                // edit={false}
                // className="on-surface-text headline-large primary-text"
                
            /></div>
        <textarea style={{marginTop: "10px"}}>Write a Review....</textarea>
        <div onClick={()=>{setShowRateScreen(false)}}  style={{marginTop: "10px"}} className="al-sl-rt on-surface-text material-symbols-rounded fill-icon icon contactIcon">send</div>
    </div>
</div>
}

function AddToCollectionScreen({setShowAddToCollectionScreen}){
    return <><span onClick={()=>{setShowAddToCollectionScreen(false)}} className="header-large primary-text filter material-symbols-rounded">close</span><div className="addtocollScreen">
    <div className=" addtocollform" >
    <span style={{marginTop: "10px"}} className="on-surface-text title-large">Add to Collection: </span>
    <div className="yscroll">
        {
            [0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5].map((item, index)=>{
                return <div className="on-surface-text title-medium">{item}</div>
            })
        }
    </div>
    </div>
</div></>
}