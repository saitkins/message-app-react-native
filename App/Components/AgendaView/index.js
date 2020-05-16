import React, {Component} from 'react'
import {
  Text,
  View,
  Dimensions,
  ViewPropTypes,
  StyleSheet,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import XDate from 'xdate'
import LinearGradient from 'react-native-linear-gradient'
import dateutils from 'react-native-calendars/src/dateutils'
import CalendarList from 'react-native-calendars/src/calendar-list'
import styleConstructor from 'react-native-calendars/src/agenda/style'
import { parseDate, xdateToData } from 'react-native-calendars/src/interface'
import ReservationsList from './ReservationList'
import BottomSheet from '../BottomSheet'
import Animated from 'react-native-reanimated'

import Colors from '../../Themes/Colors'
import { getBottomSpace, getStatusBarHeight } from '../../Lib/IphoneXHelper'
const {
  Value, interpolate, Extrapolate, onChange, call, cond, eq, divide, sub, set, max, round
} = Animated
const HEADER_HEIGHT = 104
const KNOB_HEIGHT = 24
const SNAP_STATES = {
  TOP: 0,
  CENTER: 1,
  BOTTOM: 2
}

const windowSize = Dimensions.get('window')
const minusValue = Platform.OS === 'ios' ? 100 + getStatusBarHeight(true) : 121
const VIEW_HEIGHT = windowSize.height - minusValue - getBottomSpace()
const AGENDA_HEIGHT = max(0, sub(VIEW_HEIGHT, HEADER_HEIGHT))

// Fallback when RN version is < 0.44
const viewPropTypes = ViewPropTypes || View.propTypes

export default class AgendaView extends Component {
  static propTypes = {
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,

    // agenda container style
    style: viewPropTypes.style,

    // the list of items that have to be displayed in agenda. If you want to render item as empty date
    // the value of date key has to be an empty array []. If there exists no value for date key it is
    // considered that the date in question is not yet loaded
    items: PropTypes.object,

    // callback that gets called when items for a certain month should be loaded (month became visible)
    loadItemsForMonth: PropTypes.func,
    // callback that fires when the calendar is opened or closed
    onCalendarToggled: PropTypes.func,
    // callback that gets called on day press
    onDayPress: PropTypes.func,
    // callback that gets called when day changes while scrolling agenda list
    onDaychange: PropTypes.func,
    // specify how each item should be rendered in agenda
    renderItem: PropTypes.func,
    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
    renderDay: PropTypes.func,
    // specify how empty date content with no items should be rendered
    renderEmptyDay: PropTypes.func,
    // specify what should be rendered instead of ActivityIndicator
    renderEmptyData: PropTypes.func,
    // specify your item comparison function for increased performance
    rowHasChanged: PropTypes.func,

    // Max amount of months allowed to scroll to the past. Default = 50
    pastScrollRange: PropTypes.number,

    // Max amount of months allowed to scroll to the future. Default = 50
    futureScrollRange: PropTypes.number,

    // initially selected day
    selected: PropTypes.any,
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    minDate: PropTypes.any,
    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    maxDate: PropTypes.any,

    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
    firstDay: PropTypes.number,

    // Collection of dates that have to be marked. Default = items
    markedDates: PropTypes.object,
    // Optional marking type if custom markedDates are provided
    markingType: PropTypes.string,
    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
    monthFormat: PropTypes.string,
    // A RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
    refreshControl: PropTypes.element,
    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
    onRefresh: PropTypes.func,
    // Set this true while waiting for new data from a refresh.
    refreshing: PropTypes.bool,
    // Display loading indicador. Default = false
    displayLoadingIndicator: PropTypes.bool
  };

  bottomSheet = null
  snapPos = new Value(0)
  snapHeight = new Value(0)
  snapState = new Value(SNAP_STATES.TOP)

  headerTranslate = new Value(0)
  contentTranslate = new Value(0)
  weekHeaderOpacity = new Value(0)
  weekHeaderTranslate = new Value(-HEADER_HEIGHT)
  headerPosition = null
  timeout = null

  constructor (props) {
    super(props)
    this.styles = styleConstructor(props.theme)
    this.viewHeight = VIEW_HEIGHT
    this.viewWidth = windowSize.width
    this.scrollTimeout = undefined
    this.state = {
      prevSnapState: SNAP_STATES.TOP,
      calendarScrollable: true,
      firstResevationLoad: false,
      selectedDay: parseDate(this.props.selected) || XDate(true),
      topDay: parseDate(this.props.selected) || XDate(true),
      earliestDay: new XDate().addYears(-1),
      latestDay: XDate().addYears(1)
    }
    this.currentMonth = this.state.selectedDay.clone()
    this.onLayout = this.onLayout.bind(this)
    this.generateMarkings = this.generateMarkings.bind(this)
    this.calendarOffset = this.calendarOffset.bind(this)
    this.headerTranslate = interpolate(this.snapPos, {
      inputRange: [0, 0.52],
      outputRange: [0, AGENDA_HEIGHT],
      extrapolate: Extrapolate.CLAMP
    })
    this.contentTranslate = interpolate(this.snapPos, {
      inputRange: [0, 0.52],
      outputRange: [divide(AGENDA_HEIGHT, 2), 0],
      extrapolate: Extrapolate.CLAMP
    })
    this.weekHeaderOpacity = interpolate(this.snapPos, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })
    this.weekHeaderTranslate = interpolate(this.snapPos, {
      inputRange: [0, 1],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: Extrapolate.CLAMP
    })
    this.snapHeight = sub(VIEW_HEIGHT, 90)
    this.headerPosition = new Value(1)
  }

  calendarOffset () {
    return 90 - (this.viewHeight / 2)
  }

  onLayout (event) {
    this.viewHeight = event.nativeEvent.layout.height
    this.viewWidth = event.nativeEvent.layout.width
    this.calendar.scrollToDay(this.state.selectedDay.clone(), this.calendarOffset(), false)
  }

  resetCalendar = (pos = SNAP_STATES.CENTER) => {
    if (this.bottomSheet && this.state.prevSnapPos !== pos) {
      this.bottomSheet.snapTo(pos)
      this.setState({ prevSnapPos: pos })
    }
  }

  onVisibleMonthsChange (months) {
    if (this.props.items && !this.state.firstResevationLoad) {
      clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(() => {
        if (this.props.loadItemsForMonth && this._isMounted) {
          this.props.loadItemsForMonth(months[0])
        }
      }, 200)
    }
  }

  loadReservations (props) {
    if ((!props.items || !Object.keys(props.items).length) && !this.state.firstResevationLoad) {
      this.setState({
        firstResevationLoad: true
      }, () => {
        if (this.props.loadItemsForMonth) {
          this.props.loadItemsForMonth(xdateToData(this.state.selectedDay))
        }
      })
    }
  }

  componentWillMount () {
    this._isMounted = true
    this.loadReservations(this.props)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentWillReceiveProps (props) {
    if (props.items) {
      this.setState({
        firstResevationLoad: false
      })
    } else {
      this.loadReservations(props)
    }
  }

  _chooseDayFromCalendar (d) {
    this.chooseDay(d, !this.state.calendarScrollable)
  }

  chooseDay (d, optimisticScroll) {
    const day = parseDate(d)
    this.setState({
      selectedDay: day.clone()
    })
    if (this.props.onCalendarToggled) {
      this.props.onCalendarToggled(false)
    }
    if (!optimisticScroll) {
      this.setState({
        topDay: day.clone()
      })
    }
    this.resetCalendar(SNAP_STATES.TOP)
    this.calendar.scrollToDay(day, this.calendarOffset(), true)
    if (this.props.loadItemsForMonth) {
      this.props.loadItemsForMonth(xdateToData(day))
    }
    if (this.props.onDayPress) {
      this.props.onDayPress(xdateToData(day))
    }
  }

  renderReservations () {
    const { prevSnapPos } = this.state
    const style = { height: prevSnapPos === SNAP_STATES.TOP ? VIEW_HEIGHT - 90 : (VIEW_HEIGHT - 90) / 2 - 24 }
    return (
      <View style={[this.styles.reservations, styles.reservationContainer, style]}>
        <ReservationsList
          refreshControl={this.props.refreshControl}
          refreshing={this.props.refreshing}
          onRefresh={this.props.onRefresh}
          rowHasChanged={this.props.rowHasChanged}
          renderItem={this.props.renderItem}
          renderDay={this.props.renderDay}
          renderEmptyDate={this.props.renderEmptyDate}
          reservations={this.props.items}
          selectedDay={this.state.selectedDay}
          renderEmptyData={this.props.renderEmptyData}
          topDay={this.state.topDay}
          onDayChange={this.onDayChange.bind(this)}
          onScroll={() => {}}
          ref={(c) => { this.list = c }}
          theme={this.props.theme}
          earliestDay={this.state.earliestDay}
          latestDay={this.state.latestDay}
        />
      </View>
    )
  }

  onDayChange (day) {
    const newDate = parseDate(day)
    const withAnimation = dateutils.sameMonth(newDate, this.state.selectedDay)
    this.calendar.scrollToDay(day, this.calendarOffset(), withAnimation)
    this.setState({
      selectedDay: parseDate(day)
    })

    if (this.props.onDayChange) {
      this.props.onDayChange(xdateToData(newDate))
    }
  }

  onSnapPosChange = ([state]) => {
    this.setState({ prevSnapPos: state, calendarScrollable: state !== SNAP_STATES.TOP })
    this.calendar.scrollToDay(this.state.selectedDay, this.calendarOffset(), true)
  }

  generateMarkings () {
    let markings = this.props.markedDates
    if (!markings) {
      markings = {}
      Object.keys(this.props.items || {}).forEach(key => {
        if (this.props.items[key] && this.props.items[key].length) {
          markings[key] = {marked: true}
        }
      })
    }
    const key = this.state.selectedDay.toString('yyyy-MM-dd')
    return {...markings, [key]: {...(markings[key] || {}), ...{selected: true}}}
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    )
  }

  render () {
    const agendaHeight = Math.max(0, this.viewHeight - HEADER_HEIGHT)
    const weekDaysNames = dateutils.weekDayNames(this.props.firstDay)
    const weekdaysStyle = [this.styles.weekdays, styles.weekDayStyle, {
      opacity: this.weekHeaderOpacity,
      transform: [{ translateY: this.weekHeaderTranslate }]
    }]
    const headerStyle = [
      this.styles.header,
      { bottom: agendaHeight, transform: [{ translateY: this.headerTranslate }] }
    ]

    const bottomSheetHeight = this.viewHeight - 90
    const centerPoint = bottomSheetHeight / 2

    return (
      <View onLayout={this.onLayout} style={[this.props.style, styles.container]}>
        <Animated.View style={headerStyle}>
          <Animated.View style={[styles.flex, {transform: [{ translateY: this.contentTranslate }]}]}>
            <LinearGradient style={styles.flex} start={{x: 0, y: 1}} end={{x: 0.5, y: 0}} angle={45} colors={[Colors.primary3, Colors.gradientC1, Colors.gradientC2]}>
              <CalendarList
                onLayout={() => {
                  this.calendar.scrollToDay(this.state.selectedDay.clone(), this.calendarOffset(), false)
                }}
                calendarWidth={this.viewWidth}
                theme={this.props.theme}
                onVisibleMonthsChange={this.onVisibleMonthsChange.bind(this)}
                ref={(c) => { this.calendar = c }}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                current={this.currentMonth}
                markedDates={this.generateMarkings()}
                markingType={this.props.markingType}
                removeClippedSubviews={false}
                onDayPress={this._chooseDayFromCalendar.bind(this)}
                scrollEnabled={this.state.calendarScrollable}
                hideExtraDays={this.state.calendarScrollable}
                firstDay={this.props.firstDay}
                monthFormat={this.props.monthFormat}
                pastScrollRange={this.props.pastScrollRange}
                futureScrollRange={this.props.futureScrollRange}
                dayComponent={this.props.dayComponent}
                disabledByDefault={this.props.disabledByDefault}
                displayLoadingIndicator={this.props.displayLoadingIndicator}
                showWeekNumbers={this.props.showWeekNumbers}
              />
            </LinearGradient>
          </Animated.View>
        </Animated.View>
        <Animated.View style={weekdaysStyle}>
          <LinearGradient style={[this.styles.weekdays, styles.weekDayStyle]} start={{x: 0, y: 0}} end={{x: 0.5, y: 0}} colors={[Colors.gradientC1, Colors.gradientC1]}>
            {this.props.showWeekNumbers && <Text allowFontScaling={false} style={this.styles.weekday} numberOfLines={1} />}
            {weekDaysNames.map((day, index) => (
              <Text allowFontScaling={false} key={day + index} style={this.styles.weekday} numberOfLines={1}>{day}</Text>
            ))}
          </LinearGradient>
        </Animated.View>
        { this.headerPosition && (
          <BottomSheet
            ref={(ref) => { this.bottomSheet = ref }}
            snapPoints={[bottomSheetHeight, centerPoint, KNOB_HEIGHT]}
            renderContent={this.renderReservations.bind(this)}
            renderHeader={this.renderHeader}
            callbackNode={this.snapPos}
            headerPosition={this.headerPosition}
          />
        )}
        {this.headerPosition && (
          <Animated.Code
            key={this.state.key}
            exec={onChange(
              this.headerPosition,
              cond(eq(sub(this.snapHeight, KNOB_HEIGHT), this.headerPosition), [
                set(this.snapState, SNAP_STATES.BOTTOM),
                call([this.snapState], this.onSnapPosChange)
              ], [
                cond(eq(round(divide(this.snapHeight, 2)), this.headerPosition), [
                  set(this.snapState, SNAP_STATES.CENTER),
                  call([this.snapState], this.onSnapPosChange)
                ], [
                  cond(eq(round(this.headerPosition), 0), [
                    set(this.snapState, SNAP_STATES.TOP),
                    call([this.snapState], this.onSnapPosChange)
                  ])
                ])
              ])
            )}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {height: VIEW_HEIGHT, overflow: 'hidden'},
  flex: {
    flex: 1
  },
  reservationContainer: {
    flex: -1,
    marginTop: 0,
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: Colors.snow,
    shadowColor: '#000000',
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  weekDayStyle: {
    backgroundColor: Colors.transparent,
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: 15
  }
})
