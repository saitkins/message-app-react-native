import styles from './styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CustomIcons from '../Icons/CustomIcons'
import { Text, TouchableOpacity, View } from 'react-native'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

export default class ListingHeader extends Component {
  static propTypes = {
    heading: PropTypes.string,
    showAction: PropTypes.boolean,
    onPress: PropTypes.function
  }

  static defaultProps = {
    heading: '',
    showAction: false,
    onPress: () => {}
  }

  render () {
    const {heading, showAction, onPress} = this.props
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>{heading}</Text>
        {showAction && <TouchableOpacityEx onPress={onPress}>
          <CustomIcons name={'plus'} style={styles.headerIcons} />
          </TouchableOpacityEx> }
      </View>
    )
  }
}
