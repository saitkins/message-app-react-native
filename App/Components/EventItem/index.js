import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import {TouchableOpacity as TouchableOp} from 'react-native-gesture-handler'

import styles from './styles'
import I18n from '../../I18n'
import { DATE_FORMATS } from '../../Lib/AppConstants'
import { isTopDay } from '../../Lib/Utilities'

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableOp

export default class EventItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.function
  }
  static defaultProps = {
    item: {},
    onPress: () => {}
  }

  render () {
    const {item: {name = '', color = '#86BEFF', allDay = false, location = '', startDate = '', endDate = '', title = '', isLastItem = false}, topDay, onPress} = this.props
    const isFirstItem = isTopDay(topDay, title)
    return (
      <View style={styles.mainContainer}>
        {title
          ? <View style={[styles.dateContainer, !isFirstItem && styles.borderTop]}>
            <Text style={styles.dateText}>{moment(title).format(DATE_FORMATS.displayFormat)}</Text>
            {moment(title).isSame(new Date(), 'day') && <Text style={styles.dateText}>{'TODAY'}</Text>}
          </View>
          : <Touchable activeOpacity={0.8} onPress={onPress} style={styles.eventContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.startTime}>{allDay ? I18n.t('allDay') : moment(startDate).format(DATE_FORMATS.timeFormat1)}</Text>
              {!allDay && <Text style={styles.endTime}>{moment(endDate).format(DATE_FORMATS.timeFormat1)}</Text> }
            </View>
            <View style={[styles.eventNameContainer, !isLastItem && styles.BorderBottom]}>
              <View style={[styles.dot, {backgroundColor: color}]} />
              <View>
                <Text numberOfLines={1} style={styles.eventName}>{name}</Text>
                <Text numberOfLines={1} style={styles.eventVenue}>{location}</Text>
              </View>
            </View>
          </Touchable>
        }
      </View>
    )
  }
}
