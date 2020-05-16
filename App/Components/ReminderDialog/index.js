import styles from './styles'
import I18n from '../../I18n'
import {isEmpty} from 'ramda'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default class ReminderDialog extends Component {
  static propTypes = {
    message: PropTypes.string,
    acceptTitle: PropTypes.string,
    rejectTitle: PropTypes.string,
    showMore: PropTypes.boolean,
    onAccept: PropTypes.func,
    onReject: PropTypes.func
  }

  static defaultProps = {
    message: '',
    rejectTitle: '',
    showMore: true,
    onAccept: () => console.tron.warn('onAccept is not defined')
  }

  renderButton = (onAction, text, leftButton) => {
    return (
      <TouchableOpacity
        onPress={onAction}
        activeOpacity={0.9}
        style={leftButton ? styles.leftButtonStyle : styles.rightButtonStyle}>
        <Text style={[styles.buttonText]}>{text}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    const { message, acceptTitle, rejectTitle, onAccept, onReject } = this.props
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {}}
        style={styles.mainContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => {}} style={[styles.innerContainer]}>
          <Text style={styles.reminderText}>{message}</Text>
          <View style={styles.horizontalView}>
            {!isEmpty(rejectTitle) && this.renderButton(onReject, rejectTitle, true)}
            {this.renderButton(onAccept, acceptTitle)}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
}
