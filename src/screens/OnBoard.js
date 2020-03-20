import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextMaskCustom from "../components/TextMaskCustom";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import "./OnBoard.css";

const OnBoard = props => {
  const [role, setRole] = useState();
  const [telephone, setTelephone] = useState();
  const handleTelephoneChange = event => {
    setTelephone(event.target.value);
  };
  const [name, setName] = React.useState("");
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleFinishOnboard = () => {
    localStorage.setItem("role", role);
    localStorage.setItem("telephone", telephone);
    localStorage.setItem("name", name);
    localStorage.setItem("hasOnboardFinished", "true");
    props.onOnboardFinish();
  };

  const RoleInput = () => (
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
          setRole("Tecnico");
        }}
        className="choiceButton"
      >
        Técnico (a)
      </Button>
      <Button
        onClick={() => {
          setRole("Outros");
        }}
        className="choiceButton"
      >
        Outros
      </Button>
    </div>
  );

  return (
    <div>
      <div className="barra-azul"></div>
      <h1>Olá, bem vindo(a) ao ValCruz.</h1>
      {!role && <h5>Em qual dessas funções você se enquadra melhor?</h5>}
      {role ? (
        <div>
          <div>
            <TextField
              id="outlined-name"
              label="Nome completo"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="formatted-text-mask-input">
                Número de telefone
              </InputLabel>
              <Input
                value={telephone}
                onChange={handleTelephoneChange}
                name="formatted-text-mask-input"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
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
      ) : (
        <RoleInput />
      )}
    </div>
  );
};
export default OnBoard;
