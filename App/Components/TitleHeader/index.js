import styles from './styles'
import PropTypes from 'prop-types'
import VectorIcon from '../VectorIcon'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Text, TouchableOpacity, View } from 'react-native'

export default class TitleHeader extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    title: ''
  }

  render () {
    const {title} = this.props
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.viewWidth} onPress={Actions.pop}>
          <VectorIcon name={'ios-arrow-back'} type={'Ionicons'} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.viewWidth} />
      </View>
    )
  }
}
