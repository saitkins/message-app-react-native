import styles from './styles'
import PropTypes from 'prop-types'
import CustomIcons from '../Icons/CustomIcons'
import VectorIcon from '../VectorIcon'
import React, { Component } from 'react'
import Colors from '../../Themes/Colors'
import { Actions } from 'react-native-router-flux'
import { Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

class UserHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    calendarShown: PropTypes.boolean
  }

  static defaultProps = {
    title: '',
    calendarShown: false
  }

  render () {
    const {calendarShown, title, notificationsCount} = this.props
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 0}} colors={[Colors.gradientC1, Colors.gradientC1]}>
        <View style={[styles.headerContainer, calendarShown ? {backgroundColor: Colors.gradientC2} : {}]}>
          <TouchableOpacityEx style={styles.userContainer} onPress={Actions.profile}>
            <CustomIcons name={'profile'} style={styles.userIcon} />
          </TouchableOpacityEx>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.rightContainer}>
            <TouchableOpacityEx onPress={Actions.notifications} style={styles.notificationContainer}>
              <VectorIcon name={'notifications-none'} type={'MaterialIcons'} style={styles.notificationIcon} />
              {notificationsCount > 0 && <View style={styles.countContainer}>
                <Text style={styles.countText}>{notificationsCount}</Text>
              </View>}
            </TouchableOpacityEx>
            <TouchableOpacityEx onPress={Actions.filterSchools}>
              <VectorIcon name={'filter'} type={'Feather'} style={styles.icon} />
            </TouchableOpacityEx>
          </View>
        </View>
      </LinearGradient>
    )
  }
}

const mapStateToProps = ({notifications: {notificationsCount} = {}}, props) => {
  return {
    notificationsCount
  }
}
export default connect(mapStateToProps, null)(UserHeader)
