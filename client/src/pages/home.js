import React from "react";
import homeVideo from "../assets/ws.mp4";
import presenter from "../assets/presenter.jpg";
import audience from "../assets/audience.jpg";
import { Card } from "primereact/card";

export default function home() {
  const headerP = <img alt="Card" src={presenter} />;
  const headerA = <img alt="Card" src={audience} />;
  return (
    <>
      <div className="p-grid p-justify-around p-align-center authpage">
        <Card header={headerP} className="homeCards">
          <h5 class="text-center">Presenter</h5>
        </Card>
        <Card header={headerA} className="homeCards">
          <h5 class="text-center">Audience</h5>
        </Card>
      </div>
      <video autoPlay muted loop id="myVideo">
        <source src={homeVideo} type="video/mp4" />
      </video>
    </>
  );
}
