import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import { updateHealthCheck } from "../service/firestore";

const FeedbackModal = ({
  open,
  handleClose,
  success,
  missingEpi,
  reportId
}) => {
  const [openReportEpi, setOpenReportEpi] = useState(false);
  const [reportedEpi, setReportedEpi] = useState([]);

  const onClickEPI = buttonName => {
    if (reportedEpi.includes(buttonName)) {
      setReportedEpi(reportedEpi.filter(e => e !== buttonName));
    } else {
      setReportedEpi([...reportedEpi, buttonName]);
    }
  };

  const sendReport = () => {
    updateHealthCheck({ missingEpis: reportedEpi }, reportId);
    handleClose();
  };

  const FeedbackBody = () => (
    <div>
      <div className="Container">
        {success ? (
          <CheckCircleOutlineIcon className="WarningIcon" />
        ) : (
          <WarningIcon className="WarningIcon" />
        )}
        <h4>
          {success
            ? "Sua auto-avaliação foi atualizada com sucesso!"
            : "Atenção! Compatibilidade de sintomas de contaminação por COVID-19."}
        </h4>
        {!success && (
          <h6>
            Você marcou sintomas compatíveis com a COVID19, esteja atento e
            considere examinar.
          </h6>
        )}
      </div>

      <div className="button-holder">
        <Button onClick={() => setOpenReportEpi(true)} variant="outlined">
          reportar falta de epi
        </Button>
        <Button onClick={handleClose} variant="contained">
          OK
        </Button>
      </div>
    </div>
  );

  const FeedbackEpi = () => (
    <div>
      <h4>Reportar falta de EPI</h4>
      <h6>
        Marque os EPIs que você não teve acesso durante o plantão de
        atendimento.
      </h6>
      <div>
        {missingEpi.map(e => (
          <Button
            variant={reportedEpi.includes(e) ? "contained" : "outlined"}
            onClick={() => onClickEPI(e)}
          >
            {e}
          </Button>
        ))}
      </div>
      <div>
        <Button
          className="rounded-button"
          onClick={sendReport}
          variant="contained"
        >
          enviar
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      aria-labelledby="Enviado com sucesso"
      aria-describedby="Os dados foram enviados com sucesso"
      open={open}
      onClose={handleClose}
    >
      <div className="Modal">
        <div className="CloseButton">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {openReportEpi ? <FeedbackEpi /> : <FeedbackBody />}
      </div>
    </Modal>
  );
};

export default FeedbackModal;
