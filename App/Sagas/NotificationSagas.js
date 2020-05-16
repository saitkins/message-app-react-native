import { isEmpty } from 'lodash'
import Api from '../Services/ApiCaller'
import { call, put, select } from 'redux-saga/effects'
import NotificationActions from '../Redux/NotificationsRedux'

export function * onGetNotifications (api, {params}) {
  const {notifications: oldData = []} = yield select(({notifications = {}}) => notifications)
  const pageSize = 10
  const {pageNo} = params
  try {
    const {res} = yield call(Api.callServer, api.fetchNotifications, {...params, pageSize}, true)
    if (res) {
      const {data: {notifications = []} = {}} = res
      const hasNoMore = isEmpty(notifications) || notifications.length < pageSize
      const result = pageNo === 1 ? notifications : oldData.concat(notifications)
      yield put(NotificationActions.getNotificationsSuccess(result, pageNo, hasNoMore))
      yield put(NotificationActions.setNotificationCount(0))
    }
  } catch (e) {
    yield put(NotificationActions.getNotificationsFailure(e.message))
  }
}

export function * onGetNotificationsCount (api) {
  try {
    const {res} = yield call(Api.callServer, api.fetchNotificationsCount, {}, false)
    if (res) {
      const {data: {notificationsCount = 0, messagesCount = 0, remindersCount = 0} = {}} = res
      yield put(NotificationActions.getNotificationsCountSuccess(notificationsCount, messagesCount, remindersCount))
    }
  } catch (e) {
    yield put(NotificationActions.getNotificationsCountFailure(e.message))
  }
}
