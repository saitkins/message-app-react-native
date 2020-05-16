import PropTypes from 'prop-types'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'
import React, { Component } from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class CheckBox extends Component {
  static propTypes = {
    style: PropTypes.object,
    toggleCheck: PropTypes.func,
    checked: PropTypes.bool.isRequired,
    fillColor: PropTypes.string,
    tickSize: PropTypes.number,
    tickColor: PropTypes.string,
    editAble: PropTypes.boolean
  }

  static defaultProps = {
    checked: false,
    fillColor: Colors.transparent,
    tickSize: Metrics.icons.small,
    tickColor: Colors.black,
    editAble: true
  }

  constructor (props) {
    super(props)
    const {checked} = props
    this.state = {
      checked
    }
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.setState({checked: nextProps.checked})
  }

  render () {
    const {style, fillColor, tickColor, editAble, toggleCheck = null} = this.props
    const {checked} = this.state
    return (
      <TouchableOpacity
        disabled={!editAble}
        activeOpacity={0.8}
        onPress={toggleCheck || this._toggleCheck}
        style={[styles.checkBoxContainer, style, {backgroundColor: fillColor}]}>
        {
          checked &&
          <Ionicons name='md-checkmark' size={18} color={tickColor || Colors.snow} />
        }
      </TouchableOpacity>
    )
  }

  _toggleCheck = () => {
    const {checked = false} = this.state || {}
    this.setState({checked: !checked})
    this.props.onChange && this.props.onChange(!checked)
  }
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object
}
