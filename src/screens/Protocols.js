import React, { useEffect, useState } from "react";
import ProtocolCard1 from "../components/ProtocolCard1";
import ProtocolCard2 from "../components/ProtocolCard2";
import InforCard from "../components/InfoCard";
import { getContent } from "../service/firestore";
import "./Protocols.css";

const Protocols = props => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    getContent().then(dbContent => setContent(Object.entries(dbContent)));
  }, []);

  const getDinamicCards = () => {
    return content.map(c => {
      const id = c[0];
      const data = c[1];
      return <InforCard id={id} data={data} />;
    });
  };
  return (
    <div className="container">
      {getDinamicCards()}
      <ProtocolCard1 />
      <ProtocolCard2 />
    </div>
  );
};
export default Protocols;
