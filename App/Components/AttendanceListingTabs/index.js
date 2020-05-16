import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native'

import I18n from '../../I18n'
import styles from './styles'

export default class AttendanceListingTabs extends Component {
  static propTypes = {
    tabs: PropTypes.Object,
    onChangeTab: PropTypes.function
  }

  static defaultProps = {
    tabs: {},
    onChangeTab: () => {}
  }

  onTabPress = (all, absence, earlyPickup, lateDrop) => {
    const {onChangeTab} = this.props
    onChangeTab(all, absence, earlyPickup, lateDrop)
  }

  render () {
    const {tabs: {all, absence, lateDrop, earlyPickup}} = this.props
    return (
      <View style={styles.buttonsGroup}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem('currentTab', 'all')
            this.onTabPress(true, false, false, false)
          }}
          style={[styles.leftButton, all && styles.selectButton]}>
          <Text style={[styles.buttonText, all && styles.selectButtonText]}>{I18n.t('all')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onTabPress(false, true, false, false)
            AsyncStorage.setItem('currentTab', 'ABSENCE')
          }}
          style={[styles.centerButton, absence && styles.selectButton]}>
          <Text style={[styles.buttonText, absence && styles.selectButtonText]}>{I18n.t('absence')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onTabPress(false, false, true, false)
            AsyncStorage.setItem('currentTab', 'EARLY_PICKUP')
          }}
          style={[styles.centerButton, earlyPickup && styles.selectButton]}>
          <Text style={[styles.buttonText, earlyPickup && styles.selectButtonText]}>{I18n.t('earlyPickup')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onTabPress(false, false, false, true)
            AsyncStorage.setItem('currentTab', 'LATE_DROPOFF')
          }}
          style={[styles.rightButton, lateDrop && styles.selectButton]}>
          <Text style={[styles.buttonText, lateDrop && styles.selectButtonText]}>{I18n.t('lateDrop')}</Text>
        </TouchableOpacity>
      </View>)
  }
}
