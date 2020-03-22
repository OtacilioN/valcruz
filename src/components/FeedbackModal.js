import React from "react";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";

const FeedbackModal = ({ open, handleClose, success }) => {
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
        <div className="Container">
          {success ? (
            <CheckCircleOutlineIcon className="WarningIcon"/>
          ) : (
            <WarningIcon className="WarningIcon"/>
          )}
          <h4>
            {success
              ? "Sua auto-avaliação foi atualizada com sucesso!"
              : "Atenção! Risco de contaminação por COVID-19."}
          </h4>
          {!success && (
            <h6>
              Sua avaliação indica que há possibilidade de contaminação pelo
              COVID-19.
            </h6>
          )}
        </div>

        <div className="button-holder">
          <Button variant="outlined">reportar falta de epi</Button>
          <Button onClick={handleClose} variant="contained">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
