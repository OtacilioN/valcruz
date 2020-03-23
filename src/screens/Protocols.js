import React from "react";
import InforCard from "../components/InfoCard";
import "./Protocols.css";

const Protocols = ({ content }) => {
  const getDinamicCards = () => {
    //order the content
    content.sort(function(a, b) {
      console.log(a)
      const adate = a[1].date.split('/');
      const bdate = b[1].date.split('/');
  
      //1- check year
      if(adate[2] !== bdate[2]){
        return bdate[2] - adate[2];
      }
      //2- Check Month
      else if(adate[1] !== bdate[1]){
        return bdate[1] - adate[1];
      }
      else{
        return bdate[0] - adate[0];
      }
    });

    //return cards
    return content.map(c => {
      const id = c[0];
      const data = c[1];
      return <InforCard key={id} id={id} data={data} />;
    });
  };
  return <div className="container">{getDinamicCards()}</div>;
};
export default Protocols;
