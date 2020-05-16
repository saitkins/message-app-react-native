import I18n from '../../I18n'
import { cloneDeep, isEqual } from 'lodash'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Immutable from 'seamless-immutable'
import { Actions } from 'react-native-router-flux'
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native'

import styles from './styles'
import MealItem from '../../Components/MealItem'
import MealsActions from '../../Redux/MealsRedux'
import UserHeader from '../../Components/UserHeader'
import AgendaCalendar from '../../Components/AgendaCalendar'
import { ProgressDialog } from '../../Components/ProgressDialog'
import { deepMemoized, showMessage } from '../../Lib/Utilities'
import { Colors } from '../../Themes'
import moment from 'moment'

class Meals extends Component {
  constructor (props) {
    super(props)
    const mealEvents = cloneDeep(Immutable.asMutable(props.mealEvents))
    this.state = {
      mealEvents,
      calendarShown: true,
      topDay: moment()
    }
  }

  static getDerivedStateFromProps (props, state) {
    const events = deepMemoized(cloneDeep(props.mealEvents))
    if (!isEqual(events, state.prevEvents)) {
      let last = null
      const mealEvents = {}
      const keys = Object.keys(events)
      keys.sort()
      for (const key of keys) {
        if (!last) {
          last = key
          mealEvents[key] = events[key]
          continue
        }
        const diff = moment(key).diff(last, 'days')
        for (let i = 1; i < diff; i++) {
          const newKey = moment(last).add(i, 'days').format('YYYY-MM-DD')
          if (!mealEvents[newKey]) {
            mealEvents[newKey] = []
          }
        }
        mealEvents[key] = events[key]
        last = key
      }
      return {
        mealEvents,
        prevEvents: events
      }
    }
    return null
  }

  renderItem = (item, index) => {
    const {topDay} = this.state
    const {_id: mealId = '', isHoliday} = item
    return <MealItem topDay={topDay} item={item} index={index}
      onPress={isHoliday ? () => showMessage(I18n.t('holidayMessage')) : () => Actions.mealDetails({type: 'jump', mealId})}
    />
  }

  loadItems = (day) => {
    const {loadItemsForDay, storeSelectedDay} = this.props
    const {dateString = ''} = day
    storeSelectedDay(dateString)
    loadItemsForDay(dateString)
  }

  renderEmptyData = () => {
    return <Text style={styles.emptyMessage}>{I18n.t('noEvent')}</Text>
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.agendaCalendar) {
      this.agendaCalendar.resetCalendar()
    }
  }

  render () {
    const {mealEvents, calendarShown} = this.state
    const {fetching} = this.props
    const IPhoneStatusBar = [styles.iphoneXTopView, {backgroundColor: calendarShown ? Colors.gradientC2 : Colors.gradientC1}]
    return (
      <SafeAreaView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <View style={IPhoneStatusBar} /> : null}
        <StatusBar translucent backgroundColor={'transparent'} />
        <UserHeader title={I18n.t('meals')} calendarShown={calendarShown} />
        <AgendaCalendar
          ref={ref => { this.agendaCalendar = ref }}
          events={mealEvents}
          renderItem={this.renderItem}
          renderEmptyData={this.renderEmptyData}
          onChangeTopDay={(topDay) => this.setState({topDay})}
          renderEmptyDate={() => null}
          isCalendarShown={(calendarShown) => { this.setState({calendarShown}) }}
        />
        <ProgressDialog hide={!fetching} />
      </SafeAreaView>
    )
  }
}
const mapStateToProps = ({meals: {fetching, error, mealEvents = {}}}) => {
  return {
    fetching, error, mealEvents
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMealEvents: () => dispatch(MealsActions.getMealEvents()),
    storeSelectedDay: (day) => dispatch(MealsActions.storeSelectedDay(day)),
    loadItemsForDay: (day) => dispatch(MealsActions.loadItemsForDay(day))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Meals)
