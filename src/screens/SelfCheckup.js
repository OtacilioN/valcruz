import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./SelfCheckup.css";
import TextField from "@material-ui/core/TextField";

const SelfCheckup = props => {
  const [symptoms, setSymptom] = useState([]);
  const onClickSympthon = buttonName => {
    if (symptoms.includes(buttonName)) {
      setSymptom(symptoms.filter(e => e !== buttonName));
    } else {
      setSymptom([...symptoms, buttonName]);
    }
  };

  const [epi, setEPI] = useState([]);
  const onClickEPI = buttonName => {
    if (epi.includes(buttonName)) {
      setEPI(epi.filter(e => e !== buttonName));
    } else {
      setEPI([...epi, buttonName]);
    }
  };

  const [hadContact, setHadContact] = useState();

  const [temperature, setTemperature] = React.useState("");
  const handleChange = event => {
    setTemperature(event.target.value);
  };

  const handleSubmit = () => {
    const lastReport = { symptoms, epi, hadContact };
    localStorage.setItem("lastReport", JSON.stringify(lastReport));
    setSymptom([]);
    setEPI([]);
    setTemperature("");
    setHadContact();
    props.onSubmitCheckup();
  };
  return (
    <div>
      <h4>Faça uma auto-avaliação do seu estado de saúde.</h4>
      <div>
        <Button
          variant={symptoms.includes("Cansaço") ? "contained" : "outlined"}
          onClick={() => onClickSympthon("Cansaço")}
        >
          Cansaço
        </Button>
        <Button
          variant={
            symptoms.includes("Congestão nasal") ? "contained" : "outlined"
          }
          onClick={() => onClickSympthon("Congestão nasal")}
        >
          Congestão nasal
        </Button>
        <Button
          variant={
            symptoms.includes("Corrimento nasal (coriza)")
              ? "contained"
              : "outlined"
          }
          onClick={() => onClickSympthon("Corrimento nasal (coriza)")}
        >
          Corrimento nasal (coriza)
        </Button>
        <Button
          variant={symptoms.includes("Febre") ? "contained" : "outlined"}
          onClick={() => onClickSympthon("Febre")}
        >
          Febre
        </Button>
        <Button
          variant={
            symptoms.includes("Dificuldade para respirar")
              ? "contained"
              : "outlined"
          }
          onClick={() => onClickSympthon("Dificuldade para respirar")}
        >
          Dificuldade para respirar
        </Button>
        <Button
          variant={symptoms.includes("Tosse") ? "contained" : "outlined"}
          onClick={() => onClickSympthon("Tosse")}
        >
          Tosse
        </Button>
        <Button
          variant={
            symptoms.includes("Dor de Cabeça") ? "contained" : "outlined"
          }
          onClick={() => onClickSympthon("Dor de Cabeça")}
        >
          Dor de Cabeça
        </Button>
        <Button
          variant={
            symptoms.includes("Dor de garganta") ? "contained" : "outlined"
          }
          onClick={() => onClickSympthon("Dor de garganta")}
        >
          Dor de garganta
        </Button>
        <Button
          variant={
            symptoms.includes("Dores pelo corpo") ? "contained" : "outlined"
          }
          onClick={() => onClickSympthon("Dores pelo corpo")}
        >
          Dores pelo corpo
        </Button>
        <Button
          variant={
            symptoms.includes("Mal estar geral") ? "contained" : "outlined"
          }
          onClick={() => onClickSympthon("Mal estar geral")}
        >
          Mal estar geral
        </Button>
      </div>
      <div>
        <TextField
          id="temperature"
          label="Temperatura em ºC"
          value={temperature}
          onChange={handleChange}
        />
      </div>
      <h4>Quais destas EPIs você utilizou hoje?</h4>
      <div>
        <Button
          variant={epi.includes("Gorro") ? "contained" : "outlined"}
          onClick={() => onClickEPI("Gorro")}
        >
          Gorro
        </Button>
        <Button
          variant={
            epi.includes("Óculos de proteção") ? "contained" : "outlined"
          }
          onClick={() => onClickEPI("Óculos de proteção")}
        >
          Óculos de proteção
        </Button>
        <Button
          variant={epi.includes("Protetor facial") ? "contained" : "outlined"}
          onClick={() => onClickEPI("Protetor facial")}
        >
          Protetor facial
        </Button>
        <Button
          variant={epi.includes("Máscara") ? "contained" : "outlined"}
          onClick={() => onClickEPI("Máscara")}
        >
          Máscara
        </Button>
        <Button
          variant={
            epi.includes("Avental hipermeável") ? "contained" : "outlined"
          }
          onClick={() => onClickEPI("Avental hipermeável")}
        >
          Avental hipermeável
        </Button>
        <Button
          variant={
            epi.includes("Luvas de procedimento") ? "contained" : "outlined"
          }
          onClick={() => onClickEPI("Luvas de procedimento")}
        >
          Luvas de procedimento
        </Button>
      </div>
      <h4>Algum paciente atendido foi diagnosticado como positivo?</h4>
      <div>
        <Button
          variant={hadContact === "Sim" ? "contained" : "outlined"}
          onClick={() => setHadContact("Sim")}
        >
          Sim
        </Button>
        <Button
          variant={hadContact === "Não" ? "contained" : "outlined"}
          onClick={() => setHadContact("Não")}
        >
          Não
        </Button>
        <Button
          variant={hadContact === "Não sei informar" ? "contained" : "outlined"}
          onClick={() => setHadContact("Não sei informar")}
        >
          Não sei informar
        </Button>
      </div>
      <div>
        <Button
          onClick={handleSubmit}
          className="rounded-button"
          variant="contained"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};
export default SelfCheckup;
