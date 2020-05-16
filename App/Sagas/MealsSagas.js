import { call, put, select } from 'redux-saga/effects'
import MealsActions, { selectMeals } from '../Redux/MealsRedux'
import Api from '../Services/ApiCaller'
import { isEmpty } from 'ramda'
import { convertDataEvents } from '../Lib/Utilities'
import moment from 'moment'

export function * onGetMealEvents (api) {
  try {
    const {selectedDay = ''} = yield select(selectMeals)
    const params = {order: 'asc', orderBy: 'createdAt', pageNo: 1, pageSize: 500}
    const {res} = yield call(Api.callServer, api.getMeals, params, true)
    if (res) {
      const {data: {events = []} = {}} = res
      const formattedData = convertDataEvents(events)
      yield put(MealsActions.getMealEventsSuccess(formattedData))
      yield put(MealsActions.loadItemsForDay(isEmpty(selectedDay) ? moment().format('YYYY-MM-DD') : selectedDay))
    }
  } catch (e) {
    yield put(MealsActions.getMealEventsFailure(e.message))
  }
}

export function * onMealDetails (api, {params}) {
  try {
    const {res} = yield call(Api.callServer, api.getMealDetails, params, true)
    if (res) {
      const {data = {}} = res
      yield put(MealsActions.getMealDetailsSuccess(data))
    }
  } catch (e) {
    yield put(MealsActions.getMealDetailsFailure(e.message))
  }
}

export function * onLikeMeal (api, {params}) {
  try {
    const {res} = yield call(Api.callServer, api.likeRemindMeal, params, true)
    if (res) {
      yield put(MealsActions.likeMealSuccess(res.data))
    }
  } catch (e) {
    yield put(MealsActions.likeMealFailure(e.message))
  }
}
