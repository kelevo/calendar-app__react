import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSateActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const {
    events,
    activeEvent
  } = useSelector( state => state.calendar );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSateActiveEvent( calendarEvent ) )
  }

  const startSavingEvent = async( calendarEvent ) => {

    // TODO: Llegar al backend

    // TODO: todo bien
    if ( calendarEvent._id ) {
      // Actualizando
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      // Creando
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }

  }

  const startDeleteEvent = async() => {
    // Todo: llegar al backend
    dispatch( onDeleteEvent() );
  }

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Metodos
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  }

}