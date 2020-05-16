import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { TouchableOpacity, View, Text } from 'react-native'

import styles from './styles'
import VectorIcon from '../VectorIcon'
import CustomIcon from '../../Components/Icons/CustomIcons'

export default class EventDetailsHeader extends Component {
  static propTypes = {
    liked: PropTypes.boolean,
    reminder: PropTypes.boolean,
    fetching: PropTypes.boolean,
    showReminder: PropTypes.boolean,
    showFavourite: PropTypes.boolean,
    headerStyles: PropTypes.object,
    title: PropTypes.string,
    onPressFav: PropTypes.function,
    onPressRemind: PropTypes.function
  }

  static defaultProps = {
    liked: false,
    reminder: false,
    fetching: false,
    title: '',
    headerStyles: {},
    showReminder: true,
    showFavourite: true,
    onPressFav: () => {},
    onPressRemind: () => {}
  }

  render () {
    const {onPressFav, onPressRemind, showReminder, showFavourite, liked, reminder, fetching, title, headerStyles} = this.props
    return (
      <View style={[styles.headerContainer, headerStyles]}>
        <TouchableOpacity onPress={Actions.pop}>
          <CustomIcon name={'cross'} style={styles.crossIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.favContainer}>
          {!fetching && showReminder ? <TouchableOpacity onPress={onPressRemind}>
            <VectorIcon name={reminder ? 'notifications' : 'notifications-none'} type={'MaterialIcons'} style={styles.notificationIcon} />
          </TouchableOpacity> : <View style={styles.emptyView} /> }
          {!fetching && showFavourite ? <TouchableOpacity onPress={onPressFav}>
            <VectorIcon name={liked ? 'heart' : 'hearto'} type={'AntDesign'} style={styles.favIcon} />
          </TouchableOpacity> : <View style={styles.emptyView} /> }
        </View>
      </View>
    )
  }
}
