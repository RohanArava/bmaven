import NotificationCard from "./NotificationCard";
export default function Notifications() {
  var notifications = [
    ["Paid Bill", "User rohan_arava paid a bill (Rs. 2500)"],
    ["Paid Bill", "User harsha_ak2 paid a bill (Rs. 500)"],
    ["Paid Bill", "User pranesh paid a bill (Rs. 3000)"],
    ["Bill due", "User allu_arjun has a bill due for Rs. 2500"],
  ];
  const styles = `
  .card {
    margin: 10px;
    padding: 10px;
  }
`;
  return (
    <div style = {{padding:"2em 20em"}}>
      <style>{styles}</style>
      {notifications.map((notification, index) => (
        <NotificationCard
          className="card"
          key={index}
          notification={notification}
        />
      ))}
    </div>
  );
}
