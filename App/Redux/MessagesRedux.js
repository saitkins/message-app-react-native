import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { STATUS } from '../Constants/Constants'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getMessages: ['params'],
  getMessagesSuccess: ['messages', 'pageNo', 'hasNoMore'],
  getMessagesFailure: ['error'],

  getMessageDetails: ['messageId', 'unRead'],
  getMessageDetailsSuccess: ['messageDetails', 'messageId', 'unRead'],
  getMessageDetailsFailure: ['error'],

  clearMessagesList: null

})

export const MessagesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  success: false,
  messages: [],
  messageDetails: {},
  hasNoMore: false,
  pageNo: 1,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to getMessages
export const getMessagesReq = (state: Object, {params: {pageNo} = {}}) =>
  state.merge({fetching: true, pageNo: pageNo === 1 ? pageNo : state.pageNo})
export const getMessagesSuccess = (state: Object, {messages, pageNo, hasNoMore}: Object) =>
  state.merge({fetching: false, error: null, messages, pageNo: pageNo + 1, hasNoMore})
export const getMessagesFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, error})

// we're attempting to getMessageDetails
export const getMessageDetailsReq = (state: Object) =>
  state.merge({fetching: true, success: false})
export const getMessageDetailsSuccess = (state: Object, {messageDetails, messageId, unRead}: Object) => {
  let messages = Immutable.asMutable(state.messages || [])
  if (unRead) {
    messages = messages.filter(({status = '', message: {_id}}) => {
      return _id !== messageId
    })
  }
  return state.merge({fetching: false, success: true, error: null, messages, messageDetails})
}
export const getMessageDetailsFailure = (state: Object, {error}: Object) =>
  state.merge({fetching: false, success: false, error})

// Clear Messages listing on switch Tab
export const clearMessagesList = (state: Object) => state.merge({messages: []})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.GET_MESSAGES]: getMessagesReq,
  [Types.GET_MESSAGES_SUCCESS]: getMessagesSuccess,
  [Types.GET_MESSAGES_FAILURE]: getMessagesFailure,

  [Types.GET_MESSAGE_DETAILS]: getMessageDetailsReq,
  [Types.GET_MESSAGE_DETAILS_SUCCESS]: getMessageDetailsSuccess,
  [Types.GET_MESSAGE_DETAILS_FAILURE]: getMessageDetailsFailure,

  [Types.CLEAR_MESSAGES_LIST]: clearMessagesList

})

/* ------------- Selectors ------------- */
