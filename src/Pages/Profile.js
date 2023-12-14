import { useState, useEffect } from "react";
import "./profile.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { createRef } from "react";
import {useSelector} from "react-redux";
import { useScreenshot, createFileName } from "use-react-screenshot";
import {useNavigate} from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const signedIn = useSelector(state => state.stateReducer.object.signedIn);
    useEffect(()=>{
        if(!signedIn){
        navigate("/u/sign")
    }
    },[]);
    const [showCollection, setShowCollection] = useState(true);
    const [showAddCollection, setShowAddCollection] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 }); 
    const data = useSelector(state => state.stateReducer.object.userDetails);
    console.log("userDetails", data);
    return <div className="profile">
        {showAddCollection && <AddCollectionScreen pos={pos} setShowAddToCollectionScreen={setShowAddCollection} />}
        <span className="headline-medium primary-text name">{data.userName}
            <span onClick={() => { navigator.clipboard.writeText("rohan_arava") }} className="title-medium on-surface-text id">@{data.userId}</span></span>

        <div className="select"><span style={{ borderBottom: showCollection ? '1px solid' : "none" }} onClick={() => { setShowCollection(true) }} className="headline-medium primary-text selection">Collections </span>
            <span onClick={() => { setShowCollection(false) }} style={{ borderBottom: !showCollection ? '1px solid' : "none" }} className="headline-medium primary-text selection">Order History</span></div>
            <span  onClick={(event) => { setPos({ x: event.clientX, y: event.clientY }); setShowAddCollection(!showAddCollection); }}  className="material-symbols-rounded primary-text">
playlist_add
</span>
        <div className="bottom">

            {showCollection && (<div className="collections">
                {data.collections.map((item, index) => {
                    return <CollectionsItem key={index} item={item} />
                })}
            </div>)}

            {!showCollection && <div className="history">
                {data.history.map((item, index) => {
                    return <HistoryItem key={index} item={item} />
                })}
            </div>}
        </div>
    </div>
}

function CollectionsItem({ item }) {
    // const [imgNum, setImgNum] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false)
    // const it = {
    //     name: "Daenerys's wedding",
    //     items: [
    //         { id: 1, name: "Little Finger Pastries", image: "https://i.pinimg.com/564x/fb/98/f7/fb98f79c1b4180a03d5262c881390a03.jpg" },
    //         { id: 2, name: "Stark Kitchen", image: "https://i.pinimg.com/474x/ea/24/62/ea2462428d2baa42a96d484c062a0743.jpg" },
    //         { id: 1, name: "Snow Tailors", image: "https://i.pinimg.com/564x/89/66/1c/89661c6535d7d9c49b19b034151afd1f.jpg" },
    //     ],

    // }
    const it = item;
    return <div onMouseEnter={() => { setAutoPlay(true); console.log(autoPlay) }} onMouseLeave={() => { setAutoPlay(false); console.log(autoPlay) }} className="clickable collection-item secondary-container">

        <div className="leftWrap"><div className="on-secondary-container-text headline-small">{it.name}

        </div>
            <div className="lbWrap">
                <span className="material-symbols-rounded on-surface-text">favorite</span>
                <span className="material-symbols-rounded on-surface-text">share</span>
            </div>
        </div>
        <div className="picWrap">
            <Carousel selectedItem={0} infiniteLoop={true} interval={1500} autoPlay={autoPlay} showStatus={false} showIndicators={false} showThumbs={false} showArrows={false}>
                {
                    it.items && it.items.map((item, index) => {
                        return <div key={index}>
                            <span className="clct-itm-name">{item.name}</span>
                            <img className="clct-itm" src={item.image} alt="" />
                        </div>
                    })
                }
            </Carousel>

            {/* <img className="clct-itm" src={it.items[1].image} alt="" /> */}
        </div>
    </div>
}

function HistoryItem({ item }) {
    // const it = {
    //     name: "Wedding Cake | 3 Floor | Bride and Groom",
    //     serviceName: "Little Finger Pastries",
    //     servicePrice: "Rs. 1000",
    //     serviceTime: "12/12/2020 10:00 AM",
    //     paymentMethod: "UPI",
    //     paymentId: "rohan.a21@sbi.upi123",
    //     description: "Order was delivered at 10:00 AM on 12/12/2020 to a Mr.Snow at St.Sistine's Chapel"
    // };
    const it = item;
    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0
    });
    const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

//   const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
    const getImage = () => {takeScreenShot(ref.current).then(download)};
    return <div className="histWrap">
        <span onClick={getImage} className="on-surface-text scr material-symbols-rounded">screenshot_region</span>
        <div className="history-item secondary-container" style={{padding: "1em"}}>
        <div  ref={ref} className="secondary-container hiw" >
            <p className="headline-small on-secondary-container-text">{it.serviceName}</p>
            <table>
                <tr>
                    <td><p className="title-medium on-surface-text">Order: </p></td><td><p className="title-medium on-surface-text">{it.name}</p></td>
                </tr>
                {/* <tr>
                <td><p className="title-large on-secondary-container-text">Details: </p></td>
            </tr> */}
                <tr>
                    <td><p className="title-medium on-surface-text">Amount: </p></td><td><p className="title-medium on-surface-text">{it.servicePrice}</p></td>
                </tr>
                <tr>
                    <td><p className="title-medium on-surface-text">Time:</p></td><td><p className="title-medium on-surface-text">{it.serviceTime}</p></td>
                </tr>
                <tr>
                    <td><p className="title-medium on-surface-text">Payment Method: </p></td><td><p className="title-medium on-surface-text">{it.paymentMethod}</p></td>
                </tr>
                <tr>
                    <td><p className="title-medium on-surface-text">Payment Id: </p></td><td><p className="title-medium on-surface-text">{it.paymentId}</p></td>
                </tr>
                {it.description && <tr>
                    <td><p className="title-medium on-surface-text">Description:</p></td><td><p className="title-medium on-surface-text">{it.description}</p></td>
                </tr>}
            </table></div>
        </div></div>
}

function AddCollectionScreen({ setShowAddToCollectionScreen, pos }) {
    console.log(pos)
    return <><div style={{ top: `${pos.y + 10}px`, left: `${pos.x + 10}px` }} className="surface addtocollScreen">

        <div className="addtocollform" >
            <div style={{display:"grid", gridTemplateColumns:"10fr 2fr"}}>
                <span style={{ marginTop: "10px" }} className="on-surface-text title-large">Add Collection </span>
                <span onClick={() => { setShowAddToCollectionScreen(false) }} className="on-surface-text material-symbols-rounded"> close</span></div>
                <br/>
            <input type="text" placeholder="Enter Collection Name"></input>
        </div>
    </div></>
}