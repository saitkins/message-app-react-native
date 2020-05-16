// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'
import { BaseURL } from '../Lib/AppConstants'

// our "constructor"
const create = (baseURL = BaseURL[AppConfig.env]) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // Auth
  const login = (credentials) => api.post('rest/users/login', credentials)
  const forgotPassword = (email) => api.post('rest/users/forgot-password', email)
  const changePassword = (params) => api.put('rest/users/change-password', params)

  // Profile
  const getProfile = () => api.get('rest/users/me')
  const editProfile = (data) => api.put('rest/users/', data)
  const submitAppIdea = (data) => api.post('rest/users/app-idea', data)

  // Events
  const getEvents = (params) => api.get('rest/events', params)
  const likeRemindEvent = (params) => api.put(`rest/events/${params.eventId}/${params.action}`)
  const getEventDetails = (eventId) => api.get(`rest/events/${eventId}`)

  // Meals
  const getMeals = (params) => api.get('rest/meals', params)
  const getMealDetails = (mealId) => api.get(`rest/meals/${mealId}`)
  const likeRemindMeal = (params) => api.put(`/rest/meals/${params.mealId}/${params.action}`)

  // Reminders
  const getReminders = (params) => api.get('/rest/events/reminders', params)
  const deleteReminder = (eventId) => api.put(`/rest/events/${eventId}/remind`)
  const markAsRead = (id) => api.put(`/rest/events/reminders/${id}/markRead`)

  // Attendance
  const attendanceRequest = (data) => api.post('/rest/attendances', data)
  const deleteAttendance = (attendanceId) => api.delete(`/rest/attendances/${attendanceId}`)
  const editAttendance = (attendanceId, data) => api.put(`/rest/attendances/${attendanceId}`, data)
  const getAttendanceDetails = (attendanceId) => api.get(`/rest/attendances/detail/${attendanceId}`)
  const getAttendance = (params, attendanceType) => api.get(`/rest/attendances/${attendanceType}`, params)

  // Messages
  const getMessages = (params) => api.get(`/rest/messages/`, params)
  const fetchMessageDetails = (messageId) => api.get(`/rest/messages/${messageId}`)

  // Notifications
  const fetchNotifications = (params) => api.get(`/rest/notifications/`, params)
  const fetchNotificationsCount = () => api.get(`/rest/notifications/count`)

  // device
  const setDeviceToken = (data) => api.put(`/rest/users/saveDevice`, data)

  //logout
  const logout = () => api.get('/rest/passport/logout')
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    ...api,
    login,
    changePassword,
    forgotPassword,

    getProfile,
    editProfile,
    submitAppIdea,

    getEvents,
    likeRemindEvent,
    getEventDetails,

    getMeals,
    getMealDetails,
    likeRemindMeal,

    getReminders,
    deleteReminder,
    markAsRead,

    attendanceRequest,
    getAttendance,
    getAttendanceDetails,
    editAttendance,
    deleteAttendance,

    getMessages,
    fetchMessageDetails,

    fetchNotifications,
    fetchNotificationsCount,

    setDeviceToken,
    logout
  }
}

// let's return back our create method as the default.
export default {
  create
}
