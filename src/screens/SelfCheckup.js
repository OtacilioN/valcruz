import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./SelfCheckup.css";
import { reportHealthCheck } from "../service/firestore";
import FeedbackModal from "../components/FeedbackModal";

const SelfCheckup = props => {
  const SYMPTOMS_LIST = [
    "Cansaço",
    "Congestão nasal",
    "Corrimento nasal (coriza)",
    "Febre",
    "Dificuldade para respirar",
    "Tosse",
    "Dor de Cabeça",
    "Dor de garganta",
    "Dores pelo corpo",
    "Mal estar geral"
  ];
  const EPIS_LIST = [
    "Gorro",
    "Óculos de proteção",
    "Protetor facial",
    "Máscara",
    "Avental hipermeável",
    "Luvas de procedimento"
  ];
  const [symptoms, setSymptom] = useState([]);
  const [reportId, setReportId] = useState();
  const [epi, setEPI] = useState([]);
  const [hadContact, setHadContact] = useState("Não sei informar");

  const onClickSympthon = buttonName => {
    if (symptoms.includes(buttonName)) {
      setSymptom(symptoms.filter(e => e !== buttonName));
    } else {
      setSymptom([...symptoms, buttonName]);
    }
  };

  const onClickEPI = buttonName => {
    if (epi.includes(buttonName)) {
      setEPI(epi.filter(e => e !== buttonName));
    } else {
      setEPI([...epi, buttonName]);
    }
  };

  const handleSubmit = async () => {
    const lastReport = { symptoms, epi, hadContact };
    localStorage.setItem("lastReport", JSON.stringify(lastReport));
    const dbReportId = await reportHealthCheck(lastReport);
    setReportId(dbReportId);
  };

  const handleClose = () => {
    setReportId();
    setSymptom([]);
    setEPI([]);
    setHadContact("Não sei informar");
    props.onSubmitCheckup();
  };

  return (
    <div>
      <h4>Faça uma auto-avaliação do seu estado de saúde.</h4>
      <div>
        {SYMPTOMS_LIST.map(s => (
          <Button
            variant={symptoms.includes(s) ? "contained" : "outlined"}
            onClick={() => onClickSympthon(s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <h4>Quais EPIs você teve acesso hoje?</h4>
      <div>
        {EPIS_LIST.map(e => (
          <Button
            variant={epi.includes(e) ? "contained" : "outlined"}
            onClick={() => onClickEPI(e)}
          >
            {e}
          </Button>
        ))}
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
      <FeedbackModal
        success={!symptoms.length}
        open={!!reportId}
        reportId={reportId}
        handleClose={handleClose}
        missingEpi={EPIS_LIST.filter(e => !epi.includes(e))}
      />
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
