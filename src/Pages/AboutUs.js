import React, { useState } from "react";
import logo from "./Marketplace-amico.png"
import logo2 from "./Search-amico.png";
import logo3 from "./Product hunt-bro.png";
function AboutUs() {
  return (
    <div style={{overflowY:"scroll", height:"100vh"}}>
    <div style={{ height:"fit-content", paddingLeft: "5%", paddingRight: "5%" }}>
      <div
        className="row featurette"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <div className="col-md-7 order-md-2">
          <h2 className="primary-text">
            <b>Your favourite vendors</b>
            <span className="secondary-text">, here on BizMaven</span>
          </h2>
          <p className="secondary-text">
            Biz Maven has an extensive community of users and vendors in all
            major cities of the country. Contact any vendor you prefer right
            now, Or save them for later.
          </p>
        </div>
        <div className="col-md-5 order-md-1">
          <img
            className="featurette-image img-fluid mx-auto"
            data-src="holder.js/500x500/auto"
            alt="500x500"
            style={{ width: "500px", height: "500px" }}
            src={String(logo)}
            data-holder-rendered="true"
          />
        </div>
      </div>
      <div
        className="row featurette"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <div className="col-md-7">
          <h2 className="primary-text">
            <b>Everything</b>
            <span className="secondary-text"> is just a search away.</span>
          </h2>
          <p className="secondary-text">
            Find local businesses for any service. You can easily choose between
            multiple businesses with the help of ratings and reviews.
          </p>
        </div>
        <div className="col-md-5">
          <img
            className="featurette-image img-fluid mx-auto"
            data-src="holder.js/500x500/auto"
            alt="500x500"
            style={{ width: "500px", height: "500px" }}
            src={String(logo2)}
            data-holder-rendered="true"
          />
        </div>
      </div>
      <div
        className="row featurette"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <div className="col-md-7 order-md-2">
          <h2 className="primary-text">
            <b>Oh yeah, it's that good.</b>
            <span className="secondary-text"> See for yourself.</span>
          </h2>
          <p className="secondary-text">
            Maven has helped lots of people and businesses across India.
          </p>
        </div>
        <div className="col-md-5 order-md-1">
          <img
            className="featurette-image img-fluid mx-auto"
            data-src="holder.js/500x500/auto"
            alt="500x500"
            style={{ width: "500px", height: "500px" }}
            src={String(logo3)}
            data-holder-rendered="true"
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "20px",
          paddingTop: "30px",
        }}
      >
        <div
          className="secondary-container"
          style={{
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          <h1 className="primary-text">
            <b>2,500+</b>
          </h1>
          <h5 className="secondary-text">Users Joined</h5>
        </div>
        <div
          className="secondary-container"
          style={{
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          <h1 className="primary-text">
            <b>500+</b>
          </h1>
          <h5 className="secondary-text">Registered Vendors</h5>
        </div>
        <div
          className="secondary-container"
          style={{
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          <h1 className="primary-text">
            <b>85,000+</b>
          </h1>
          <h5 className="secondary-text">Times Visited</h5>
        </div>
        <div
          className="secondary-container"
          style={{
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          <h1 className="primary-text">
            <b>250+</b>
          </h1>
          <h5 className="secondary-text">New Users Everyday</h5>
        </div>
      </div>
      <div style={{ margin: "5%" }}>
        <hr></hr>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <h1 className="primary-text">Meet the Developers</h1>
        </div>
        <div className="row">
          <div
            className="col-lg-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "spaceAround",
              padding: "10px",
            }}
          >
            <img
              className="rounded-circle"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt="Generic placeholder"
              width="140"
              height="140"
            />
            <h2 className="secondary-text" style={{ padding: "5px" }}>
              Rohan Arava
            </h2>
          </div>
          <div
            className="col-lg-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <img
              className="rounded-circle"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt="Generic placeholder"
              width="140"
              height="140"
            />
            <h2 className="secondary-text" style={{ padding: "5px" }}>
              Pranesh S
            </h2>
          </div>
          <div
            className="col-lg-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <img
              className="rounded-circle"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt="Generic placeholder"
              width="140"
              height="140"
            />
            <h2 className="secondary-text" style={{ padding: "5px" }}>
              Sri Harsha Kurra
            </h2>
          </div>
          <div
            className="col-lg-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <img
              className="rounded-circle"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt="Generic placeholder"
              width="140"
              height="140"
            />
            <h2 className="secondary-text" style={{ padding: "5px" }}>
              Swejan A
            </h2>
          </div>
          <div
            className="col-lg-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <img
              className="rounded-circle"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt="Generic placeholder"
              width="140"
              height="140"
            />
            <h2 className="secondary-text" style={{ padding: "5px" }}>
              Pavan
            </h2>
          </div>
        </div>
      </div>
    </div></div>
  );
}
export default AboutUs;
