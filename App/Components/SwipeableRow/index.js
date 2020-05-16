import React, { Component } from 'react'
import { Animated, Text, View } from 'react-native'

import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import I18n from '../../I18n'

import styles from './Style'
import Metrics from '../../Themes/Metrics'

const width = Metrics.screenWidth / 2.5
export default class SwipeableRow extends Component {
  componentWillReceiveProps (nextProps) {
    const { close } = nextProps
    const { close: oldClose } = this.props
    if (close && close !== oldClose) {
      this.close()
    }
  }

  _swipeableRow: any

  renderRightAction = (progress) => {
    const { onSwipeItem } = this.props
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0]
    })
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          activeOpacity={0.0}
          style={styles.rightAction}
          onPress={() =>
            setTimeout(onSwipeItem, 200)
          }>
          <Text style={styles.actionText}>{I18n.t('markAsRead')}</Text>
        </RectButton>
      </Animated.View>
    )
  }
  renderRightActions = (progress) => {
    return (
      <View style={styles.rightButton}>
        {this.renderRightAction(progress)}
      </View>
    )
  }

  updateRef = (ref) => {
    this._swipeableRow = ref
  }

  close = () => {
    const { onClose = () => {} } = this.props
    onClose()
    if (this._swipeableRow) {
      this._swipeableRow.close()
    }
  }

  render () {
    const { children, changeSwipeItem, onClose = () => {}, disabled = false } = this.props
    return disabled ? children : (
      <Swipeable
        friction={2}
        useNativeAnimations
        rightThreshold={20}
        ref={this.updateRef}
        overshootFriction={4}
        onSwipeableClose={onClose}
        onSwipeableOpen={changeSwipeItem}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    )
  }
}
