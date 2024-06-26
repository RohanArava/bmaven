// import React, { useState } from 'react';
// import './BillingForm.css'; // Create a CSS file named Form.css for styling

// const EventForm = () => {
//   const [serviceName, setServiceName] = useState('');
//   const [userId, setUserId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log(`Name: ${serviceName}, Phone Number: ${userId}`);
//     // You can add your logic to submit the form data to a backend or perform any other action
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit} className="">
//         {/* <h2 className='primary-text' style={{'textAlign': 'center', 'marginBottom': 0}}>Send a bill to user?</h2> */}
//         <div className="form-group">
//           <label className='on-surface-text' htmlFor="userId">User Id:</label>
//           <input
//             type="text"
//             placeholder="Enter User Id"
//             id="userId"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className='on-surface-text' htmlFor="userId">Service/Item Name:</label>
//           <input
//             type="text"
//             placeholder="Enter Service"
//             id="userId"
//             value={serviceName}
//             onChange={(e) => setServiceName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className='on-surface-text' htmlFor="phone">Amount:</label>
//           <input
//             type="number"
//             id="phone"
//             placeholder='Enter Amount'
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className='on-surface-text' htmlFor="phone">Description:</label>
//           <input
//             type="tel"
//             id="phone"
//             placeholder='Enter Description'
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-btn tertiary-container on-tertiary-container-text">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default EventForm;


// import NotificationCard from "./NotificationCard";
import { useFetch } from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import { useSelector } from "react-redux";
import { useState } from "react";
export default function EventForm() {
  var notifications = [
    ["Paid Bill", "User rohan_arava paid a bill (Rs. 2500)"],
    ["Paid Bill", "User harsha_ak2 paid a bill (Rs. 500)"],
    ["Paid Bill", "User pranesh paid a bill (Rs. 3000)"],
    ["Bill due", "User allu_arjun has a bill due for Rs. 2500"],
  ];
  const businessId = useSelector(state=>state.stateReducer.object.businessDetails.id);
  const [count, setCount] = useState(0);
  const {loading, data, error} = useFetch(`https://bmaven.onrender.com/vendorutil/upcomingUnaccepted/${businessId}`, [count]);
  if(loading) return <Loading/>
  if(error) return <Error/>
  console.log(data)
  const styles = `
  .card {
    margin: 10px;
    padding: 10px;
  }
`;
  return (
    <div style = {{padding:"2em", width: "80vw"}}>
      <style>{styles}</style>
      {data.orders.map((item, index) => {
        return <OrderItem key={index} item={item} count={count} setCount={setCount}/>
      })}
    </div>
  );
}


function OrderItem({item, count, setCount}){
  console.log(item)
  return <div style={{
    padding: "1em", maxHeight: "40%",margin:"1em", width:"50vw", borderRadius: "20px", height: "90vh", overflowY: "scroll"
  }} className="secondary-container on-secondary-container-text">
    <p>User: {item.user}</p>
    <p>Item: {item.item}</p>
    <p>Count: {item.count}</p>
    <p>Date: {item.date}</p>
    <button onClick={()=>{fetch(`https://bmaven.onrender.com/vendorutil/acceptOrder/${item._id}`).then(()=>setCount(count+1))}}>Accept</button>
    <button onClick={()=>{fetch(`https://bmaven.onrender.com/vendorutil/rejectOrder/${item._id}`).then(()=>setCount(count+1))}}>Reject</button>
  </div> 
}