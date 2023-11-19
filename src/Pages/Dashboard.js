import {useState} from 'react';
import "./Dashboard.css";
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import { useFetch } from '../useFetch';
import Loading from './Loading';
import Error from './Error';

function Dashboard() {
  const [serviceStyle, setServiceStyle] = useState({
    top: "100vh",
    position:"absolute",
    animation:"slideiny ease-out 400ms"
  });
  const [rightSideStyle, setRightSideStyle] = useState({
    left:"100vw",
    position: "absolute"
  });

  // const [services, setServices] = useState([]);
  // const [offers, setOffers] = useState([]);
  const {loading, data, error} = useFetch("http://localhost:8085/business/dash/data");
  if(loading){
    return <Loading/>
  }
  if(error){
    console.log(error);
    return <Error/>
  }

  const offers = data.offers;
  const services = data.services;
  const stats = data.stats;
  return (
    <div className="DashboardMain">
      <div className="body surface">
        <Services setRightSideStyle={setRightSideStyle} style={serviceStyle} onAnimationEnd={()=>{
          setServiceStyle({top:"0vh", position:"relative"});
          console.log(services);
        }} services={services} />
        <RightSide rightSideStyle={rightSideStyle} offers={offers} stats={stats}/>
      </div>
    </div>
  );
}

export function Services({style, onAnimationEnd, setRightSideStyle, services}) {
  const [serviceList, setServiceList] = useState([]);
  return (
    <div className="leftList" style={style} onAnimationEnd={()=>{
      onAnimationEnd();
      setServiceList(services);
    }}>
      <p className="secondary-text headline-medium">Services</p>
      {serviceList.map((element,i) => {
        return <ListItem setRightSideStyle={i===serviceList.length-1?setRightSideStyle:null} style={{top:"100vh",position:"absolute",animation:"slideiny 400ms ease-out"}} element={element} key={i}/>
      })}
    </div>
  );
}

function ListItem({element, style, setRightSideStyle}){
  
  const [itemStyle, setItemStyle] = useState(style);
  return <div style={itemStyle} className='secondary-container listItem' onAnimationStart={()=>{
    setItemStyle({animation:"slideiny 400ms ease-out"});
  }} onAnimationEnd={()=>{
      if(setRightSideStyle) setRightSideStyle({
        left:"110vw",
        animation:"slideinx ease-out 400ms"
      });
  }}>
    <img  alt="business" className='bimgdash' src="https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/9-Essential-Bakery-Business-Tips-That-Will-Make-Your-Bakery-a-Success.jpg"></img>
    <p className="secondary-text">{element.name}</p>
  </div>
}

function RightSide({rightSideStyle, offers, stats}) {
  const [animationDone, setAnimationDone] = useState(false);
  const [bottomStyle, setBottomStyle] = useState({
    left:"100vw",
    position: "absolute"
  });
  return <div className="rightList">
    <div className="top" style={rightSideStyle} onAnimationEnd={()=>{
      setAnimationDone(true);
      setBottomStyle({
        left:"110vw",
        animation:"slideinx ease-out 400ms"
      });
    }}><p className="secondary-text headline-medium">Analytics</p>
    <div className="analytics">
    <div className='stats'>
      <p className='secondary-text headline-small'>Views: {stats.views}</p>
      <p className='secondary-text headline-small'>Average Rating: {stats.avgRating}</p>
      <p className='secondary-text headline-small'>Revenue: {stats.revenue}</p>
    </div>
    <div className='graph'>
      {animationDone?<Line data={{labels:[...Array(stats.viewGraph.length).keys()],datasets:[{
        label:"Data1",
        data:stats.viewGraph,
        backgroundColor:"#75d0dd",
      borderColor:"#75d0dd",
      pointRadius:0,
      // fill:{value: 0}
      }]}}
      />:<div>chart</div>}
    </div>
    </div>
    </div>
    <div className="bottom" style={bottomStyle}><p className="secondary-text headline-medium">Offers & coupons</p>
    <div className='offersDiv'>
      {offers.map((offer, index)=>{
        return index<3?<div key={index} className="secondary-container offerdash">
          <p className='on-secondary-container-text headline-small'>{offer.main}</p>
          <p className='secondary-text'>
            {offer.desc}
          </p>
        </div>:<></>;
      })}
    </div>
    </div>
  </div>;
}

export default Dashboard;
