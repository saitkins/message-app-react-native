import moment from 'moment'
import I18n from '../../I18n'
import { isEmpty, trim } from 'lodash'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Keyboard, Platform, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Colors from '../../Themes/Colors'
import FullButton from '../../Components/FullButton'
import AttendanceActions from '../../Redux/AttendanceRedux'
import AddRequestTabs from '../../Components/AddRequestTabs'
import InputScrollView from 'react-native-input-scroll-view'
import { ProgressDialog } from '../../Components/ProgressDialog'
import { getSelectedTab, showMessage, titleCase } from '../../Lib/Utilities'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import { AttendanceReasons, DATE_FORMATS } from '../../Lib/AppConstants'
import CustomPicker from '../../Components/CustomPicker/CustomPicker'

class AttendanceRequest extends Component {
  constructor (props) {
    const {
      item: {
        type = '', reason = '', section = '', student: {_id: studentId = ''} = {}, startDate = '',
        endDate = '', notes = '', pickupTime, dropOffTime} = {}} = props
    const {absence, earlyPickup, lateDrop} = getSelectedTab(type)
    const time = type === 'EARLY_PICKUP' ? pickupTime : dropOffTime
    super(props)
    this.state = {
      absence,
      pickerKey: 'date',
      selectedInput: '',
      earlyPickup,
      lateDrop,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      time: time || new Date(),
      student: studentId,
      section,
      teacher: '',
      reason,
      notes,
      showTimePicker: false,
      type: 0
    }
  }

  renderDate = () => {
    const {startDate, endDate} = this.state
    const {disabled = false} = this.props
    return (
      <View style={styles.dateContainer}>
        <View style={styles.horizontalView}>
          <Text style={styles.itemLabel}>{I18n.t('startDate')}</Text>
          <TouchableOpacity disabled={disabled} onPress={() => this.setState({type: 0, showTimePicker: true, pickerKey: 'startDate'})}>
            <Text style={styles.itemValue}>{moment(startDate).format(DATE_FORMATS.monthFormat)}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.horizontalView, styles.topBorder]}>
          <Text style={styles.itemLabel}>{I18n.t('endDate')}</Text>
          <TouchableOpacity disabled={disabled} onPress={() => this.setState({type: 1, showTimePicker: true, pickerKey: 'endDate'})}>
            <Text style={styles.itemValue}>{moment(endDate).format(DATE_FORMATS.monthFormat)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onSelectItem = (index, value, key) => {
    if (Platform.OS !== 'ios') {
      if (index === 0) {
        this.setState({student: '', teacher: ''})
        return
      } else {
        index = index - 1
      }
    }

    const {students = []} = this.props
    if (key === 'Student') {
      const {section = '', kidId, teacher} = students[index]
      this.setState({section, student: kidId, teacher})
    } else {
      this.setState({[key.toLowerCase()]: value})
    }
  }

  renderTime = () => {
    const {absence, lateDrop, time} = this.state
    console.tron.warn({time})
    const {disabled = false} = this.props
    return (
      <View style={styles.dateContainer}>
        <View style={[styles.horizontalView, absence && styles.disabledView]}>
          <Text style={[styles.itemLabel, absence && styles.disabledText]}>{lateDrop ? I18n.t('dropOffTime') : I18n.t('pickupTime')}</Text>
          <TouchableOpacity disabled={absence || disabled} onPress={() => this.setState({
            showTimePicker: true,
            type: 2,
            pickerKey: 'time',
            selectedInput: 'time'
          })}>
            <Text
              style={[styles.itemValue, absence && styles.disabledText]}>{moment(time).format(DATE_FORMATS.timeFormat)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderDropDownItem = (label, value, data) => {
    const {disabled} = this.props
    return (
      <View style={[styles.dateContainer, styles.horizontalView]}>
        <Text style={styles.itemLabel}>{label}</Text>
        <CustomPicker disabled={disabled} onValueChange={this.onSelectItem} items={data} defaultValue={value} itemKey={label} />
      </View>
    )
  }

  renderTeacher = (teacher) => {
    return (
      <View style={[styles.dateContainer, styles.horizontalView]}>
        <Text style={styles.itemLabel}>{I18n.t('teacher')}</Text>
        <Text style={styles.itemValue}>{!isEmpty(teacher) ? teacher : I18n.t('none')}</Text>
      </View>
    )
  }

  getMinimumDate = () => {
    const {type, startDate, endDate, time} = this.state
    console.tron.warn({type})
    if (type === 0) {
      return moment(startDate).toDate()
    } else if (type === 1) {
      return moment(endDate).toDate()
    } else {
      console.tron.warn({time})
      return moment(time).toDate()
    }
  }

  sendAttendanceRequest = () => {
    Keyboard.dismiss()
    const {attendanceRequest, editAttendanceRequest, edit = false} = this.props
    const {startDate, endDate, time, student, reason, section, earlyPickup, lateDrop, absence, notes} = this.state
    const type = absence ? 'ABSENCE' : earlyPickup ? 'EARLY_PICKUP' : 'LATE_DROPOFF'

    if (endDate < startDate) {
      showMessage(I18n.t('dateMatching'))
    } else if (isEmpty(student)) {
      showMessage(I18n.t('selectStudent'))
    } else if (isEmpty(reason)) {
      showMessage(I18n.t('selectReason'))
    } else {
      let request = {startDate, endDate, type, section, student, notes: trim(notes), reason: reason.toUpperCase()}
      if (earlyPickup) {
        request = {...request, pickupTime: time}
      } else if (lateDrop) {
        request = {...request, dropOffTime: time}
      }
      if (edit) {
        const {item: {_id: attendanceId}} = this.props
        editAttendanceRequest(attendanceId, request)
      } else {
        attendanceRequest(request)
      }
    }
  }

  onConfirmDate = (date) => {
    const {pickerKey} = this.state
    console.tron.warn({date, pickerKey})
    this.setState({[pickerKey]: date, showTimePicker: false})
  }

  onChangedTab = (absence, earlyPickup, lateDrop) => {
    this.setState({absence, earlyPickup, lateDrop})
  }

  render () {
    const {students = [], fetching, parentName, edit, disabled = false} = this.props
    const studentsNames = students.map((student) => { return student.name })
    const {showTimePicker, student, pickerKey, notes, earlyPickup, reason, teacher, absence, lateDrop} = this.state
    const pickerMode = pickerKey === 'time' ? 'time' : 'date'
    const titleIOS = pickerKey === 'time' ? 'Pick a time' : 'Pick a date'
    const confirmTextIOS = I18n.t('done')
    let currentStudent = I18n.t('none')
    let currentReason = I18n.t('none')
    let selectedTeacher = teacher
    if (edit) {
      const index = students.findIndex(({kidId}) => kidId === student)
      const {name = '', teacher = ''} = students[index] || {}
      currentStudent = name
      currentReason = titleCase(reason)
      selectedTeacher = teacher
    }
    const minimumDate = this.getMinimumDate()
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent />
        <EventDetailsHeader title={edit ? I18n.t('updateRequest') : I18n.t('submitRequest')} fetching />
        <View style={styles.scrollContainer}>
          <InputScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.innerContainer}>
              <AddRequestTabs disabled={disabled} absence={absence} lateDrop={lateDrop} earlyPickup={earlyPickup}
                onChangeTab={this.onChangedTab} />
              {this.renderDate()}
              {this.renderTime()}
              {this.renderDropDownItem(I18n.t('student'), currentStudent, studentsNames)}
              {this.renderTeacher(selectedTeacher)}
              {this.renderDropDownItem(I18n.t('reason'), currentReason, AttendanceReasons)}
              <TextInput multiline textAlignVertical={'top'}
                value={notes}
                editable={!disabled}
                onChangeText={(notes) => { this.setState({notes}) }}
                style={styles.input} placeholder={I18n.t('writeDetails')}
                placeholderTextColor={Colors.lightText} />
              <Text style={styles.tag}>{I18n.t('submittedBy')}<Text
                style={styles.submittedBy}>{parentName}</Text></Text>
              {!disabled && <FullButton text={edit ? I18n.t('updateRequest') : I18n.t('submitRequest')} onPress={this.sendAttendanceRequest} /> }
            </View>
          </InputScrollView>
        </View>
        <DateTimePicker
          date={minimumDate}
          isVisible={showTimePicker}
          mode={pickerMode}
          confirmTextStyle={styles.confirmText}
          confirmTextIOS={confirmTextIOS}
          onConfirm={this.onConfirmDate}
          titleIOS={titleIOS}
          minimumDate={pickerMode === 'date' ? new Date() : undefined}
          onCancel={() => this.setState({showTimePicker: false})}
          is24Hour={false} />
        <ProgressDialog hide={!fetching} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({attendance: {error, fetching}, user: {profile: {kids = [], name: {first = '', last = ''} = {}}} = {}}) => {
  const students = kids.map((item) => {
    const {kid: {name: {first = '', last = ''} = {}, section: {teacher: {name: {first: teacherFirst = '', last: teacherLast = ''} = {}} = {}} = {}, _id: kidId = ''} = {}, section = ''} = item
    return {name: `${first} ${last}`, kidId, section, teacher: `${teacherFirst} ${teacherLast}`}
  })
  const parentName = `${first} ${last}`
  return {error, fetching, students, parentName}
}

const mapDispatchToProps = (dispatch) => {
  return {
    attendanceRequest: (data) => dispatch(AttendanceActions.attendanceRequest(data)),
    editAttendanceRequest: (attendanceId, data) => dispatch(AttendanceActions.editAttendance(attendanceId, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceRequest)
