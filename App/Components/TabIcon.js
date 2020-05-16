import React from 'react'
import {upperFirst} from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CustomIcons from '../Components/Icons/CustomIcons'
import { Text, View, Image } from 'react-native'
import styles from './Styles/TabIconStyle'
import { Colors, Metrics } from '../Themes'
import Images from '../Themes/Images'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  iconType: PropTypes.string,
  IconClass: PropTypes.string
}

class TabIcon extends React.Component {
  static defaultProps = {
    IconClass: CustomIcons
  }

  renderIcon = (count) => {
    return (
      <View style={styles.badgeIcon}>
        <Text numberOfLines={1} style={styles.notificationBadgeCountStyle}>{count}</Text>
      </View>
    )
  }

  render () {
    const {iconName, iconType, iconSize, focused, title, IconClass, messagesCount, remindersCount} = this.props
    const titleStyle = focused ? Colors.themeColor : Colors.lightgray
    return (
      <View style={styles.container}>
        {iconName === 'reminders' ? <Image source={Images.reminders} style={[styles.reminderIcon, {tintColor: titleStyle}]} />
        : <IconClass name={iconName} size={iconSize || Metrics.icons.tabIcon} color={titleStyle} type={iconType} />}
        <Text style={[styles.tabText, {color: titleStyle}]}>{upperFirst(title)}</Text>
        {
          iconName === 'reminders' && remindersCount && remindersCount > 0
            ? this.renderIcon(remindersCount) : null
        }
        {
          iconName === 'messages' && messagesCount && messagesCount > 0
            ? this.renderIcon(messagesCount) : null
        }
      </View>
    )
  }
}

TabIcon.propTypes = propTypes
const mapStateToProps = ({notifications: {messagesCount, remindersCount } = {}}, props) => {
  return {
    messagesCount,
    remindersCount
  }
}
export default connect(mapStateToProps, null)(TabIcon)
