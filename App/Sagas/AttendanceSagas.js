import AttendanceActions from '../Redux/AttendanceRedux'
import { call, put, select, delay } from 'redux-saga/effects'
import Api from '../Services/ApiCaller'
import { Actions } from 'react-native-router-flux'
import { showMessage } from '../Lib/Utilities'
import { isEmpty } from 'ramda'
import { AsyncStorage } from 'react-native'

export function * onAttendanceRequest (api, {data}) {
  try {
    const {res = {}} = yield call(Api.callServer, api.attendanceRequest, data, true)
    if (res) {
      const {data = {}, message = ''} = res
      if (message) {
        showMessage(res.message)
      }
      Actions.pop()
      yield put(AttendanceActions.attendanceRequestSuccess(data))
    }
  } catch (e) {
    yield put(AttendanceActions.attendanceRequestFailure(e.message))
  }
}

export function * refreshList () {
  let attendanceType = 'all'
  AsyncStorage.getItem('currentTab').then(tab => {
    if (tab !== null) {
      attendanceType = tab === 'all' ? '' : tab
    }
  })
  yield delay(500)
  yield put(AttendanceActions.getAttendance({attendanceType, pageNo: 1}))
}

export function * onGetAttendanceList (api, {params}) {
  const {attendanceList: oldData = []} = yield select(({attendance = {}}) => attendance)
  const {pageNo, attendanceType} = params
  const pageSize = 10
  try {
    const {res} = yield call(Api.callServer, api.getAttendance, {pageNo, pageSize}, true, attendanceType)
    if (res) {
      const {data: {attendances = []} = {}} = res
      const hasNoMore = isEmpty(attendances) || attendances.length < pageSize
      const result = pageNo === 1 ? attendances : oldData.concat(attendances)
      yield put(AttendanceActions.getAttendanceSuccess(result, pageNo, hasNoMore))
    }
  } catch (e) {
    yield put(AttendanceActions.getAttendanceFailure(e.message))
  }
}

export function * onGetAttendanceDetails (api, {attendanceId}) {
  try {
    const {res} = yield call(Api.callServer, api.getAttendanceDetails, attendanceId, true)
    if (res) {
      const {data: attendanceDetails = {}} = res
      yield put(AttendanceActions.getAttendanceDetailsSuccess(attendanceDetails))
    }
  } catch (e) {
    yield put(AttendanceActions.getAttendanceDetailsFailure(e.message))
  }
}

export function * onDeleteAttendance (api, {attendanceId}) {
  try {
    const {res = {}} = yield call(Api.callServer, api.deleteAttendance, attendanceId, true)
    if (res) {
      showMessage(res.message)
      yield put(AttendanceActions.deleteAttendanceSuccess(attendanceId))
    }
  } catch (e) {
    yield put(AttendanceActions.deleteAttendanceFailure(e.message))
  }
}

export function * onEditAttendance (api, {attendanceId, data}) {
  try {
    const {res = {}} = yield call(Api.callServer, api.editAttendance, attendanceId, true, data)
    if (res) {
      const {message, data} = res
      if (message) {
        showMessage(message)
      }
      Actions.pop()
      yield put(AttendanceActions.editAttendanceSuccess(data))
      yield refreshList()
    }
  } catch (e) {
    yield put(AttendanceActions.editAttendanceFailure(e.message))
  }
}
