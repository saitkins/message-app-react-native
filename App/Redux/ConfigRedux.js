import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getConfig: null,
  getConfigSuccess: ['config'],
  getConfigFailure: ['error'],

  setDeviceId: ['deviceId'],
  setDeviceIdSuccess: ['deviceId'],
  setDeviceIdFailure: ['error'],

  setDeviceToken: ['deviceToken'],

  setHeaders: ['schoolIds', 'allSelected']
})

export const ConfigTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  config: undefined,
  schoolIds: [],
  allSelected: true,
  deviceToken: '',
  deviceId: ''
})

/* ------------- Reducers ------------- */

// getConfigReq
export const getConfigReq = (state) => state.merge({fetching: true})
export const getConfigSuccess = (state, {config}) => state.merge({fetching: false, error: null, config})
export const getConfigFailure = (state) => state.merge({ fetching: false, error: true })

export const setDeviceId = (state, {deviceId}) => state.merge({fetching: true, deviceId})
export const setDeviceIdSuccess = (state, {deviceId}) => state.merge({fetching: false, deviceId})
export const setDeviceIdFailure = (state, {error}) => state.merge({fetching: false, error})

export const setDeviceTokenReq = (state, {deviceToken}) => state.merge({deviceToken})

export const setHeaders = (state, {schoolIds, allSelected = false}) => state.merge({schoolIds, allSelected})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  // getConfig
  [Types.GET_CONFIG]: getConfigReq,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure,

  [Types.SET_DEVICE_ID]: setDeviceId,
  [Types.SET_DEVICE_ID_SUCCESS]: setDeviceIdSuccess,
  [Types.SET_DEVICE_ID_FAILURE]: setDeviceIdFailure,

  [Types.SET_HEADERS]: setHeaders,

  [Types.SET_DEVICE_TOKEN]: setDeviceTokenReq

})

export const selectConfig = (state) => state.config
