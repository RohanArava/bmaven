import React, { useState } from "react";
import logo from "./Marketplace-amico.png"
import logo2 from "./Search-amico.png";
import logo3 from "./Product hunt-bro.png";
function AboutUs() {
  const imageurl ="data:image/jpeg;base64,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"
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
              src={imageurl}
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
              src={imageurl}
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
              src={imageurl}
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
              src={imageurl}
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
              src={imageurl}
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
