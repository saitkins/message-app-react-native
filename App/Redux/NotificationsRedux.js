import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getNotifications: ['params'],
  getNotificationsSuccess: ['notifications', 'pageNo', 'hasNoMore'],
  getNotificationsFailure: ['error'],

  getNotificationsCount: null,
  getNotificationsCountSuccess: ['notificationsCount', 'messagesCount', 'remindersCount'],
  getNotificationsCountFailure: ['error'],

  setMessageCount: ['messageCount'],
  setNotificationCount: ['notificationCount'],
  setReminderCount: ['reminderCount']

})

export const NotificationsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  success: false,
  notifications: [],
  notificationsCount: 0,
  messagesCount: 0,
  remindersCount: 0,
  hasNoMore: false,
  pageNo: 1,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to getNotifications

export const getNotificationsReq = (state: Object, {params: {pageNo} = {}}) =>
  state.merge({fetching: true, success: false, pageNo: pageNo === 1 ? pageNo : state.pageNo})
export const getNotificationsSuccess = (state: Object, {notifications, pageNo, hasNoMore}: Object) =>
  state.merge({fetching: false, success: true, error: null, notifications, pageNo: pageNo + 1, hasNoMore})
export const getNotificationsFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, success: false, error})

// Get notifications count
export const getNotificationsCountReq = (state: Object) =>
  state.merge({fetching: true, success: false})
export const getNotificationsCountSuccess = (state: Object, {notificationsCount, messagesCount, remindersCount}: Object) =>
  state.merge({fetching: false, success: true, error: null, notificationsCount, messagesCount, remindersCount})
export const getNotificationsCountFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, success: false, error})
export const setMessageCount = (state: Object, {messageCount}: Object) =>
  state.merge({messagesCount: messageCount})
export const setNotificationCount = (state: Object, {notificationCount}: Object) =>
  state.merge({notificationsCount: notificationCount})
export const setReminderCount = (state: Object, {reminderCount}: Object) =>
  state.merge({remindersCount: reminderCount})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.GET_NOTIFICATIONS]: getNotificationsReq,
  [Types.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [Types.GET_NOTIFICATIONS_FAILURE]: getNotificationsFailure,

  [Types.GET_NOTIFICATIONS_COUNT]: getNotificationsCountReq,
  [Types.GET_NOTIFICATIONS_COUNT_SUCCESS]: getNotificationsCountSuccess,
  [Types.GET_NOTIFICATIONS_COUNT_FAILURE]: getNotificationsCountFailure,

  [Types.SET_MESSAGE_COUNT]: setMessageCount,
  [Types.SET_NOTIFICATION_COUNT]: setNotificationCount,
  [Types.SET_REMINDER_COUNT]: setReminderCount

})

/* ------------- Selectors ------------- */
