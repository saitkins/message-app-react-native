import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ModalDropdown from 'react-native-modal-dropdown'

import styles from './styles'

export default class DropDown extends Component {
  static propTypes = {
    value: PropTypes.String,
    data: PropTypes.Array,
    itemKey: PropTypes.string,
    disabled: PropTypes.boolean,
    onSelect: PropTypes.function
  }

  static defaultProps = {
    onSelect: () => {},
    disabled: false
  }

  render () {
    const {data, value, onSelect, itemKey, disabled} = this.props
    return (
      <ModalDropdown
        disabled={disabled}
        options={data}
        defaultValue={value}
        textStyle={styles.textStyle}
        dropdownStyle={{height: 190}}
        dropdownTextStyle={styles.dropdownStyle}
        dropdownTextHighlightStyle={styles.highlightedText}
        onSelect={(index, value) => onSelect(index, value, itemKey)}
      />
    )
  }
}
