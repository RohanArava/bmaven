import NotificationCard from "./NotificationCard";
export default function Notifications() {
  var notifications = [
    ["New Year Offer", "Use code: NY50Off"],
    ["Year End Sale", "Use code: EOYS30Off"],
    ["Title 3", "Message 3"],
    ["Something", "something"],
  ];
  const styles = `
  .card {
    margin: 10px;
    padding: 10px;
  }
`;
  return (
    <div>
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
