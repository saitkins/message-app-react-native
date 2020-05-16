import UserActions from '../Redux/UserRedux'
import ConfigActions from '../Redux/ConfigRedux'
import { call, put, select } from 'redux-saga/effects'
import Api from '../Services/ApiCaller'
import { isEmpty } from 'ramda'
import { showMessage } from '../Lib/Utilities'
import { Actions } from 'react-native-router-flux'
import { selectUser } from '../Redux/AuthRedux'

export function * onGetProfile (api, {loading}) {
  try {
    const {res = {}} = yield call(Api.callServer, api.getProfile, {}, true)
    if (res) {
      const {data = {}} = res
      if (data && !loading) {
        const {user: {authToken = ''} = {}} = yield select(selectUser)
        const { allSelected = true } = yield select(state => (state.config))
        if (allSelected) {
          const {kids = []} = data
          let schoolIds = []
          kids.forEach((item) => {
            const {school: {_id: schoolId = ''}} = item
            schoolIds.push(schoolId)
          })
          schoolIds = schoolIds.filter((s1, pos, arr) => arr.findIndex((s2) => s2 === s1) === pos)
          api.setHeaders({'Authorization': `Bearer ${authToken}`, schoolIds: JSON.stringify(schoolIds || [])})
          yield put(ConfigActions.setHeaders(schoolIds, allSelected))
        }
      }
      yield put(UserActions.getProfileSuccess(data))
    }
  } catch (e) {
    yield put(UserActions.getProfileFailure(e.message))
  }
}

export function * onEditProfile (api, {data}) {
  try {
    const {imagePath, imageType, ...profileData} = data
    const imageData = {uri: imagePath, type: imageType, name: `userImage.jpg`}
    const body = new FormData()
    if (!isEmpty(imagePath)) {
      body.append('profileImage', imageData)
    }
    for (const key of Object.keys(profileData)) {
      body.append(key, profileData[key])
    }
    const {res = {}} = yield call(Api.callServer, api.editProfile, body, true)
    if (res) {
      const {data = {}} = res
      showMessage(res.message)
      Actions.pop()
      yield put(UserActions.editProfileSuccess(data))
    }
  } catch (e) {
    yield put(UserActions.editProfileFailure(e.message))
  }
}

export function * onSubmitAppIdea (api, {data}) {
  try {
    const {res} = yield call(Api.callServer, api.submitAppIdea, data, true)
    if (res) {
      showMessage(res.message)
      yield put(UserActions.submitAppIdeaSuccess(res))
      Actions.pop()
    }
  } catch (e) {
    yield put(UserActions.submitAppIdeaFailure(e.message))
  }
}

export function * onGetReminders (api, {params}) {
  const {reminders: oldData = []} = yield select(({user = {}}) => user)
  const pageSize = 10
  const {pageNo} = params
  try {
    const {res} = yield call(Api.callServer, api.getReminders, {...params, pageSize}, true)
    if (res) {
      const {data: {events = []} = {}} = res
      const hasNoMore = isEmpty(events) || events.length < pageSize
      const result = pageNo === 1 ? events : oldData.concat(events)
      yield put(UserActions.getRemindersSuccess(result, pageNo, hasNoMore))
    }
  } catch (e) {
    yield put(UserActions.getRemindersFailure(e.message))
  }
}

export function * onDeleteReminder (api, {eventId}) {
  try {
    const {res} = yield call(Api.callServer, api.deleteReminder, eventId, true)
    if (res) {
      showMessage(res.message)
      yield put(UserActions.deleteReminderSuccess(eventId))
    }
  } catch (e) {
    yield put(UserActions.deleteReminderFailure(e.message))
  }
}

export function * onMarkAsRead (api, {id}) {
  try {
    const {res} = yield call(Api.callServer, api.markAsRead, id, true)
    if (res) {
      yield put(UserActions.markAsReadSuccess(id))
    }
  } catch (e) {
    yield put(UserActions.markAsReadFailure(e.message))
  }
}
