import {useState} from 'react';
import "./Dashboard.css";
import services from "./services.json";
import offers from "./offers.json";
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

function Dashboard() {
  const [serviceStyle, setServiceStyle] = useState({
    top: "100vh",
    position:"absolute",
  });
  const [rightSideStyle, setRightSideStyle] = useState({
    left:"100vw",
    position: "absolute"
  });
  return (
    <div className="DashboardMain">
      <div className="header" onAnimationEnd={()=>{
      setServiceStyle({...serviceStyle, animation:"slideiny ease-out 400ms"});
    }}>
        <p className="title primary-text">Dashboard </p>
        <span className="material-symbols-rounded headerIcon primary-text">
          chat_bubble
        </span>
        <span className="material-symbols-rounded headerIcon primary-text">
          Settings
        </span>
      </div>
      <div className="body surface">
        <Sevices setRightSideStyle={setRightSideStyle} style={serviceStyle} onAnimationEnd={()=>{
          setServiceStyle({top:"0vh", position:"relative"});
          console.log(services);
        }} />
        <RightSide rightSideStyle={rightSideStyle}/>
      </div>
    </div>
  );
}

function Sevices({style, onAnimationEnd, setRightSideStyle}) {
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

function RightSide({rightSideStyle}) {
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
      <p className='secondary-text headline-small'>Views: 20</p>
      <p className='secondary-text headline-small'>Average Rating: 4.5</p>
      <p className='secondary-text headline-small'>Revenue: 3,000</p>
    </div>
    <div className='graph'>
      {animationDone?<Line data={{labels:[...Array(5).keys()],datasets:[{
        label:"Data1",
        data:[1,10,7,9,5]
      }]}}/>:<div>chart</div>}
    </div>
    </div>
    </div>
    <div className="bottom" style={bottomStyle}><p className="secondary-text headline-medium">Offers & coupons</p>
    <div className='offersDiv'>
      {offers.map((offer, index)=>{
        return index<3?<div key={index} className="secondary-container offer">
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
