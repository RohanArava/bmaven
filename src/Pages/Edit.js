import { useFetch } from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./Edit.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyServices } from '../app/store';

export default function Edit() {
  const services = useSelector(state => state.stateReducer.object.businessDetails.services);
  const { loading, data, error } = useFetch(
    "http://localhost:8085/business/dash/data"
  );
  const [showAddServiceCoupon, setShowAddServiceCoupon] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const id = useSelector(state => state.stateReducer.object.businessDetails.id)
  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
    return <Error />;
  }
 
  // const services = data.services;
  const offers = data.offers;
  return (
    <div className="wrap">
      {showAddServiceCoupon && <AddServiceCoupon userId={id} pos={pos} setShowAddServiceCoupon={setShowAddServiceCoupon} />}
      <div className="services">
        <p className="secondary-text headline-medium">Services &amp; Offers <span onClick={(event) => { setPos({ x: event.clientX, y: event.clientY }); setShowAddServiceCoupon(!showAddServiceCoupon); }} className="material-symbols-rounded header-medium primary-text" style={{marginLeft:"8em"}}>add</span></p>
        {services.map((element, i) => {
          return <ListItem element={element} />;
        })}
        {offers.map((offer, index) => {
          return index < 3 ? (
            <div key={index} className="secondary-container offer">
              <div>
                <p className="on-secondary-container-text headline-small">
                  {offer.main}
                </p>
                <p className="secondary-text">{offer.desc}</p>
              </div>
              <div className="enable">
                {/* <label className="switch">
                  <Toggle
                    className="toggle"
                    icons={false}
                    defaultChecked={true}
                  />
                  <span className="slider round"></span>
                </label> */}
              </div>
              <span className="material-symbols-rounded primary-text">
                Delete
              </span>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
      <div className="editDetails">
        <form>
          <div className="form-row">
            <div
              className="form-group col-md-6 d-inline-block"
              style={{ padding: "10px" }}
            >
              <label className="secondary-text" for="inputEmail4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div
              className="form-group col-md-6 d-inline-block"
              style={{ padding: "10px" }}
            >
              <label className="secondary-text" for="inputPassword4">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-group" style={{ padding: "10px" }}>
            <label className="secondary-text" for="inputAddress">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="form-group" style={{ padding: "10px" }}>
            <label className="secondary-text" for="inputAddress2">
              Address 2
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-row">
            <div
              className="form-group col-md-6 d-inline-block"
              style={{ padding: "10px" }}
            >
              <label className="secondary-text" for="inputCity">
                City
              </label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div
              className="form-group col-md-6 d-inline-block"
              style={{ padding: "10px" }}
            >
              <label className="secondary-text" for="inputState">
                State
              </label>
              <select id="inputState" className="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-3" style={{ padding: "10px" }}>
              <label className="secondary-text" for="inputZip">
                Zip
              </label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          </div>
          <div className="d-block">
            <button
              type="submit"
              className="changebtn primary-container rounded on-primary-container-text align-middle"
              style={{padding:"10px", float:"right"}}
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ListItem({ element }) {
  const dispatch = useDispatch()
  return (
    <div className="secondary-container listItem">
      <img
        alt="business"
        className="bimgdash"
        src={element.image} 
      ></img>
      <p className="secondary-text">{element.name}</p>
      {/* <p className="tertiary-text">{element.ppp}</p> */}
      
      <div className="enable">
        {/* <label className="switch">
          <Toggle className="toggle" icons={false} defaultChecked={true} />
          <span className="slider round"></span>
        </label> */}
      </div>
      <span onClick={()=>{
        fetch(`http://localhost:8085/vendorutil/deleteService/${element._id}`).then((body) => body.json()).then((body) => {
          console.log(body);
          dispatch(modifyServices({services:body.services}))
        })
      }} className="material-symbols-rounded primary-text">Delete</span>
    </div>
  );
}


function AddServiceCoupon({ setShowAddServiceCoupon, pos , userId}) {
  const [collName, setCollName] = useState("")
  const [serDesc, setSerDesc] = useState("")
  const dispatch = useDispatch();
  console.log(pos)
  const [selectedFile, setSelectedFile] = useState(null);
  const [ppp, setPpp] = useState(0);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const formData = new FormData();
  formData.append('image', selectedFile);
  return <><div style={{ top: `${pos.y + 10}px`, left: `${pos.x + 10}px` }} className="surface addtocollScreen">

    <div className="addtocollform" >
      <div style={{ display: "grid", gridTemplateColumns: "10fr 2fr" }}>
        <span style={{ marginTop: "10px" }} className="on-surface-text title-large">Add Collection </span>
        <span onClick={() => { setShowAddServiceCoupon(false) }} className="on-surface-text material-symbols-rounded"> close</span></div>
      <br />
      <input type="text" value={collName} onChange={(e) => { setCollName(e.target.value) }} placeholder="Enter Service Name"></input>
      <input type="text" value={serDesc} onChange={(e) => { setSerDesc(e.target.value) }} placeholder="Enter Service Desc"></input>
      <input type="number" value={ppp} onChange={(e) => { setPpp(e.target.value) }} placeholder="Enter Price"></input>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => {
        fetch("http://localhost:8085/api/uploads",{
          method: 'POST',
          body: formData,
        }).then((body)=>body.json()).then((body)=>{
          const imageUrl = body.imageUrl;
          console.log("img", body)
        fetch("http://localhost:8085/vendorutil/addService", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            businessId: userId,
            name: collName,
            desc: serDesc,
            image:imageUrl,
            ppp,
            pdesc:""
          })
        }).then((body) => body.json()).then((body) => {
          setShowAddServiceCoupon(false);
          console.log(body);
          dispatch(modifyServices({services:body.services}))
        })
        });
        
      }}>Add</button>
    </div>
  </div></>
}