import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import I18n from '../../I18n'

export default class AddRequestTabs extends Component {
  static propTypes = {
    onChangeTab: PropTypes.function,
    absence: PropTypes.boolean,
    earlyPickup: PropTypes.boolean,
    lateDrop: PropTypes.boolean,
    disabled: PropTypes.boolean
  }

  static defaultProps = {
    onChangeTab: () => {},
    earlyPickup: false,
    lateDrop: false,
    absence: true,
    disabled: false
  }

  onTabPress = (absence, earlyPickup, lateDrop) => {
    const {onChangeTab} = this.props
    this.setState({absence, earlyPickup, lateDrop})
    onChangeTab(absence, earlyPickup, lateDrop)
  }

  render () {
    const {absence, earlyPickup, lateDrop, disabled} = this.props
    return (
      <View style={styles.buttonsGroup}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            this.onTabPress(true, false, false) }}
          style={[styles.leftButton, absence && styles.selectButton]}>
          <Text style={[styles.buttonText, absence && styles.selectButtonText]}>{I18n.t('absence')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => { this.onTabPress(false, true, false) }}
          style={[styles.centerButton, earlyPickup && styles.selectButton]}>
          <Text style={[styles.buttonText, earlyPickup && styles.selectButtonText]}>{I18n.t('earlyPickup')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => { this.onTabPress(false, false, true) }}
          style={[styles.rightButton, lateDrop && styles.selectButton]}>
          <Text style={[styles.buttonText, lateDrop && styles.selectButtonText]}>{I18n.t('lateDrop')}</Text>
        </TouchableOpacity>
      </View>)
  }
}
