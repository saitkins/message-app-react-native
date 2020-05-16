import mement from 'moment'
import styles from './styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

export default class MessageItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.function
  }
  static defaultProps = {
    item: {},
    onPress: () => {}
  }

  render () {
    const {item: {message: {content = ''} = {}, createdAt = '', from = '', status = ''}, onPress} = this.props
    return (
      <TouchableOpacityEx activeOpacity={0.8} onPress={onPress} style={status === 'NEW' ? styles.unreadContainer : styles.readContainer}>
        <View style={styles.rightContainer}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.date}>{mement(createdAt).format('MM/DD/YY')}</Text>
              <Text style={styles.time}>{mement(createdAt).format('hh:mm A')}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{typeof from === 'string' && from}</Text>
              <Text numberOfLines={1} style={styles.message}>{content}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacityEx>
    )
  }
        }
