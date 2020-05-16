import { call, put } from 'redux-saga/effects'
import CalendarActions from '../Redux/CalendarRedux'
import Api from '../Services/ApiCaller'
import { convertDataEvents } from '../Lib/Utilities'

export function * onGetEvents (api) {
  try {
    const params = {order: 'asc', orderBy: 'createdAt', pageNo: 1, pageSize: 300}
    const {res} = yield call(Api.callServer, api.getEvents, params, true)
    if (res && res.data) {
      const {data: {events: event = []} = {}} = res || {}
      const formattedData = convertDataEvents(event)
      yield put(CalendarActions.getEventsSuccess(formattedData))
    }
  } catch (e) {
    yield put(CalendarActions.getEventsFailure(e.message))
  }
}

export function * onEventDetails (api, {params}) {
  try {
    const {res} = yield call(Api.callServer, api.getEventDetails, params, true)
    if (res) {
      const {data = {}} = res
      yield put(CalendarActions.getEventDetailsSuccess(data))
    }
  } catch (e) {
    yield put(CalendarActions.getEventDetailsFailure(e.message))
  }
}

export function * onLikeEvent (api, {params}) {
  try {
    const {res} = yield call(Api.callServer, api.likeRemindEvent, params, true)
    if (res) {
      yield put(CalendarActions.likeEventSuccess(res.data))
    }
  } catch (e) {
    yield put(CalendarActions.likeEventFailure(e.message))
  }
}
