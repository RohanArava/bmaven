import React from 'react';

const NotificationCard = ({ notification }) => {
  return (
    <div className="secondary-container card">
      <div className="card-header">{notification[0]}</div>
      <div className="card-body">{notification[1]}</div>
    </div>
  );
};

export default NotificationCard;
