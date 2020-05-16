import { isEmpty } from 'lodash'
import Api from '../Services/ApiCaller'
import { call, put, select } from 'redux-saga/effects'
import MessagesActions from '../Redux/MessagesRedux'

export function * onGetMessages (api, {params}) {
  const {messages: oldData = []} = yield select(({messages = {}}) => messages)
  const pageSize = 10
  const {pageNo} = params
  try {
    const {res} = yield call(Api.callServer, api.getMessages, {...params, pageSize}, true)
    if (res) {
      const {data: {messages = []} = {}} = res
      const hasNoMore = isEmpty(messages) || messages.length < pageSize
      const result = pageNo === 1 ? messages : oldData.concat(messages)
      yield put(MessagesActions.getMessagesSuccess(result, pageNo, hasNoMore))
    }
  } catch (e) {
    yield put(MessagesActions.getMessagesFailure(e.message))
  }
}

export function * onGetMessageDetails (api, {messageId, unRead = false}) {
  try {
    const {res} = yield call(Api.callServer, api.fetchMessageDetails, messageId, true)
    if (res && res.data) {
      yield put(MessagesActions.getMessageDetailsSuccess(res.data, messageId, unRead))
    }
  } catch (e) {
    yield put(MessagesActions.getMessageDetailsFailure(e.message))
  }
}
