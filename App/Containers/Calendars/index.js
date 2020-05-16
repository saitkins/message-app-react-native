import I18n from '../../I18n'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { cloneDeep, isEqual, clone } from 'lodash'
import { AsyncStorage, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native'

import styles from './styles'
import EventItem from '../../Components/EventItem'
import { Actions } from 'react-native-router-flux'
import UserHeader from '../../Components/UserHeader'
import CalendarActions from '../../Redux/CalendarRedux'
import AgendaCalendar from '../../Components/AgendaCalendar'
import { ProgressDialog } from '../../Components/ProgressDialog'
import { Colors } from '../../Themes'
import moment from 'moment'
import AttendanceActions from '../../Redux/AttendanceRedux'
import { addLinkingListener, removeLinkingListener } from '../../Lib/Linking'
import MessagesActions from '../../Redux/MessagesRedux'
import UserActions from '../../Redux/UserRedux'
import { STATUS } from '../../Constants/Constants'
import { deepMemoized } from '../../Lib/Utilities'

class Calendars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prevEvents: {},
      events: {},
      refreshing: false,
      calendarShown: true,
      topDay: moment()
    }
  }
  componentDidMount () {
    const {clearAttendanceList, getEvents, clearMessagesList, clearRemindersList} = this.props
    getEvents()
    clearAttendanceList()
    clearRemindersList()
    clearMessagesList()
    this.setValues()
    addLinkingListener()
  }

  setValues = () => {
    AsyncStorage.setItem('messageSegment', STATUS.NEW)
    AsyncStorage.setItem('reminderSegment', STATUS.NEW)
  }

  componentWillUnmount (): void {
    removeLinkingListener()
  }

  static getDerivedStateFromProps (props, state) {
    const events = deepMemoized(cloneDeep(props.events))
    if (!isEqual(events, state.prevEvents)) {
      let last = null
      const newEvents = {}
      const keys = Object.keys(events)
      keys.sort()
      for (const key of keys) {
        if (!last) {
          last = key
          newEvents[key] = events[key]
          continue
        }
        const diff = moment(key).diff(last, 'days')
        for (let i = 1; i < diff; i++) {
          const newKey = moment(last).add(i, 'days').format('YYYY-MM-DD')
          if (!newEvents[newKey]) {
            newEvents[newKey] = []
          }
        }
        let data = events[key]
        if (data.length > 1) {
          const {startDate = '', endDate = ''} = data[1]
          const diff = moment(endDate).diff(startDate, 'days')
          if (diff >= 1) {
            const startKey = moment(startDate).format('YYYY-MM-DD')
            data[0].title = startKey
            newEvents[startKey] = cloneDeep(data)
            for (let i = 1; i <= diff; i++) {
              const newKey = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
              data[0].title = newKey
              newEvents[newKey] = cloneDeep(data)
            }
          } else {
            newEvents[key] = data
          }
        } else {
          newEvents[key] = data
        }
        last = key
      }
      console.tron.warn({newEvents})
      return {
        prevEvents: events,
        events: newEvents
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.agendaCalendar) {
      this.agendaCalendar.resetCalendar()
    }
  }

  renderItem = (item) => {
    const {_id: eventId} = item
    const {topDay} = this.state
    return <EventItem topDay={topDay} item={item} onPress={() => Actions.eventDetails({type: 'jump', eventId})} />
  }

  renderEmptyData = () => {
    return <Text style={styles.emptyMessage}>{I18n.t('noEvent')}</Text>
  }

  render () {
    const {events, calendarShown} = this.state
    const {fetching} = this.props
    console.tron.warn({events})
    const IPhoneStatusBar = [styles.iphoneXTopView, {backgroundColor: calendarShown ? Colors.gradientC2 : Colors.gradientC1}]
    return (
      <SafeAreaView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <View style={IPhoneStatusBar} /> : null}
        <StatusBar translucent backgroundColor={'transparent'} />
        <UserHeader title={I18n.t('calendar')} calendarShown={calendarShown} />
        <AgendaCalendar
          ref={ref => { this.agendaCalendar = ref }}
          events={events}
          renderItem={this.renderItem}
          onChangeTopDay={(topDay) => this.setState({topDay})}
          renderEmptyData={this.renderEmptyData}
          renderEmptyDate={() => null}
          isCalendarShown={(calendarShown) => { this.setState({calendarShown}) }} />
        <ProgressDialog hide={!fetching} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({calendar: {fetching, error, events = {}}}) => {
  return {
    fetching, error, events
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => dispatch(CalendarActions.getEvents()),
    clearAttendanceList: () => dispatch(AttendanceActions.clearAttendanceList()),
    clearMessagesList: () => dispatch(MessagesActions.clearMessagesList()),
    clearRemindersList: () => dispatch(UserActions.clearRemindersList())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendars)
