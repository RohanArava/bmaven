import NotificationCard from "./NotificationCard";
import { useFetch } from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import { useSelector } from "react-redux";
export default function Notifications() {
  var notifications = [
    ["Paid Bill", "User rohan_arava paid a bill (Rs. 2500)"],
    ["Paid Bill", "User harsha_ak2 paid a bill (Rs. 500)"],
    ["Paid Bill", "User pranesh paid a bill (Rs. 3000)"],
    ["Bill due", "User allu_arjun has a bill due for Rs. 2500"],
  ];
  const businessId = useSelector(state=>state.stateReducer.object.businessDetails.id);
  const {loading, data, error} = useFetch(`http://localhost:8085/vendorutil/upcomingAccepted/${businessId}`);
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
    <div style = {{padding:"2em 20em"}}>
      <style>{styles}</style>
      {JSON.stringify(data)}
    </div>
  );
}
