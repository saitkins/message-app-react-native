import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  attendanceRequest: ['data'],
  attendanceRequestSuccess: ['attendance'],
  attendanceRequestFailure: ['error'],

  getAttendance: ['params'],
  getAttendanceSuccess: ['attendanceList', 'pageNo', 'hasNoMore'],
  getAttendanceFailure: ['error'],

  getAttendanceDetails: ['attendanceId'],
  getAttendanceDetailsSuccess: ['attendanceDetails'],
  getAttendanceDetailsFailure: ['error'],

  clearAttendanceList: null,

  deleteAttendance: ['attendanceId'],
  deleteAttendanceSuccess: ['attendanceId'],
  deleteAttendanceFailure: ['error'],

  editAttendance: ['attendanceId', 'data'],
  editAttendanceSuccess: ['attendance'],
  editAttendanceFailure: ['error']
})

export const AttendanceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  success: false,
  fetching: false,
  deleting: false,
  error: undefined,
  attendanceList: [],
  hasNoMore: false,
  pageNo: 1,
  attendanceDetails: {}
})

/* ------------- Reducers ------------- */

// Add Attendance Request
export const attendanceRequest = (state: Object) => state.merge({fetching: true, error: null})
export const attendanceRequestSuccess = (state: Object, {attendance}: Object) => {
  let attendanceList = Immutable.asMutable(state.attendanceList || [])
  attendanceList.unshift(attendance)
  return state.merge({fetching: false, error: null, attendanceList})
}
export const attendanceRequestFailure = (state: Object, {error}: Object) => state.merge({fetching: false, error})

// Get Attendance List
export const getAttendance = (state: Object, {params}) => state.merge({
  fetching: true,
  error: null,
  pageNo: params.pageNo === 1 ? params.pageNo : state.pageNo
})
export const getAttendanceSuccess = (state: Object, {attendanceList, pageNo, hasNoMore}) =>
  state.merge({fetching: false, pageNo: pageNo + 1, hasNoMore, attendanceList, error: null})
export const getAttendanceFailure = (state: Object, {error}: Object) => state.merge({fetching: false, error})

// Get Attendance List
export const getAttendanceDetails = (state: Object) => state.merge({fetching: true, error: null, attendanceDetails: {}})
export const getAttendanceDetailsSuccess = (state: Object, {attendanceDetails}) => state.merge({fetching: false, error: null, attendanceDetails})
export const getAttendanceDetailsFailure = (state: Object, {error}: Object) => state.merge({fetching: false, error})

// Clear Attendance listing on switch Tab
export const clearAttendanceList = (state: Object) => state.merge({attendanceList: []})

// Delete Attendance History
export const deleteAttendanceRequest = (state: Object) => state.merge({deleting: true, error: null})
export const deleteAttendanceSuccess = (state: Object, {attendanceId}: Object) => {
  let attendanceList = Immutable.asMutable(state.attendanceList || [])
  attendanceList = attendanceList.filter(({_id}) => _id !== attendanceId)
  return state.merge({deleting: false, error: null, attendanceList})
}
export const deleteAttendanceFailure = (state: Object, {error}: Object) => state.merge({deleting: false, error})

// Delete Attendance History
export const editAttendance = (state: Object) => state.merge({fetching: true, error: null})
export const editAttendanceSuccess = (state: Object, {attendance}: Object) => {
  const {_id: attendanceId = ''} = attendance
  let attendanceList = Immutable.asMutable(state.attendanceList || [])
  const index = attendanceList.findIndex(({_id}) => _id === attendanceId)
  if (index !== -1) {
    const oldObj = attendanceList[index]
    attendanceList[index] = {...oldObj, ...attendance}
  }
  return state.merge({fetching: false, error: null, attendanceList})
}
export const editAttendanceFailure = (state: Object, {error}: Object) => state.merge({fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ATTENDANCE_REQUEST]: attendanceRequest,
  [Types.ATTENDANCE_REQUEST_SUCCESS]: attendanceRequestSuccess,
  [Types.ATTENDANCE_REQUEST_FAILURE]: attendanceRequestFailure,

  [Types.GET_ATTENDANCE]: getAttendance,
  [Types.GET_ATTENDANCE_SUCCESS]: getAttendanceSuccess,
  [Types.GET_ATTENDANCE_FAILURE]: getAttendanceFailure,

  [Types.GET_ATTENDANCE_DETAILS]: getAttendanceDetails,
  [Types.GET_ATTENDANCE_DETAILS_SUCCESS]: getAttendanceDetailsSuccess,
  [Types.GET_ATTENDANCE_DETAILS_FAILURE]: getAttendanceDetailsFailure,

  [Types.CLEAR_ATTENDANCE_LIST]: clearAttendanceList,

  [Types.DELETE_ATTENDANCE]: deleteAttendanceRequest,
  [Types.DELETE_ATTENDANCE_SUCCESS]: deleteAttendanceSuccess,
  [Types.DELETE_ATTENDANCE_FAILURE]: deleteAttendanceFailure,

  [Types.EDIT_ATTENDANCE]: editAttendance,
  [Types.EDIT_ATTENDANCE_SUCCESS]: editAttendanceSuccess,
  [Types.EDIT_ATTENDANCE_FAILURE]: editAttendanceFailure
})

/* ------------- Selectors ------------- */
