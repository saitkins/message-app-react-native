import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/FullButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import withPreventDoubleClick from '../Lib/withPreventDoubleClick'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

ExamplesRegistry.addComponentExample('Full Button', () =>
  <FullButton
    text='Hey there'
    onPress={() => window.alert('Full Button Pressed!')}
  />
)

export default class FullButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object
  }

  render () {
    return (
      <TouchableOpacityEx activeOpacity={0.8} style={[styles.button, this.props.styles]} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text && this.props.text}</Text>
      </TouchableOpacityEx>
    )
  }
}
