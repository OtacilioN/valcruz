import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = props => {
  const [name, setName] = useState();
  const [telephone, setTelephone] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setTelephone(localStorage.getItem("telephone"));
    setName(localStorage.getItem("name"));
  }, []);
  return (
    <div>
      <p>Nome:</p>
      <h1>{name}</h1>
      <p>Número do Telefone:</p>
      <h1>{telephone}</h1>
      <p>Ocupação:</p>
      <h1>{role}</h1>
    </div>
  );
};
export default Profile;
