import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getProfile: ['loading'],
  getProfileSuccess: ['profile'],
  getProfileFailure: ['error'],

  editProfile: ['data'],
  editProfileSuccess: ['profile'],
  editProfileFailure: ['error'],

  submitAppIdea: ['data'],
  submitAppIdeaSuccess: ['idea'],
  submitAppIdeaFailure: ['error'],

  getReminders: ['params'],
  getRemindersSuccess: ['reminders', 'pageNo', 'hasNoMore'],
  getRemindersFailure: ['error'],

  markAsRead: ['id'],
  markAsReadSuccess: ['id'],
  markAsReadFailure: ['error'],

  clearRemindersList: null,

  deleteReminder: ['eventId'],
  deleteReminderSuccess: ['eventId'],
  deleteReminderFailure: ['error']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  success: false,
  fetching: false,
  deleting: false,
  marking: false,
  error: undefined,
  profile: {},
  reminders: [],
  hasNoMore: false,
  pageNo: 1
})

/* ------------- Reducers ------------- */

// get Profile
export const getProfileRequest = (state: Object, {loading}) => state.merge({fetching: loading, error: null})
export const getProfileSuccess = (state: Object, {profile}: Object) => state.merge({fetching: false, error: null, profile})
export const getProfileFailure = (state: Object, {error}: Object) => state.merge({fetching: false, error})

export const editProfileRequest = (state: Object) => state.merge({fetching: true, error: null})
export const editProfileSuccess = (state: Object, {profile}: Object) => state.merge({fetching: false, error: null, profile})
export const editProfileFailure = (state: Object, {error}: Object) => state.merge({fetching: false, error})

export const submitAppIdea = (state: Object) => state.merge({fetching: true, error: null})
export const submitAppIdeaSuccess = (state: Object, {profile}: Object) => state.merge({fetching: false, error: null})
export const submitAppIdeaFailure = (state: Object, {error}: Object) => state.merge({fetching: false, error})

export const getRemindersReq = (state: Object, {params: {pageNo} = {}}) =>
   state.merge({fetching: true, pageNo: pageNo === 1 ? pageNo : state.pageNo})

export const getRemindersSuccess = (state: Object, {reminders, pageNo, hasNoMore}: Object) =>
  state.merge({fetching: false, error: null, reminders, pageNo: pageNo + 1, hasNoMore})
export const getRemindersFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, error})

export const deleteReminderReq = (state: Object) =>
  state.merge({deleting: true})

export const deleteReminderSuccess = (state: Object, {eventId}: Object) => {
  let reminders = Immutable.asMutable(state.reminders || [])
  reminders = reminders.filter(({_id}) => _id !== eventId)
  return state.merge({deleting: false, error: null, reminders})
}
export const deleteReminderFailure = (state: Object, {error}: Object) =>
  state.merge({deleting: false, error})

export const markAsReadReq = (state: Object) =>
  state.merge({marking: true})

export const markAsReadSuccess = (state: Object, {id}: Object) => {
  let reminders = Immutable.asMutable(state.reminders || [])
  reminders = reminders.filter(({reminderId}) => reminderId !== id)
  return state.merge({marking: false, error: null, reminders})
}
export const markAsReadFailure = (state: Object, {error}: Object) =>
  state.merge({marking: false, error})

// Clear Reminder listing on switch Tab
export const clearRemindersList = (state: Object) => state.merge({reminders: []})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROFILE]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,

  [Types.EDIT_PROFILE]: editProfileRequest,
  [Types.EDIT_PROFILE_SUCCESS]: editProfileSuccess,
  [Types.EDIT_PROFILE_FAILURE]: editProfileFailure,

  [Types.SUBMIT_APP_IDEA]: submitAppIdea,
  [Types.SUBMIT_APP_IDEA_SUCCESS]: submitAppIdeaSuccess,
  [Types.SUBMIT_APP_IDEA_FAILURE]: submitAppIdeaFailure,

  [Types.GET_REMINDERS]: getRemindersReq,
  [Types.GET_REMINDERS_SUCCESS]: getRemindersSuccess,
  [Types.GET_REMINDERS_FAILURE]: getRemindersFailure,

  [Types.DELETE_REMINDER]: deleteReminderReq,
  [Types.DELETE_REMINDER_SUCCESS]: deleteReminderSuccess,
  [Types.DELETE_REMINDER_FAILURE]: deleteReminderFailure,

  [Types.MARK_AS_READ]: markAsReadReq,
  [Types.MARK_AS_READ_SUCCESS]: markAsReadSuccess,
  [Types.MARK_AS_READ_FAILURE]: markAsReadFailure,

  [Types.CLEAR_REMINDERS_LIST]: clearRemindersList
})

/* ------------- Selectors ------------- */
export const selectUserInfo = (state) => state.user
