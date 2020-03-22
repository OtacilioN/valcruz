import React, { useEffect, useState } from "react";
import InforCard from "../components/InfoCard";
import { getContent } from "../service/firestore";
import { requestPermission } from "../service/PushNotifications";

import "./Protocols.css";

const Protocols = props => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    // Get Content
    getContent(localStorage.getItem("role")).then(dbContent =>
      setContent(Object.entries(dbContent))
    );

    // Update Content every minute
    setInterval(() => {
      // han pooling at 1 minute
      getContent(localStorage.getItem("role")).then(dbContent =>
        setContent(Object.entries(dbContent))
      );
    }, 60 * 1000);

    // Request firebase permission
    requestPermission();
  }, []);

  const getDinamicCards = () => {
    return content.map(c => {
      const id = c[0];
      const data = c[1];
      return <InforCard key={id} id={id} data={data} />;
    });
  };
  return (
    <div className="container">
      {getDinamicCards()}
    </div>
  );
};
export default Protocols;
