// process STARTUP actions
import { select, delay, put } from 'redux-saga/effects'
import {Actions} from 'react-native-router-flux'
import AuthActions from '../Redux/AuthRedux'
import ConfigActions from '../Redux/ConfigRedux'
import uuid from 'react-native-uuid'
import SplashScreen from 'react-native-splash-screen'
import { setBadge } from '../Lib/Utilities'

export function * startup (action) {
  yield delay(500)
  const { user = {}, deviceId } = yield select(state => ({...state.auth, ...state.config}))
  const {authToken} = user
  if (!deviceId) {
    yield put(ConfigActions.setDeviceId(uuid.v4()))
  } else {
    yield put(ConfigActions.setDeviceIdSuccess(deviceId))
  }
  if (authToken) {
    yield put(AuthActions.loginSuccess(user))
    setBadge(0)
  } else {
    Actions.login({type: 'reset'})
  }
  setTimeout(() => {
    SplashScreen.hide()
  }, 500)
}
