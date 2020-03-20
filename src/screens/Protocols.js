import React from "react";
import ProtocolCard1 from "../components/ProtocolCard1";
import ProtocolCard2 from "../components/ProtocolCard2";
import "./Protocols.css";

const Protocols = props => {
  return (
    <div className="container">
      <ProtocolCard1 />
      <ProtocolCard2 />
    </div>
  );
};
export default Protocols;
