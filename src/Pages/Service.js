import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import "./Service.css";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function Service({showDown=true, serviceId=undefined}) {
    const location = useLocation();
    if (!serviceId){
        serviceId = location.pathname.split("/")[3]
    }
    console.log(serviceId) 
    const { loading, error, data } = useFetch(`http://localhost:8085/userutil/getService/${serviceId}`);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [showAddToCollectionScreen, setShowAddToCollectionScreen] = useState(false);
    const navigate = useNavigate();
    console.log(data)
    if (loading) return <Loading />
    if (error) return <Error />
    if (data.error) return <Error />
    // if(showRateScreen) return <RateScreen setShowRateScreen={setShowRateScreen}/>
    // if(showAddToCollectionScreen) return <AddToCollectionScreen setShowAddToCollectionScreen={setShowAddToCollectionScreen}/>
    return <div className="serviceWrap">
        {showAddToCollectionScreen && <AddToCollectionScreen pos={pos} setShowAddToCollectionScreen={setShowAddToCollectionScreen} />}
        <div className="serviceUp">
            <img className="serviceImage" alt="img" src={data.service.image} />
            <div className="details">
                <span className="on-surface-text headline-small primary-text">{data.service.name}</span>
                <div className="df"><ReactStars
                    count={5}
                    isHalf={true}
                    value={data.rating}
                    size={16}
                    activeColor="rgb(212, 232, 208)"
                    edit={false}
                /> <span className="on-secondary-container-text">{data.num_ratings} ratings</span></div>
                <p className="on-surface-text body-large primary-text">{data.business}</p>
                <p className="on-surface-text body-large primary-text">{data.service.desc}</p>
                {showDown && <div className="contactWrap">
                    <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">phone </div>
                    <a target="_blank" href={`tel:${data.phno}`} className="contactInfo on-surface-text body-large primary-text" rel="noreferrer">{data.phno + " "}</a>
                    <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">mail </div>
                    <a target="_blank" href={`mailto:${data.email}`} className="contactInfo on-surface-text body-large primary-text" rel="noreferrer">{data.email}</a>
                    {/* <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">star </div>
            <div onClick={()=>{setShowRateScreen(true)}} className="pointer contactInfo on-surface-text body-large primary-text">Click to Rate </div> */}
                    <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">add </div>
                    <div onClick={(event) => { setPos({ x: event.clientX, y: event.clientY }); setShowAddToCollectionScreen(!showAddToCollectionScreen); }} className="contactInfo pointer on-surface-text body-large primary-text">Add To Collection</div>
                    <div className="on-surface-text material-symbols-rounded fill-icon icon contactIcon">report </div>
                    <div onClick={() => {navigate("/u/report", {state:{
                        service_id: serviceId,
                        type: "service"
                    }})}} className="contactInfo pointer on-surface-text body-large primary-text">Report</div>
                </div>}
            </div>
        </div>
        {showDown && <div className="serviceDown">
            <div className="ratings">
                <span className="on-surface-text headline-medium">Reviews</span>
                {data.reviews && data.reviews.map((item, index) => {
                    return <ReviewItem key={index} service={data.service.name} business={data.business} review={item}></ReviewItem>
                })}
                <RateScreen />
            </div>
            <div className="additional">
                <p className="on-surface-text headline-medium">Additional Information</p>
                <p className="on-secondary-container-text title-medium">{data.service.additional} lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.<br /><br />
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid id.</p>
            </div>

        </div>}
    </div>
}

export function ReviewItem({ review, service, business }) {
    const navigate = useNavigate();
    return <div onClick={()=>{navigate("/u/report", {state:{
        type:"comment", comment_id:"1", review, service, business
    }})}} className="secondary-container reviewItem">
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

function RateScreen() {
    return <div className="rateScreen">
        {/* <div onClick={()=>{setShowRateScreen(false)}}><span className="header-large primary-text filter material-symbols-rounded">close</span></div> */}

        <div className="rating-form">
            <div className="df"><p style={{ marginTop: "10px" }} className="on-surface-text headline-medium">Rate </p></div><ReactStars
                count={5}
                // isHalf={true}
                size={32}
                activeColor="rgb(212, 232, 208)"
            // edit={false}
            // className="on-surface-text headline-large primary-text"

            />
            <textarea placeholder="Write a Review...." style={{ marginTop: "10px" }}></textarea>
            <div style={{ marginTop: "10px" }} className="al-sl-rt on-surface-text material-symbols-rounded fill-icon icon contactIcon">send</div>
        </div>
    </div>
}

function AddToCollectionScreen({ setShowAddToCollectionScreen, pos }) {
    const collections = useSelector(state => state.stateReducer.object.userDetails.collections);
    console.log(collections)
    console.log(pos)
    return <><div style={{ top: `${pos.y + 10}px`, left: `${pos.x + 10}px` }} className="surface addtocollScreen">

        <div className=" addtocollform" >
            <div style={{display:"grid", gridTemplateColumns:"10fr 2fr"}}>
                <span style={{ marginTop: "10px" }} className="on-surface-text title-large">Add to Collection </span>
                <span onClick={() => { setShowAddToCollectionScreen(false) }} className="on-surface-text material-symbols-rounded"> close</span></div>
                <br/>
            <div className="yscroll">
                {
                    collections.map((item, index) => {
                        return <div style={{padding: "1em"}} className="on-surface-text title-medium">{item.name}</div>
                    })
                }
            </div>
        </div>
    </div></>
}