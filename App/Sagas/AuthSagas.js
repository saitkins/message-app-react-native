import AuthActions from '../Redux/AuthRedux'
import UserActions from '../Redux/UserRedux'
import { call, put, select } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux'
import { showMessage } from '../Lib/Utilities'
import Api from '../Services/ApiCaller'
import ConfigActions from '../Redux/ConfigRedux'
import { setDeviceToken } from './ConfigSagas'
import firebase from 'react-native-firebase'

export function * onLogin (api, {params}) {
  try {
    const {res: {data = {}}} = yield call(Api.callServer, api.login, params, true)
    const {authToken = ''} = data
    if (authToken) {
      const { allSelected } = yield select(state => (state.config))
      yield put(ConfigActions.setHeaders([], allSelected))
      yield put(AuthActions.loginSuccess(data))
    }
  } catch (e) {
    yield put(AuthActions.loginFailure(e.message))
  }
}

export function * onLoginSuccess (api, {user}) {
  const {authToken} = user
  const { schoolIds, deviceToken } = yield select(state => (state.config))
  try {
    api.setHeaders({'Authorization': `Bearer ${authToken}`, schoolIds: JSON.stringify(schoolIds || [])})
    Actions.tabbar({type: 'reset'})
    if (deviceToken) {
      yield setDeviceToken(api, {deviceToken})
    } else {
      const deviceToken = firebase.messaging().getToken()
      yield setDeviceToken(api, {deviceToken})
    }
    yield put(UserActions.getProfile(false))
  } catch (e) {
    console.tron.warn(e)
  }
}

export function * onForgotPassword (api, {email}) {
  try {
    const {res = {}} = yield call(Api.callServer, api.forgotPassword, email, true)
    if (res) {
      yield put(AuthActions.forgotPasswordSuccess('Success'))
      showMessage('Email link sent successfully')
    }
  } catch (e) {
    yield put(AuthActions.forgotPasswordFailure(e.message))
  }
}

export function * onChangePassword (api, {params}) {
  try {
    const {res = {}} = yield call(Api.callServer, api.changePassword, params, true)
    if (res && res.success) {
      showMessage(res.data)
      Actions.pop()
      yield put(AuthActions.changePasswordSuccess('Success'))
    }
  } catch (e) {
    yield put(AuthActions.changePasswordFailure(e.message))
  }
}

export function * logout (api) {
  try {
    yield call(Api.callServer, api.logout, {}, false)
  } catch (e) {
    console.log(e)
  }
  api.setHeaders({'Authorization': ''})
  Actions.login({type: 'reset'})
}
