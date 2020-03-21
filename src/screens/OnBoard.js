import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextMaskCustom from "../components/TextMaskCustom";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { setUser } from "../service/firestore";
import "./OnBoard.css";

const OnBoard = props => {
  // States
  const [role, setRole] = useState();
  const [othersRole, setOthersRole] = useState("");
  const [telephone, setTelephone] = useState();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [hasSelectedOthersRole, setHasSelectedOthersRole] = useState(false);
  const [hasTelephoneError, setHasTelephoneError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasCityError, setHasCityError] = useState(false);

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
    setHasNameError(false);
    setCity(event.target.value);
  };

  const handlePlaceChange = event => {
    setPlace(event.target.value);
  };

  const handleOthersRoleChange = event => {
    setOthersRole(event.target.value);
  };

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

  // Handle the click to finish the onboard
  const handleFilledOthers = () => {
    setRole(othersRole);
  };
  const handleFinishOnboard = () => {
    const lowerCaseCity = city.toLowerCase();
    localStorage.setItem("role", role);
    localStorage.setItem("telephone", telephone);
    localStorage.setItem("name", name);
    localStorage.setItem("city", lowerCaseCity);

    if (validateName() && validateTelephone() && validateCity()) {
      localStorage.setItem("hasOnboardFinished", "true");
      setUser({
        role,
        telephone,
        name,
        city: lowerCaseCity,
        place: place || ""
      });
      // Callback father's onOnboardFinish function
      props.onOnboardFinish();
    }
  };

  // Auxiliar component to get user's role
  const RoleInput = () => {
    return (
      <div>
        <Button
          onClick={() => {
            setRole("Medico");
          }}
          className="choiceButton"
        >
          Médico (a)
        </Button>
        <Button
          onClick={() => {
            setRole("Enfermeiro");
          }}
          className="choiceButton"
        >
          Enfermeiro (a)
        </Button>
        <Button
          onClick={() => {
            setRole("Técnico");
          }}
          className="choiceButton"
        >
          Técnico (a)
        </Button>
        <Button
          onClick={() => {
            setHasSelectedOthersRole(true);
          }}
          className="choiceButton"
        >
          Outros
        </Button>
      </div>
    );
  };

  // Main JSX Component
  return (
    <div>
      <div className="barra-azul"></div>
      <h1>Olá, bem vindo(a) ao ValCruz.</h1>
      {!role && <h5>Em qual dessas funções você se enquadra melhor?</h5>}
      {role ? (
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
          <div>
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
          </div>
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
          <Button
            onClick={handleFinishOnboard}
            color="primary"
            variant="contained"
            className="nextButton"
          >
            Próximo
          </Button>
        </div>
      ) : hasSelectedOthersRole ? (
        <div>
          <TextField
            id="outlined-others-role"
            label="Função"
            value={othersRole}
            onChange={handleOthersRoleChange}
          />
          <Button
            onClick={handleFilledOthers}
            color="primary"
            variant="contained"
            className="nextButton"
          >
            Próximo
          </Button>
        </div>
      ) : (
        <RoleInput />
      )}
    </div>
  );
};
export default OnBoard;
