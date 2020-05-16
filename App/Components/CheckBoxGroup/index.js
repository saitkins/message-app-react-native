import {isEmpty} from 'ramda'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'

import styles from './styles'
import CheckBox from '../CheckBox'
import Colors from '../../Themes/Colors'
import { CheckboxColors } from '../../Lib/AppConstants'

export default class CheckBoxGroup extends Component {
  static propTypes= {
    selectedIndex: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    onValueChanged: PropTypes.func.isRequired
  };

  static defaultProps={
    selectedIndex: [],
    options: [],
    onValueChanged: () => { console.tron.log('onValueChanged is not defined for CheckBoxLikeRadioGroup') }
  }
  renderOptions = () => {
    const {options = [], selectedIndex = [], onValueChanged} = this.props
    if (isEmpty(options)) {
      return
    }
    return options.map((item, index) => {
      const {title = '', _id = ''} = item
      let isChecked = selectedIndex.includes(_id)
      const fillColor = CheckboxColors[index] || CheckboxColors[0]
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.rowContainer}
          onPress={() => { !isChecked ? onValueChanged(_id, isChecked) : onValueChanged(_id, true) }}>
          <CheckBox
            style={{borderColor: fillColor}}
            tickColor={isChecked ? Colors.snow : Colors.black}
            fillColor={isChecked ? fillColor : Colors.transparent}
            onChange={checked => { checked ? onValueChanged(_id, checked) : onValueChanged(_id, true) }}
            checked={isChecked} />
          {!isEmpty(title) && <Text style={styles.title}>{title}</Text>}
        </TouchableOpacity>
      )
    })
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {
          this.renderOptions()
        }
      </ScrollView>
    )
  }
}
