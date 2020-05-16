import moment from 'moment'
import I18n from '../../I18n'
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'

import styles from './styles'
import Colors from '../../Themes/Colors'
import CustomIcon from '../../Components/Icons/CustomIcons'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import { titleCase } from '../../Lib/Utilities'
import { ATTENDANCE_TYPE, DATE_FORMATS } from '../../Lib/AppConstants'
import { isEmpty } from 'ramda'
import { connect } from 'react-redux'
import AttendanceActions from '../../Redux/AttendanceRedux'
import { ProgressDialog } from '../../Components/ProgressDialog'

class AttendanceDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false
    }
  }

  componentDidMount (): void {
    const {attendanceId, getAttendanceDetails} = this.props
    getAttendanceDetails(attendanceId)
  }

  renderTitleDescription = () => {
    const {attendanceDetails: {type = '', student: {name: {first = '', last = ''} = {}} = {}, reason = ''}} = this.props
    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{`${first} ${last}`}</Text>
        <Text style={styles.reason}>{`${titleCase(reason)} (${ATTENDANCE_TYPE[type]})`}</Text>
      </View>
    )
  }

  renderDetails = () => {
    const {attendanceDetails: {startDate = '', endDate = '', dropOffTime = '', pickupTime = '', type = ''}} = this.props
    const time = dropOffTime || pickupTime || ''
    const timeLabel = dropOffTime ? 'Drop Off Time' : 'Pickup Time'
    return (
      <View style={styles.detailItem}>
        <CustomIcon name={'date'} style={styles.detailsItemIcon} />
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateRow}>
            <Text style={styles.labelText}>{I18n.t('startDate')}</Text>
            <Text style={styles.itemValue}>{moment(startDate).format('MMMM DD, YYYY')}</Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.labelText}>{I18n.t('endDate')}</Text>
            <Text style={styles.itemValue}>{moment(endDate).format('MMMM DD, YYYY')}</Text>
          </View>
          {type !== 'ABSENCE' && <View style={styles.timeRow}>
            <Text style={styles.labelText}>{timeLabel}</Text>
            <Text style={styles.itemValue}>{moment(time).format(DATE_FORMATS.timeFormat)}</Text>
          </View>}
        </View>
      </View>
    )
  }

  renderDetailsRow = (label, value) => {
    return (
      <View style={styles.detailItem}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.itemValue}>{value}</Text>
        </View>
      </View>
    )
  }

  render () {
    const {attendanceDetails: {notes = '', reason = '', teacher: {fullName: teacherName = ''} = {}}, fetching, parentName} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <EventDetailsHeader fetching={false} showReminder={false} showFavourite={false} />
        {!fetching && <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {this.renderTitleDescription()}
          {this.renderDetails()}
          <View style={styles.moreInfoContainer}>
            {this.renderDetailsRow(I18n.t('teacher'), teacherName)}
            {this.renderDetailsRow(I18n.t('reason'), titleCase(reason))}
            {this.renderDetailsRow('Submitted by', parentName)}
            {!isEmpty(notes) && <View style={styles.notesContainer}>
              <Text style={styles.itemValue}>Notes</Text>
              <Text style={styles.notes}>{notes}</Text>
            </View>}
          </View>
        </ScrollView>}
        <ProgressDialog hide={!fetching} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({user: {profile: {name: {first = '', last = ''} = {}}} = {}, attendance: {error, fetching, attendanceDetails = {}}}) => {
  const parentName = `${first} ${last}`
  return {parentName, attendanceDetails, fetching}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAttendanceDetails: (attendanceId) => dispatch(AttendanceActions.getAttendanceDetails(attendanceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceDetails)
