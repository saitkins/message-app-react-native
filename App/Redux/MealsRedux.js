import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getMealEvents: null,
  getMealEventsSuccess: ['mealEvents'],
  getMealEventsFailure: ['error'],

  storeSelectedDay: ['selectedDay'],

  loadItemsForDay: ['day'],

  getMealDetails: ['params'],
  getMealDetailsSuccess: ['mealDetails'],
  getMealDetailsFailure: ['error'],

  likeMeal: ['params'],
  likeMealSuccess: ['data'],
  likeMealFailure: ['error']
})

export const MealsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  updating: false,
  mealEvents: {},
  mealDetails: {},
  selectedDay: ''
})

/* ------------- Reducers ------------- */

export const getMealEventsReq = (state) => state.merge({fetching: true})
export const getMealEventsSuccess = (state, {mealEvents}) => state.merge({fetching: false, error: null, mealEvents})
export const getMealEventsFailure = (state) => state.merge({ fetching: false, error: true })

export const storeSelectedDay = (state, {selectedDay}) => state.merge({ fetching: false, error: false, selectedDay })

export const loadItemsForDay = (state, {day}) => {
  let mealEvents = Immutable.asMutable(state.mealEvents || {})
  if (!(day in mealEvents)) {
    let data = []
    data.push({title: day})
    data.push({name: 'BREAKFAST', isHoliday: true, items: 'None'})
    data.push({name: 'LUNCH', isHoliday: true, items: 'None', isLastItem: true})
    mealEvents = {...mealEvents, [day]: data}
  }
  return state.merge({ fetching: false, error: false, mealEvents })
}

export const getMealDetails = (state) => state.merge({fetching: true})
export const getMealDetailsSuccess = (state, {mealDetails}) => {
  return state.merge({fetching: false, error: null, mealDetails})
}
export const getMealDetailsFailure = (state) => state.merge({ fetching: false, error: true })

export const likeMeal = (state) => state.merge({updating: true})
export const likeMealSuccess = (state, {data}) => {
  let mealDetails = Immutable.asMutable(state.mealDetails || {})
  mealDetails = {...mealDetails, ...data}
  return state.merge({updating: false, error: null, mealDetails})
}
export const likeMealFailure = (state) => state.merge({ updating: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MEAL_EVENTS]: getMealEventsReq,
  [Types.GET_MEAL_EVENTS_SUCCESS]: getMealEventsSuccess,
  [Types.GET_MEAL_EVENTS_FAILURE]: getMealEventsFailure,

  [Types.STORE_SELECTED_DAY]: storeSelectedDay,

  [Types.LOAD_ITEMS_FOR_DAY]: loadItemsForDay,

  [Types.GET_MEAL_DETAILS]: getMealDetails,
  [Types.GET_MEAL_DETAILS_SUCCESS]: getMealDetailsSuccess,
  [Types.GET_MEAL_DETAILS_FAILURE]: getMealDetailsFailure,

  [Types.LIKE_MEAL]: likeMeal,
  [Types.LIKE_MEAL_SUCCESS]: likeMealSuccess,
  [Types.LIKE_MEAL_FAILURE]: likeMealFailure
})

export const selectMeals = (state) => state.meals
