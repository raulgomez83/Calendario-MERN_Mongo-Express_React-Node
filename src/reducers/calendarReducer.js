import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
      title: "Cumple",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#fabada",
      notes: "Comprar regalo",
      user: { _id: "123", name: "Manolo" },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return { ...state, activeEvent: action.payload };
    default:
      return state;
  }
};
