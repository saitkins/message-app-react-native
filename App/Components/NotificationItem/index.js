import styles from './styles'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import VectorIcon from '../VectorIcon'
import { Text, TouchableOpacity, View } from 'react-native'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'
import { NOTIFICATION_TYPE } from '../../Constants/Constants'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

export default class NotificationItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    parentName: PropTypes.string
  }

  static defaultProps = {
    item: {},
    parentName: '',
    onPress: () => console.tron.warn('onPress is not defined for NotificationItem')
  }

  render () {
    let {item: {_id = '', event, type = '', createdAt = '', school: {name: schoolName = ''} = {}, student: {fullName = ''} = {}} = '', onPress} = this.props
    const {name = ''} = event || {}
    let message = name
    if (type === NOTIFICATION_TYPE.NEW_EVENT) {
      message = `A new event ${name} has been created.`
    } else if (type === NOTIFICATION_TYPE.KID_ADDED) {
      message = `${fullName} has been added to ${schoolName}`
    }
    return (
      <TouchableOpacityEx activeOpacity={0.8} key={_id} onPress={onPress} style={styles.itemContainer}>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={2} style={styles.description}>{message}</Text>
          <Text style={styles.timeText}>{moment(createdAt).fromNow()}</Text>
        </View>
        <VectorIcon name={'ios-arrow-forward'} type={'Ionicons'} style={styles.icon} />
      </TouchableOpacityEx>
    )
  }
}
