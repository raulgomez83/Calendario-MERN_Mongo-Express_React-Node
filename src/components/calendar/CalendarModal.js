import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import moment from "moment";

import { customStyles } from "../../helpers/modal-styles";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = now.clone().add(1, "hours");

/////////////////////////////////////////////////////////////////////////////////////////

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateFinish, setDateFinish] = useState(nowPlus.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: now.toDate(),
    finish: nowPlus.toDate(),
  });

  const { title, notes, start, finish } = formValues;

  /////////////////////////////
  const closeModal = () => {
    dispatch(uiCloseModal());
  };
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };
  const handleFinishDateChange = (e) => {
    setDateFinish(e);
    setFormValues({
      ...formValues,
      finish: e,
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentFinish = moment(finish);

    if (momentStart.isSameOrAfter(momentFinish)) {
      Swal.fire(
        "Error",
        "Fecha final debe de ser mayor que fecha uno",
        "error"
      );
      return;
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    setTitleValid();
    /*  closeModal(); */
  };
  /////////////////////////////////

  /*  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  }; */
  return (
    <Modal
      isOpen={modalOpen}
      /* onAfterOpen={afterOpenModal}*/
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={300}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h4> Nuevo evento </h4>
      <form className="container" onChange={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <br />
          <DateTimePicker
            className="form-group"
            onChange={handleStartDateChange}
            value={dateStart}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <br />
          <DateTimePicker
            className="form-group"
            onChange={handleFinishDateChange}
            value={dateFinish}
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name={title}
            onChange={handleInputChange}
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
            name={notes}
            onChange={handleInputChange}
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
