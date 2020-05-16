import styles from './style'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Colors from '../../Themes/Colors'
import {Platform} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

export default class MaskedPhone extends Component {
  static propTypes = {
    phoneNumberFormat: PropTypes.string,
    phoneNumber: PropTypes.string,
    onChangeText: PropTypes.func,
    inputRef: PropTypes.func
  }

  static defaultProps = {
    phoneNumberFormat: PropTypes.string,
    phoneNumber: PropTypes.string,
    onChangeText: () => console.tron.warn('onChangeText is not defined for Masked Phone'),
    inputRef: () => console.tron.warn('inputRef is not defined for Masked Phone')
  }

  focus = () => {
    if (this.textRef) {
      this.textRef.focus()
    }
  }

  render () {
    const {phoneNumberFormat, onChangeText, onSubmitEditing} = this.props
    return (
      <TextInputMask
        onSubmitEditing={onSubmitEditing}
        refInput={ref => { this.textRef = ref }}
        value={phoneNumberFormat}
        placeholder='Phone'
        placeholderTextColor={Colors.placeholderColor}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
        keyboardType='phone-pad'
        blurOnSubmit={false}
        onChangeText={(phoneNumberFormat) => {
          let phoneNumber = phoneNumberFormat.toString().replace(/\D+/g, '')
          onChangeText(phoneNumberFormat, phoneNumber)
        }}
        type={'cel-phone'}
        maxLength={14}
        options={{
          dddMask: '(999) 999-'
        }}
        style={styles.maskedPhoneInput}
      />
    )
  }
}
