import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import moment from "moment";

import { customStyles } from "../../helpers/modal-styles";
import { uiCloseModal } from "../../actions/ui";
import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
} from "../../actions/events";

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  finish: nowPlus.toDate(),
};

/////////////////////////////////////////////////////////////////////////////////////////

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateFinish, setDateFinish] = useState(nowPlus.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, finish } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  /////////////////////////////
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
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
    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Fernando",
          },
        })
      );
    }
    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={300}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h4> {activeEvent ? "Editar evento" : "Nuevo evento"}</h4>
      <form className="container" onSubmit={handleSubmitForm}>
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
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
            name="title"
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
            value={notes}
            name="notes"
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
