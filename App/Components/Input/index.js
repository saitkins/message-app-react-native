import PropTypes from 'prop-types'
import styles from './styles'
import React, {Component} from 'react'
import Color from '../../Themes/Colors'
import {Actions} from 'react-native-router-flux'
import {TextInput, Text, TouchableOpacity} from 'react-native'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

export default class Input extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    autoFocus: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    styles: PropTypes.object,
    password: PropTypes.bool,
    isFocused: PropTypes.bool,
    required: PropTypes.bool,
    editable: PropTypes.bool,
    multiLine: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    returnKeyType: PropTypes.string,
    underlineSize: PropTypes.number,
    numberOfLines: PropTypes.number,
    onSubmitEditing: PropTypes.func,
    onEndEditing: PropTypes.func,
    autoCapitalize: PropTypes.string,
    textContentType: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    styleOverride: PropTypes.object,
    showForgot: PropTypes.boolean
  }

  static defaultProps = {
    showForgot: false
  }

  focus () {
    if (this.refs && this.refs.textField) {
      this.refs.textField.focus()
    }
  }

  renderTextInput = () => {
    const {
      value, placeholder, keyboardType, password, autoCapitalize, multiLine, numberOfLines, underlineColorAndroid = Color.transparent,
      onChangeText, placeholderTextColor, onSubmitEditing, onEndEditing, autoFocus, editable, returnKeyType, textOverride,
      styleOverride, onFocus, onBlur, isFocused, textContentType
    } = this.props
    return (
      <TextInput
        value={value}
        autoFocus={autoFocus}
        ref='textField'
        autoCorrect={false}
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
        textContentType={textContentType}
        multiline={multiLine}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        secureTextEntry={password}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={onEndEditing}
        blurOnSubmit={false}
        placeholderTextColor={placeholderTextColor}
        style={[styles.inputStyle, textOverride, styleOverride, isFocused && styles.focused]}
        underlineColorAndroid={underlineColorAndroid}
      />
    )
  }

  render () {
    const {editable, showForgot} = this.props
    return (
      <TouchableOpacity activeOpacity={1} onPress={editable ? this.focus.bind(this) : null} style={[styles.containerStyle]}>
        {this.renderTextInput()}
        {showForgot && <TouchableOpacityEx onPress={Actions.forgotPassword} style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot?</Text>
        </TouchableOpacityEx> }
      </TouchableOpacity>
    )
  }
};
