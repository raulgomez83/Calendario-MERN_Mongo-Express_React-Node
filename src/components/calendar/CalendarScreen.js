import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { messages } from "../../helpers/calendar-messages-es";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";

moment.locale("es");

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Cumple",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fabada",
    notes: "Comprar regalo",
    user: { _id: "123", name: "Manolo" },
  },
];

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
    dispatch(uiOpenModal());
  };
  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      color: "white",
      display: "block",
      opacity: 0.8,
    };
    return { style };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
