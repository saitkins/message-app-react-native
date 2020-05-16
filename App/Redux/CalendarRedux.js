import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getEvents: null,
  getEventsSuccess: ['events'],
  getEventsFailure: ['error'],

  getEventDetails: ['params'],
  getEventDetailsSuccess: ['eventDetails'],
  getEventDetailsFailure: ['error'],

  likeEvent: ['params'],
  likeEventSuccess: ['data'],
  likeEventFailure: ['error'],

  setCalendarHeight: ['calendarHeight']
})

export const CalendarTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  saving: false,
  success: false,
  eventDetails: {},
  events: {},
  calendarHeight: 370
})

/* ------------- Reducers ------------- */

export const getEventsReq = (state) => state.merge({fetching: true})
export const getEventsSuccess = (state, {events}) => {
  return state.merge({fetching: false, error: null, events})
}
export const getEventsFailure = (state) => state.merge({ fetching: false, error: true })

export const getEventDetails = (state) => state.merge({fetching: true, success: false, eventDetails: {}})
export const getEventDetailsSuccess = (state, {eventDetails}) => {
  return state.merge({fetching: false, success: true, error: null, eventDetails})
}
export const getEventDetailsFailure = (state) => state.merge({ fetching: false, success: false, error: true })

export const likeEventReq = (state) => state.merge({updating: true})
export const likeEventSuccess = (state, {data}) => {
  let eventDetails = Immutable.asMutable(state.eventDetails || {})
  eventDetails = {...eventDetails, ...data}
  return state.merge({updating: false, error: null, eventDetails})
}
export const likeEventFailure = (state) => state.merge({ updating: false, error: true })

export const setCalendarHeight = (state, {calendarHeight}: Object) => state.merge({ calendarHeight })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_EVENTS]: getEventsReq,
  [Types.GET_EVENTS_SUCCESS]: getEventsSuccess,
  [Types.GET_EVENTS_FAILURE]: getEventsFailure,

  [Types.GET_EVENT_DETAILS]: getEventDetails,
  [Types.GET_EVENT_DETAILS_SUCCESS]: getEventDetailsSuccess,
  [Types.GET_EVENT_DETAILS_FAILURE]: getEventDetailsFailure,

  [Types.LIKE_EVENT]: likeEventReq,
  [Types.LIKE_EVENT_SUCCESS]: likeEventSuccess,
  [Types.LIKE_EVENT_FAILURE]: likeEventFailure,

  [Types.SET_CALENDAR_HEIGHT]: setCalendarHeight
})
