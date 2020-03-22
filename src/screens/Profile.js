import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextMaskCustom from "../components/TextMaskCustom";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { updateUser } from "../service/firestore";
import "./Profile.css";

const Profile = props => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");

  const [hasTelephoneError, setHasTelephoneError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasCityError, setHasCityError] = useState(false);

  useEffect(() => {
    const localCity = localStorage.getItem("city");
    const camelizedCity =
      localCity.charAt(0).toUpperCase() + localCity.slice(1);
    setRole(localStorage.getItem("role"));
    setTelephone(localStorage.getItem("telephone"));
    setName(localStorage.getItem("name"));
    setCity(camelizedCity);
    setPlace(localStorage.getItem("place"));
  }, []);

  // Validate Functions
  const validateTelephone = () => {
    if (telephone && telephone.replace(/[\u2000]/g, "").length >= 14) {
      return true;
    } else {
      setHasTelephoneError(true);
      return false;
    }
  };

  const validateName = () => {
    if (name && name.replace(/\d/g, "").length > 3) {
      return true;
    } else {
      setHasNameError(true);
      return false;
    }
  };

  const validateCity = () => {
    if (city && city.replace(/\d/g, "").length > 3) {
      return true;
    } else {
      setHasCityError(true);
      return false;
    }
  };

  // Handle Change Functions
  const handleTelephoneChange = event => {
    setHasTelephoneError(false);
    setTelephone(event.target.value);
  };
  const handleNameChange = event => {
    setHasNameError(false);
    setName(event.target.value);
  };

  const handleCityChange = event => {
    setHasCityError(false);
    setCity(event.target.value);
  };

  const handlePlaceChange = event => {
    setPlace(event.target.value);
  };

  const handleUpdate = () => {
    const lowerCaseCity = city.toLowerCase();
    localStorage.setItem("role", role);
    localStorage.setItem("telephone", telephone);
    localStorage.setItem("name", name);
    localStorage.setItem("city", lowerCaseCity);
    localStorage.setItem("place", place);

    if (validateName() && validateTelephone() && validateCity()) {
      localStorage.setItem("hasOnboardFinished", "true");
      updateUser({
        role,
        telephone,
        name,
        city: lowerCaseCity,
        place: place || ""
      });
      // Callback father's onOnboardFinish function
      props.onUpdateFinish();
    }
  };

  return (
    <div>
      <div>
        <TextField
          error={hasNameError}
          helperText={hasNameError && "Nome inválido"}
          id="outlined-name"
          label="Nome completo"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">
          Número de telefone
        </InputLabel>
        <Input
          error={hasTelephoneError}
          value={telephone}
          onChange={handleTelephoneChange}
          name="formatted-text-mask-input"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
      <TextField disabled id="outlined-name" label="Ocupação" value={role} />
      <div>
        <TextField
          error={hasCityError}
          helperText={hasCityError && "Nome de cidade inválido"}
          id="outlined-city"
          label="Cidade"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      <div>
        <TextField
          id="outlined-place"
          label="Unidade de Saúde"
          value={place}
          onChange={handlePlaceChange}
        />
      </div>
      <div>
        <Button onClick={handleUpdate} color="primary" variant="contained">
          Atualizar dados
        </Button>
      </div>
    </div>
  );
};
export default Profile;
