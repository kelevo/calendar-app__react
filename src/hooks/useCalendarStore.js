import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSateActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDataEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const {
    events,
    activeEvent
  } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSateActiveEvent( calendarEvent ) )
  }

  const startSavingEvent = async ( calendarEvent ) => {

    try {

      if ( calendarEvent.id ) {
        // Actualizando
        await calendarApi.put( `/events/${ calendarEvent.id }`, calendarEvent );
        dispatch( onUpdateEvent({ ...calendarEvent, user }) );
        return;
      }
      
      // Creando
      const { data } = await calendarApi.post( '/events', calendarEvent );
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user: user }) );

    } catch (error) {
      console.log(error);
      Swal.fire( 'Error al guardar', error.response.data.msg, 'error' );
    }
  }

  const startDeleteEvent = async() => {
    
    try {

      await calendarApi.delete( `/events/${ activeEvent.id }` );
      dispatch( onDeleteEvent() );

    } catch (error) {
      console.log(error);
      Swal.fire( 'Error al eliminar', error.response.data.msg, 'error' );
    }
    

  }

  const startLoadingEvents = async () => {

    try {

      const { data } = await calendarApi.get( '/events' );
      console.log( data );
      const events = convertEventsToDataEvents( data.msg );
      dispatch( onLoadEvents( events ) );

    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }

  }

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Metodos
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents
  }

}