import React, { useState } from "react";
import Modal from "react-modal";

import { customStyles } from "../../helpers/modal-styles";

Modal.setAppElement("#root");

export const CalendarModal = () => {
  /*  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  }; */
  return (
    <Modal
      isOpen={true}
      /* onAfterOpen={afterOpenModal}*/
      /*   onRequestClose={closeModal} */
      style={customStyles}
      closeTimeoutMS={300}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h4> Nuevo evento </h4>
      <form className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <input className="form-control" placeholder="Fecha inicio" />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <input className="form-control" placeholder="Fecha inicio" />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="2"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
