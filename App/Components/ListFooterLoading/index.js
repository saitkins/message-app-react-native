import PropTypes from 'prop-types'
import Colors from '../../Themes/Colors'
import React, { Component } from 'react'
import styles from './styles'
import { ActivityIndicator, View } from 'react-native'

export default class ListFooterLoading extends Component {
  static propTypes = {
    fetching: PropTypes.boolean,
    refreshing: PropTypes.boolean,
    pageNo: PropTypes.boolean
  }

  static defaultProps = {
    fetching: false,
    refreshing: false,
    pageNo: 1
  }

  render () {
    const {fetching, pageNo, refreshing} = this.props
    return parseInt(pageNo) > 1 && fetching && !refreshing ? <View style={styles.footerLoadingContainer}>
      <ActivityIndicator color={Colors.themeColor} size='large' style={styles.activityIndicator} animating />
    </View> : null
  }
}
