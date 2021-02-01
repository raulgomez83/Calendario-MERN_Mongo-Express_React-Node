import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { messages } from "../../helpers/calendar-messages-es";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    console.log("holi");
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem("lastView", e);
  };
  const onSelectedSlot = (e) => {
    dispatch(eventClearActiveEvent());
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
        endAccessor="finish"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectedSlot}
        selectable={true}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};
