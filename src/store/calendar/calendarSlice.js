import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleaños del jefe",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: "FAFAFA",
  user: {
    _id: "123",
    name: "Patrick"
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null
  },
  reducers: {
    onSateActiveEvent: ( state, { payload } ) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: ( state, { payload } ) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: ( state, { payload } ) => {
      state.events = state.events.map( event => {
        if ( event._id === payload._id ) {
          return payload;
        }

        return event;
      })
    },
    onDeleteEvent: ( state ) => {
      if ( state.activeEvent ) {
        state.events = state.events.filter( event => event._id !== state.activeEvent._id );
        state.activeEvent = null;
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  onSateActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent
} = calendarSlice.actions;