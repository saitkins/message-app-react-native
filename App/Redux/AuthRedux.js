import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  login: ['params'],
  loginSuccess: ['user'],
  loginFailure: ['error'],

  forgotPassword: ['email'],
  forgotPasswordSuccess: ['success'],
  forgotPasswordFailure: ['error'],

  changePassword: ['params'],
  changePasswordSuccess: ['success'],
  changePasswordFailure: ['error'],

  logout: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  success: false,
  fetching: false,
  error: undefined,
  user: {},
  authToken: undefined
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const loginRequest = (state: Object) =>
  state.merge({fetching: true, error: null})

export const loginSuccess = (state: Object, {user}: Object) =>
  state.merge({fetching: false, error: null, user})

export const loginFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, error})

// we're attempting to forgot password
export const forgotPasswordRequest = (state: Object) => state.merge({fetching: true, error: null})
export const forgotPasswordSuccess = (state: Object) =>
  state.merge({fetching: false, error: null})
export const forgotPasswordFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, error})

// we're attempting to change password
export const changePasswordRequest = (state: Object) => state.merge({fetching: true, error: null})
export const changePasswordSuccess = (state: Object) =>
  state.merge({fetching: false, error: null})
export const changePasswordFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, error})

export const logoutUser = (state: Object) => {
  return state.merge({...INITIAL_STATE})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,

  [Types.FORGOT_PASSWORD]: forgotPasswordRequest,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,

  [Types.CHANGE_PASSWORD]: changePasswordRequest,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,

  [Types.LOGOUT]: logoutUser
})

/* ------------- Selectors ------------- */
export const selectUser = (state) => state.auth
