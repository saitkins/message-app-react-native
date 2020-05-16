import styles from './styles'
import PropTypes from 'prop-types'
import AgendaView from '../AgendaView'
import Colors from '../../Themes/Colors'
import React, { Component } from 'react'
import { View } from 'react-native'
import { isEqual } from 'lodash'

export default class AgendaCalendar extends Component {
  static propTypes = {
    events: PropTypes.object,
    refreshing: PropTypes.boolean,
    onRefresh: PropTypes.function,
    renderItem: PropTypes.function,
    loadItems: PropTypes.function,
    hideDot: PropTypes.boolean,
    isCalendarShown: PropTypes.function,
    renderEmptyData: PropTypes.function,
    onChangeTopDay: PropTypes.function
  }

  static defaultProps = {
    events: {},
    refreshing: false,
    hideDot: false,
    onRefresh: () => {},
    loadItems: () => {},
    isCalendarShown: () => {},
    onChangeTopDay: () => {}
  }

  state = {
    selected: new Date()
  }

  resetCalendar = () => {
    if (this.agendaView) {
      this.agendaView.resetCalendar()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
  }

  render () {
    const { selected } = this.state
    const {events, renderItem, isCalendarShown, loadItems, hideDot, renderEmptyData, onChangeTopDay} = this.props
    return (
      <AgendaView
        ref={ref => { this.agendaView = ref }}
        items={events}
        selected={selected}
        renderItem={renderItem}
        renderKnob={this.renderKnob}
        renderDay={this.renderDay}
        loadItemsForMonth={loadItems}
        rowHasChanged={this.rowHasChanged}
        renderEmptyData={renderEmptyData}
        renderEmptyDate={this.renderEmptyDate}
        onCalendarToggled={isCalendarShown}
        onChangeTopDay={onChangeTopDay}
        theme={{
          dayTextColor: Colors.snow,
          weekTextColor: Colors.snow,
          textMonthFontWeight: 'bold',
          todayTextColor: Colors.snow,
          monthTextColor: Colors.snow,
          backgroundColor: Colors.snow,
          agendaKnobColor: Colors.frost,
          selectedDayTextColor: Colors.snow,
          textSectionTitleColor: Colors.snow,
          agendaDayNumColor: Colors.darkgray,
          agendaTodayColor: Colors.darkergray,
          agendaDayTextColor: Colors.darkergray,
          calendarBackground: Colors.transparent,
          selectedDayBackgroundColor: Colors.themeColor,
          dotColor: hideDot ? Colors.transparent : Colors.yellow,
          selectedDotColor: hideDot ? Colors.transparent : Colors.yellow
        }}
  />)
  }

  renderKnob = () => {
    return (
      <View style={styles.knobContainer}>
        <View style={styles.knob} />
      </View>
    )
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate} />
    )
  }

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name
  }

  renderDay = (day) => {
  }
}
