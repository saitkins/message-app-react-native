import styles from './styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import I18n from '../../I18n'

export default class StudentItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.function
  }
  static defaultProps = {
    item: {},
    onPress: () => {}
  }

  renderInfoItem = (label, value) => {
    return (
      <Text style={styles.labelText}>{`${label}: `}<Text style={styles.valueText}>{value}</Text></Text>
    )
  }

  render () {
    const {item: {school: {name: schoolName = ''} = {}, kid: {name: {first = '', last = ''} = {},
    section: {teacher: {name: {first: teacherFirst = '', last: teacherLast = ''} = {}} = {},
    grade: {name: grade = ''} = {}} = {}} = {}}} = this.props
    const avatar = (first || 'N').charAt(0).toUpperCase() + (last || 'N').charAt(0).toUpperCase()
    return (
      <View style={styles.itemContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{avatar}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{`${first} ${last}`}</Text>
          {this.renderInfoItem(I18n.t('grade'), grade)}
          {this.renderInfoItem(I18n.t('teacher'), `${teacherFirst} ${teacherLast}`)}
          {this.renderInfoItem(I18n.t('school'), schoolName)}
        </View>
      </View>
    )
  }
}
