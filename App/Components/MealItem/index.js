import moment from 'moment'
import styles from './styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Platform, Text, View, TouchableOpacity } from 'react-native'
import {TouchableOpacity as TouchableOp} from 'react-native-gesture-handler'
import { formatMenu, isTopDay } from '../../Lib/Utilities'
import { DATE_FORMATS } from '../../Lib/AppConstants'
import I18n from '../../I18n'

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableOp

export default class MealItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.boolean,
    onPress: PropTypes.function
  }
  static defaultProps = {
    item: {},
    index: false,
    onPress: () => {}
  }

  render () {
    const {item: {title = '', name = '', menu = {}, isHoliday, items, isLastItem = false}, onPress, topDay} = this.props
    const menuItems = formatMenu(menu)
    const isFirstItem = isTopDay(topDay, title)
    return (
      <View style={styles.mainContainer}>
        {title ? <View style={[styles.dateContainer, !isFirstItem && styles.borderTop]}>
          <Text style={styles.dateText}>{moment(title).format(DATE_FORMATS.displayFormat)}</Text>
          {moment(title).isSame(new Date(), 'day') && <Text style={styles.dateText}>{'Today'}</Text>}
        </View>
          : <Touchable onPress={onPress} style={styles.itemContainer}>
            <Text style={styles.label}>{name}</Text>
            <View style={[styles.menuContainer, !isLastItem && styles.bottomBorder]}>
              <Text numberOfLines={1} style={styles.menu}>{menuItems || items}
                <Text style={styles.holiday}>{isHoliday && I18n.t('holiday')}</Text></Text>
            </View>
          </Touchable>
        }
      </View>
    )
  }
}
