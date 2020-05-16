import {call, put, delay, select} from 'redux-saga/effects'
import ConfigActions, { selectConfig } from '../Redux/ConfigRedux'
import Api from '../Services/ApiCaller'
import {isEmpty} from 'lodash'
import { selectUser } from '../Redux/AuthRedux'
import uuid from 'react-native-uuid'

export function * onGetConfig (api) {
  try {
    const {res} = yield call(Api.callServer, api.getConfig, {}, false)
    yield put(ConfigActions.getConfigSuccess(res))
  } catch (e) {
    yield put(ConfigActions.getConfigFailure(e.message))
  }
}

export function * onSetDeviceId (api, {deviceId}) {
  try {
    yield put(ConfigActions.setDeviceIdSuccess(deviceId))
  } catch (e) {
    yield put(ConfigActions.setDeviceIdFailure(e.message))
  }
}

export function * onDeviceSuccess (api, {deviceId}) {
  api.setHeader('deviceid', deviceId)
}

export function * setDeviceToken (api, {deviceToken}) {
  yield delay(1000)
  const {user: {authToken: userToken} = {}} = yield select(selectUser)
  let {deviceId} = yield select(selectConfig)
  if (isEmpty(deviceId)) {
    deviceId = uuid.v4()
    yield put(ConfigActions.setDeviceId(deviceId))
  }
  if (!isEmpty(deviceToken) && !isEmpty(userToken)) {
    try {
      const {res} = yield call(Api.callServer, api.setDeviceToken, {pushToken: deviceToken}, false)
    } catch (ex) {}
  }
}

export function * onSetHeaders (api, {schoolIds}) {
  try {
    api.setHeaders({schoolIds: JSON.stringify(schoolIds)})
  } catch (e) {
    console.tron.warn(e)
  }
}
