import React, {Component} from 'react'
import {Modal, Picker, Platform, Text, TouchableOpacity, View} from 'react-native'
import styles from './CustomPickerStyles'
import I18n from '../../I18n'

type CustomPickerProps = {
  onValueChange: (number, string, string) => {},
  disabled: boolean,
  items: Array,
  itemKey: string,
  defaultValue: string
}

export default class CustomPicker extends Component {
  props: CustomPickerProps

  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedValue: props.value || '',
      index: 0,
      itemKey: ''
    }
  }

  onValueChange = (itemIndex, itemValue, itemKey) => {
    this.setState({
      itemKey,
      index: itemIndex,
      selectedValue: itemValue
    })
    if (Platform.OS !== 'ios') {
      setTimeout(() => {
        this.hide()
      }, 100)
    }
  }

  hide = (ok = true) => {
    this.setState({modalVisible: false})
    const {onValueChange, items, itemKey: key = ''} = this.props
    if (ok) {
      const {selectedValue, index, itemKey} = this.state
      if (selectedValue) {
        onValueChange(index, selectedValue, itemKey)
      } else {
        const value = (items) ? items[0] : ''
        onValueChange(index, value, key)
        this.setState({selectedValue: value})
      }
    }
  }

  render () {
    const {items = [], disabled = false, itemKey = '', style, defaultValue = ''} = this.props
    const {selectedValue} = this.state
    const selectedLabel = selectedValue || defaultValue
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          this.setState({modalVisible: !disabled})
        }} {...this.props} style={[style, styles.selectedContainer, {height: 40}]}>
          <Text style={[styles.text]}>
            {selectedLabel}
          </Text>
          <Modal
            style={styles.container}
            transparent
            animationType='fade'
            supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
            visible={this.state.modalVisible}>
            <TouchableOpacity activeOpacity={1} style={styles.innerContainer} onPress={() => this.hide(false)}>
              <View style={styles.pickerWrapper}>
                <View style={[styles.btnContainer, styles.bgWhite]}>
                  <Text style={styles.btnText} onPress={() => this.hide(false)}>{I18n.t('cancel')}</Text>
                  <Text style={[styles.btnText, {textAlign: 'right'}]} onPress={this.hide}>{I18n.t('done')}</Text>
                </View>
                <Picker
                  style={styles.bgWhite}
                  itemStyle={styles.itemStyle}
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => this.onValueChange(itemIndex, itemValue, itemKey)}>
                  {items.map(item => <Picker.Item label={item} value={item} />)}
                </Picker>
              </View>
            </TouchableOpacity>
          </Modal>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          this.setState({modalVisible: !disabled})
        }} {...this.props} style={[style, styles.selectedContainer, {height: 40}]}>
          <Text style={[styles.text]}>
            {selectedLabel}
          </Text>
          <Picker
            style={{ position: 'absolute', top: 0, width: 1000, height: 1000 }}
            selectedValue={selectedValue}
            itemStyle={styles.itemStyle}
            onValueChange={(itemValue, itemIndex) => this.onValueChange(itemIndex, itemValue, itemKey)}>
            <Picker.Item label={'None'} value={'None'} />
            {items.map(item => <Picker.Item label={item} value={item} />)}
          </Picker>
        </TouchableOpacity>
      )
    }
  }
}
