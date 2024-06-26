import { useState, useEffect } from 'react';
import "./Dashboard.css";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useFetch } from '../useFetch';
import { useSelector, useDispatch } from "react-redux";
import Loading from './Loading';
import Error from './Error';
import { modifyServices } from '../app/store';

function Dashboard() {
  const [serviceStyle, setServiceStyle] = useState({
    top: "100vh",
    position: "absolute",
    animation: "slideiny ease-out 400ms"
  });
  const [rightSideStyle, setRightSideStyle] = useState({
    left: "100vw",
    position: "absolute"
  });
  const [views, setViews] = useState(null);
  const [stats, setStats] = useState({views:[], rating:[], revenue:0});
  const id = useSelector(state => state.stateReducer.object.businessDetails.id)
  // const [services, setServices] = useState([]);
  // const [offers, setOffers] = useState([]);
  console.log(id)
  const { loading, data, error } = useFetch(`https://bmaven.onrender.com/vendorutil/viewsForBusiness/${id}`);
  const services = useSelector(state => state.stateReducer.object.businessDetails.services);
  if (loading ) {
    return <Loading />
  }
  if (error) {
    console.log(error);
    return <Error />
  }

  console.log(data)
  const offers = data.offers || [];

  
  return (
    <div className="DashboardMain">
      <div className="body surface">
        <Services setStats={setStats} businessId={id} setRightSideStyle={setRightSideStyle} style={serviceStyle} onAnimationEnd={() => {
          setStats({views: data.views || [], rating: data.rating || [], revenue: data.revenue||[]});
          setServiceStyle({ top: "0vh", position: "relative" });
          console.log(services);
        }} services={services} />
        <RightSide rightSideStyle={rightSideStyle} offers={offers} stats={stats} />
      </div>
    </div>
  );
}

function AddCollectionScreen({ setShowAddToCollectionScreen, pos, userId }) {
  const [collName, setCollName] = useState("")
  const [serDesc, setSerDesc] = useState("")
  const dispatch = useDispatch();
  console.log(pos)
  return <><div style={{ top: `${pos.y + 10}px`, left: `${pos.x + 10}px` }} className="surface addtocollScreen">

    <div className="addtocollform" >
      <div style={{ display: "grid", gridTemplateColumns: "10fr 2fr" }}>
        <span style={{ marginTop: "10px" }} className="on-surface-text title-large">Add Collection </span>
        <span onClick={() => { setShowAddToCollectionScreen(false) }} className="on-surface-text material-symbols-rounded"> close</span></div>
      <br />
      <input type="text" value={collName} onChange={(e) => { setCollName(e.target.value) }} placeholder="Enter Service Name"></input>
      <input type="text" value={serDesc} onChange={(e) => { setSerDesc(e.target.value) }} placeholder="Enter Service Desc"></input>
      <button onClick={() => {
        fetch(`https://bmaven.onrender.com/vendorutil/addService`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            businessId: userId,
            name: collName,
            desc: serDesc
          })
        }).then((body) => body.json()).then((body) => {
          setShowAddToCollectionScreen(false);
          dispatch(modifyServices({services:body.services}))
        })
      }}>Add</button>
    </div>
  </div></>
}

export function Services({setStats, style, onAnimationEnd, setRightSideStyle, services, businessId }) {
  const [serviceList, setServiceList] = useState([]);
  const [showAddCollection, setShowAddCollection] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (<>    {showAddCollection && <AddCollectionScreen userId={businessId} pos={pos} setShowAddToCollectionScreen={setShowAddCollection} />}
    <div className="leftList" style={style} onAnimationEnd={() => {
      onAnimationEnd();
      setServiceList(services);
      if (services.length === 0 && setRightSideStyle) {
        setRightSideStyle({
          left: "110vw",
          animation: "slideinx ease-out 400ms"
        }, [style]); 
      }
    }}>
      <p className="secondary-text headline-small">Services 
      {/* <span onClick={(event) => { setPos({ x: event.clientX, y: event.clientY }); setShowAddCollection(!showAddCollection); }} className="material-symbols-rounded header-small primary-text">add</span> */}
      </p>
      {serviceList.map((element, i) => {
        return <ListItem setStats={setStats} setRightSideStyle={i === serviceList.length - 1 ? setRightSideStyle : null} style={{ top: "100vh", position: "absolute", animation: "slideiny 400ms ease-out" }} element={element} key={i} />
      })}
    </div></>
  );
}

function ListItem({ setStats ,element, style, setRightSideStyle }) {
  console.log("item", element)
  const { loading, data, error } = useFetch(`https://bmaven.onrender.com/vendorutil/viewsForService/${element._id}`);
  let stats = {views:[], rating:[], revenue:0};
  if(loading||error){

  }else{
    console.log(data)
    stats = data;
  }
  const [itemStyle, setItemStyle] = useState(style);
  return <div onClick={()=>{setStats(stats)}} style={itemStyle} className='secondary-container listItem' onAnimationStart={() => {
    setItemStyle({ animation: "slideiny 400ms ease-out" });
  }} onAnimationEnd={() => {
    if (setRightSideStyle) setRightSideStyle({
      left: "110vw",
      animation: "slideinx ease-out 400ms"
    });
  }}>
    <img alt="business" className='bimgdash' src={"https://bmaven.onrender.com" + "/" + element.image}></img>
    <p className="secondary-text">{element.name}</p>
  </div>
}

function RightSide({ rightSideStyle, offers, stats }) {
  const [animationDone, setAnimationDone] = useState(false);
  const [bottomStyle, setBottomStyle] = useState({
    left: "100vw",
    position: "absolute"
  });
  let totalViews = 0;
  let totalRating = 0;
  stats.views.forEach((view)=>{totalViews+=view.views})
  stats.rating.forEach((view)=>{totalRating+=view.rating})
  console.log(stats.rating)
  if(stats.rating.length === 0){
    totalRating /= stats.rating.length;
  }

  return <div className="rightList">
    <div className="top" style={rightSideStyle} onAnimationEnd={() => {
      setAnimationDone(true);
      setBottomStyle({
        left: "110vw",
        animation: "slideinx ease-out 400ms"
      });
    }}><p className="secondary-text headline-small">Analytics</p>
      <div className="analytics">
        <div className='stats'>
          <p className='secondary-text title-medium'>Views: {totalViews}</p>
          <p className='secondary-text title-medium'>Average Rating: {totalRating}</p>
          <p className='secondary-text title-medium'>Revenue: {stats.revenue}</p>
        </div>
        <div className='graph'>
          {animationDone ? <Line data={{
            labels: stats.views.map(view => view._id), datasets: [{
              label: "Views",
              data: stats.views.map(view => view.views),
              backgroundColor: "#75d0dd",
              borderColor: "#75d0dd",
              pointRadius: 5,
              // fill:{value: 0}
            }]
          }}
          /> : <div>chart</div>}
        </div>
      </div>
    </div>
    <div className="bottom-dash" style={bottomStyle}><p className="secondary-text headline-small">Offers & coupons</p>
      <div className='offersDiv'>
        {offers.map((offer, index) => {
          return index < 3 ? <div key={index} className="secondary-container offerdash">
            <p className='on-secondary-container-text title-medium'>{offer.main}</p>
            <p className='secondary-text'>
              {offer.desc}
            </p>
          </div> : <></>;
        })}
      </div>
    </div>
  </div>;
}

export default Dashboard;
