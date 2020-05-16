import moment from 'moment'
import styles from './styles'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import CustomIcons from '../../Components/Icons/CustomIcons'
import { DATE_FORMATS, EVENT_ORGANIZER } from '../../Lib/AppConstants'
import { formatMenu, getDeadLineMessage, titleCase } from '../../Lib/Utilities'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'
import * as Animatable from 'react-native-animatable'
import SwipeableRow from '../SwipeableRow'
import { ANIMATION_TYPE } from '../../Constants/Constants'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

export default class ReminderItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.function,
    disabled: PropTypes.boolean,
    onRemind: PropTypes.function,
    onSwipeItem: PropTypes.function,
    changeSwipeItem: PropTypes.function
  }
  static defaultProps = {
    item: {},
    onPress: () => {},
    onRemind: () => {},
    onSwipeItem: () => {},
    changeSwipeItem: () => {}
  }

  render () {
    const {item: {startDate = '', name = '', menu = {}, organizer = '', signUpDeadLine = '', eventType = '', reminderTime = '', reminderId = ''}, onPress, onRemind,
      onSwipeItem, disabled, changeSwipeItem, activeItem} = this.props
    let description = ''
    const message = getDeadLineMessage(startDate, signUpDeadLine)
    eventType === 'MEAL' ? description = formatMenu(menu) : description = EVENT_ORGANIZER[organizer] || 'Other'
    const reminderT = moment(reminderTime).fromNow()
    return (
      <Animatable.View
        useNativeDriver
        duration={1000}
        animation={ANIMATION_TYPE.FADE_IN}>
        <SwipeableRow
          onSwipeItem={onSwipeItem}
          close={activeItem !== reminderId}
          disabled={disabled}
          changeSwipeItem={() => changeSwipeItem(reminderId)}
        >
          <TouchableOpacityEx activeOpacity={0.8} onPress={onPress} style={styles.mainContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.time}>{moment(startDate).format(DATE_FORMATS.timeFormat)}</Text>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>{titleCase(name)}</Text>
                {!isEmpty(message) && <Text style={styles.eventMessage}>{message}</Text>}
                <Text numberOfLines={1} style={styles.organizer}>{description}</Text>
              </View>
            </View>
            <View style={styles.reminderContainer}>
              <Text style={styles.reminderT}>{reminderT}</Text>
              <TouchableOpacity onPress={onRemind}>
                <CustomIcons name={'reminder-on'} style={styles.reminderIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacityEx>
        </SwipeableRow>
      </Animatable.View>
    )
  }
}
