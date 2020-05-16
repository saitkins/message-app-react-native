import { all, takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { CalendarTypes } from '../Redux/CalendarRedux'
import { MealsTypes } from '../Redux/MealsRedux'
import { UserTypes } from '../Redux/UserRedux'
import { AttendanceTypes } from '../Redux/AttendanceRedux'
import { NotificationsTypes } from '../Redux/NotificationsRedux'
import { MessagesTypes } from '../Redux/MessagesRedux'
import { startup } from './StartupSagas'
import { onEventDetails, onGetEvents, onLikeEvent } from './CalendarSagas'
import { onGetMealEvents, onLikeMeal, onMealDetails } from './MealsSagas'
import { logout, onChangePassword, onForgotPassword, onLogin, onLoginSuccess } from './AuthSagas'
import {
  onDeleteReminder,
  onEditProfile,
  onGetProfile,
  onGetReminders,
  onMarkAsRead,
  onSubmitAppIdea
} from './UserSagas'
import { ConfigTypes } from '../Redux/ConfigRedux'
import { onDeviceSuccess, onSetDeviceId, onSetHeaders, setDeviceToken } from './ConfigSagas'
import { onAttendanceRequest, onDeleteAttendance, onEditAttendance, onGetAttendanceList, onGetAttendanceDetails } from './AttendanceSagas'
import { onGetNotifications, onGetNotificationsCount } from './NotificationSagas'
import { onGetMessageDetails, onGetMessages } from './MessagesSagas'
import { BaseURL } from '../Lib/AppConstants'
import AppConfig from '../Config/AppConfig'

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create(BaseURL[AppConfig.env])

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    // Config
    takeLatest(ConfigTypes.SET_HEADERS, onSetHeaders, api),
    takeLatest(ConfigTypes.SET_DEVICE_TOKEN, setDeviceToken, api),
    takeLatest(ConfigTypes.SET_DEVICE_ID, onSetDeviceId, api),
    takeLatest(ConfigTypes.SET_DEVICE_ID_SUCCESS, onDeviceSuccess, api),
    // Auth
    takeLatest(AuthTypes.LOGIN, onLogin, api),
    takeLatest(AuthTypes.LOGIN_SUCCESS, onLoginSuccess, api),
    takeLatest(AuthTypes.FORGOT_PASSWORD, onForgotPassword, api),
    takeLatest(AuthTypes.CHANGE_PASSWORD, onChangePassword, api),
    takeLatest(AuthTypes.LOGOUT, logout, api),
    // User
    takeLatest(AuthTypes.LOGIN_SUCCESS, onGetProfile, api),
    takeLatest(UserTypes.GET_PROFILE, onGetProfile, api),
    takeLatest(UserTypes.EDIT_PROFILE, onEditProfile, api),
    takeLatest(UserTypes.SUBMIT_APP_IDEA, onSubmitAppIdea, api),
    takeLatest(UserTypes.GET_REMINDERS, onGetReminders, api),
    takeLatest(UserTypes.DELETE_REMINDER, onDeleteReminder, api),
    takeLatest(UserTypes.MARK_AS_READ, onMarkAsRead, api),
    // Calendar Events
    takeLatest(CalendarTypes.GET_EVENTS, onGetEvents, api),
    takeLatest(CalendarTypes.GET_EVENT_DETAILS, onEventDetails, api),
    takeLatest(CalendarTypes.LIKE_EVENT, onLikeEvent, api),
    // Meal Events
    takeLatest(MealsTypes.GET_MEAL_EVENTS, onGetMealEvents, api),
    takeLatest(MealsTypes.GET_MEAL_DETAILS, onMealDetails, api),
    takeLatest(MealsTypes.LIKE_MEAL, onLikeMeal, api),
    // Attendance
    takeLatest(AttendanceTypes.ATTENDANCE_REQUEST, onAttendanceRequest, api),
    takeLatest(AttendanceTypes.GET_ATTENDANCE, onGetAttendanceList, api),
    takeLatest(AttendanceTypes.GET_ATTENDANCE_DETAILS, onGetAttendanceDetails, api),
    takeLatest(AttendanceTypes.DELETE_ATTENDANCE, onDeleteAttendance, api),
    takeLatest(AttendanceTypes.EDIT_ATTENDANCE, onEditAttendance, api),
    // Notifications
    takeLatest(NotificationsTypes.GET_NOTIFICATIONS, onGetNotifications, api),
    takeLatest(NotificationsTypes.GET_NOTIFICATIONS_COUNT, onGetNotificationsCount, api),
    // Messages
    takeLatest(MessagesTypes.GET_MESSAGES, onGetMessages, api),
    takeLatest(MessagesTypes.GET_MESSAGE_DETAILS, onGetMessageDetails, api)
  ])
}
