import React from "react";
import InforCard from "../components/InfoCard";
import "./Protocols.css";

const Protocols = ({ content }) => {
  const getDinamicCards = () => {
    return content.map(c => {
      const id = c[0];
      const data = c[1];
      return <InforCard key={id} id={id} data={data} />;
    });
  };
  return <div className="container">{getDinamicCards()}</div>;
};
export default Protocols;
