import mement from 'moment'
import styles from './styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Colors from '../../Themes/Colors'
import CustomIcons from '../../Components/Icons/CustomIcons'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'
import { titleCase } from '../../Lib/Utilities'
import { ATTENDANCE_TYPE } from '../../Lib/AppConstants'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

export default class AttendanceItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onDelete: PropTypes.function,
    onPress: PropTypes.function
  }
  static defaultProps = {
    item: {},
    onPress: () => {},
    onDelete: () => {}
  }

  render () {
    const {item: {startDate = '', endDate = '', type = '', student: {name: {first = '', last = ''} = {}} = {}, status = '', reason = ''}, onPress, onDelete} = this.props
    return (
      <TouchableOpacityEx activeOpacity={0.8} onPress={onPress}
        style={[styles.mainContainer, {backgroundColor: status === 'NEW' ? Colors.green : Colors.fire}]}>
        <View style={styles.rightContainer}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.startDate}>{mement(startDate).format('MM/DD/YY')}</Text>
              <Text style={styles.endDate}>{mement(endDate).format('MM/DD/YY')}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{`${first} ${last}`}</Text>
              <Text style={styles.reason}>{`${titleCase(reason)} (${ATTENDANCE_TYPE[type]})`}</Text>
            </View>
          </View>
          {status === 'NEW' && <CustomIcons name={'cross'} style={styles.crossIcon} onPress={onDelete} /> }
        </View>
      </TouchableOpacityEx>
    )
  }
        }
