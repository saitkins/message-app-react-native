import React, {Component} from 'react'
import {
  ActivityIndicator,
  View
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Reservation from 'react-native-calendars/src/agenda/reservation-list/reservation'
import PropTypes from 'prop-types'
import XDate from 'xdate'

import dateutils from 'react-native-calendars/src/dateutils'
import styleConstructor from 'react-native-calendars/src/agenda/style'
import { isEqual } from 'lodash'

class ReactComp extends Component {
  static propTypes = {
    // specify your item comparison function for increased performance
    rowHasChanged: PropTypes.func,
    // specify how each item should be rendered in agenda
    renderItem: PropTypes.func,
    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
    renderDay: PropTypes.func,
    // specify how empty date content with no items should be rendered
    renderEmptyDate: PropTypes.func,
    // callback that gets called when day changes while scrolling agenda list
    onDayChange: PropTypes.func,
    // onScroll ListView event
    onScroll: PropTypes.func,
    // the list of items that have to be displayed in agenda. If you want to render item as empty date
    // the value of date key kas to be an empty array []. If there exists no value for date key it is
    // considered that the date in question is not yet loaded
    reservations: PropTypes.object,

    selectedDay: PropTypes.instanceOf(XDate),
    earliestDay: PropTypes.instanceOf(XDate),
    latestDay: PropTypes.instanceOf(XDate),
    topDay: PropTypes.instanceOf(XDate),
    refreshControl: PropTypes.element,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
  };

  scrollPosition = 0

  constructor (props) {
    super(props)
    this.styles = styleConstructor(props.theme)
    this.state = {
      reservations: []
    }
    this.heights = []
    this.selectedDay = this.props.selectedDay
    this.earliestDay = this.props.earliestDay
    this.latestDay = this.props.latestDay
    this.scrollOver = true
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
  }

  componentWillMount () {
    const response = this.getReservations(this.props)
    this.updateDataSource(response)
  }

  updateDataSource (reservations) {
    this.setState({
      reservations
    })
  }

  updateReservations (props) {
    const { reservations, scrollPosition } = this.getReservations(props)
    this.scrollPosition = scrollPosition
    this.selectedDay = props.selectedDay
    this.updateDataSource(reservations)
  }

  componentWillReceiveProps (props) {
    if (!dateutils.sameDate(props.topDay, this.props.topDay)) {
      this.setState({
        reservations: []
      }, () => {
        this.updateReservations(props, true)
      })
    } else {
      this.updateReservations(props)
    }
  }

  setScrollPos = () => {
    if (this.list) {
      let scrollPosition = 0
      for (let i = 0; i < this.scrollPosition; i++) {
        scrollPosition += this.heights[i] || 0
      }
      this.scrollOver = false
      if (scrollPosition > this.maxHeight - 200) {
        scrollPosition = this.maxHeight - 200
      }
      this.list.scrollToOffset({offset: scrollPosition, animated: true})
    }
  }

  onScroll (event) {
    const yOffset = event.nativeEvent.contentOffset.y
    this.props.onScroll(yOffset)
    let topRowOffset = 0
    let topRow
    for (topRow = 0; topRow < this.heights.length; topRow++) {
      if (topRowOffset + this.heights[topRow] / 2 >= yOffset) {
        break
      }
      topRowOffset += this.heights[topRow]
    }
    const row = this.state.reservations[topRow]
    if (!row) return
    const day = row.day
    const sameDate = dateutils.sameDate(day, this.selectedDay)
    if (!sameDate && this.scrollOver) {
      this.selectedDay = day.clone()
      this.props.onDayChange(day.clone())
    }
  }

  onRowLayoutChange (ind, event) {
    this.heights[ind] = event.nativeEvent.layout.height
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(this.setScrollPos, 500)
  }

  renderRow ({item, index}) {
    return (
      <View onLayout={this.onRowLayoutChange.bind(this, index)}>
        <Reservation
          item={item}
          renderItem={this.props.renderItem}
          renderDay={this.props.renderDay}
          renderEmptyDate={this.props.renderEmptyDate}
          theme={this.props.theme}
          rowHasChanged={this.props.rowHasChanged}
        />
      </View>
    )
  }

  getReservationsForDay (iterator, props) {
    const day = iterator.clone()
    const res = props.reservations[day.toString('yyyy-MM-dd')]
    if (res && res.length) {
      return res.map((reservation, i) => {
        return {
          reservation,
          date: i ? false : day,
          day
        }
      })
    } else if (res) {
      return [{
        date: iterator.clone(),
        day
      }]
    } else {
      return false
    }
  }

  onListTouch () {
    this.scrollOver = true
  }

  getReservations (props) {
    if (!props.reservations || !props.selectedDay) {
      return {reservations: [], scrollPosition: 0}
    }
    let reservations = []
    let scrollPosition = reservations.length
    const iterator = this.earliestDay.clone()
    const lastIterator = this.latestDay.clone()
    while (iterator.getTime() <= lastIterator.getTime()) {
      const res = this.getReservationsForDay(iterator, props)
      if (res) {
        reservations = reservations.concat(res)
      }
      iterator.addDays(1)
      if (props.selectedDay.toDateString() === iterator.toDateString()) {
        scrollPosition = reservations.length
      }
    }
    return {reservations, scrollPosition}
  }

  render () {
    if (!this.props.reservations) {
      if (this.props.renderEmptyData) {
        return this.props.renderEmptyData()
      }
      return (
        <ActivityIndicator style={{marginTop: 80}} color={this.props.theme && this.props.theme.indicatorColor} />
      )
    }
    return (
      <FlatList
        onLayout={(event) => {
          this.maxHeight = event.nativeEvent.height
        }}
        ref={(c) => this.list = c}
        style={this.props.style}
        contentContainerStyle={this.styles.content}
        renderItem={this.renderRow.bind(this)}
        data={this.state.reservations}
        onScroll={this.onScroll.bind(this)}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={200}
        onMoveShouldSetResponderCapture={() => { this.onListTouch(); return false }}
        keyExtractor={(item, index) => String(index)}
        refreshControl={this.props.refreshControl}
        refreshing={this.props.refreshing || false}
        onRefresh={this.props.onRefresh}
      />
    )
  }
}

export default ReactComp
