import { connect } from 'react-redux'
import React, { Component } from 'react'
import Immutable from 'seamless-immutable'
import {Actions} from 'react-native-router-flux'
import { AsyncStorage, SafeAreaView, ScrollView, StatusBar, Text, View, TouchableOpacity } from 'react-native'

import I18n from '../../I18n'
import styles from './styles'
import Colors from '../../Themes/Colors'
import ConfigActions from '../../Redux/ConfigRedux'
import CheckBoxGroup from '../../Components/CheckBoxGroup'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import FullButton from '../../Components/FullButton'
import CalendarActions from '../../Redux/CalendarRedux'
import MealsActions from '../../Redux/MealsRedux'
import UserActions from '../../Redux/UserRedux'
import MessagesActions from '../../Redux/MessagesRedux'
import AttendanceActions from '../../Redux/AttendanceRedux'
import NotificationsActions from '../../Redux/NotificationsRedux'
import { showMessage } from '../../Lib/Utilities'
import AnimatedAlert from '../../Components/AnimatedAlert'
import CheckBox from '../../Components/CheckBox'
import { STATUS } from '../../Constants/Constants'

class FilterSchools extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false,
      selectedSchools: Immutable.asMutable(props.schoolIds) || []
    }
  }

  componentDidMount () {
    this.props.getProfile()
  }

  renderTitle = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{I18n.t('filters')}</Text>
      </View>
    )
  }

  onSelectSchool = (selectedSchool) => {
    let newArr = this.state.selectedSchools
    if (newArr.includes(selectedSchool)) {
      const index = newArr.findIndex((item) => item === selectedSchool)
      newArr.splice(index, 1)
    } else {
      newArr.push(selectedSchool)
    }
    this.setState({selectedSchools: newArr})
  }

  isAllSelected = () => {
    const {selectedSchools} = this.state
    const {schools} = this.props
    return selectedSchools.length === schools.length
  }

  selectAll = () => {
    const {schools} = this.props
    let newArr = []
    if (!this.isAllSelected()) {
      newArr = schools.map(x => x._id)
    }
    this.setState({selectedSchools: newArr})
  }

  renderSelectAllFilter = () => {
    const isAllSelected = this.isAllSelected()
    const title = I18n.t(this.isAllSelected() ? 'unSelectAll' : 'selectAll')
    return (
      <TouchableOpacity style={styles.filterContainer} onPress={this.selectAll}>
        <View style={styles.filterInnerContainer}>
          <CheckBox isFilter checked={isAllSelected} fillColor={Colors.snow} tickColor={Colors.themeColor} toggleCheck={this.selectAll} />
          <Text style={styles.filterTitle}>{title}</Text>
        </View>
        <View style={styles.horizontalLine} />
      </TouchableOpacity>
    )
  }

  renderFilters = () => {
    const {selectedSchools} = this.state
    const {schools} = this.props
    return (
      <CheckBoxGroup selectedIndex={selectedSchools} options={schools} onValueChanged={this.onSelectSchool} />
    )
  }

  applyFilters = () => {
    const {selectedSchools} = this.state
    const {setHeaders, getEvents, getReminders, getAttendances, getMealEvents, getMessages} = this.props
    setHeaders(selectedSchools, this.isAllSelected())
    getEvents()
    AsyncStorage.getItem('reminderSegment').then(tab => {
      let tabType = tab
      if (tabType === null || tabType === '') {
        tabType = STATUS.NEW
      }
      getReminders({status: tabType, pageNo: 1})
    })
    getMealEvents()
    AsyncStorage.getItem('messageSegment').then(tab => {
      let tabType = tab
      if (tabType === null || tabType === '') {
        tabType = STATUS.NEW
      }
      getMessages({status: tabType, pageNo: 1})
    })
    AsyncStorage.getItem('currentTab').then(tab => {
      let attendanceType = ''
      if (tab !== null) {
        attendanceType = tab === 'all' ? '' : tab
      }
      getAttendances({attendanceType, pageNo: 1})
    })
    Actions.pop()
    showMessage(I18n.t('filtersApplied'))
  }

  render () {
    const {fetching, schools} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <EventDetailsHeader fetching={false} showReminder={false} showFavourite={false} />
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {this.renderTitle()}
          <AnimatedAlert show={!fetching && schools.length === 0} color={Colors.frost} title={I18n.t('noSchoolAdded')} />
          {schools.length > 0 && this.renderSelectAllFilter()}
          {this.renderFilters()}
          {schools.length > 0 && <FullButton text={I18n.t('applyFilters')} onPress={this.applyFilters} /> }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({user: {error, fetching, profile: {kids = []} = {}}, config: {schoolIds = []}}) => {
  let schools = []
  kids.forEach((item) => {
    const {school: {_id: schoolId = '', name: title = ''}} = item
    schools.push({_id: schoolId, title})
  })
  schools = schools.filter((s1, pos, arr) => arr.findIndex((s2) => s2._id === s1._id) === pos)
  return {error, fetching, schools, schoolIds}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(UserActions.getProfile()),
    setHeaders: (schoolIds, allSelected) => dispatch(ConfigActions.setHeaders(schoolIds, allSelected)),
    getEvents: () => dispatch(CalendarActions.getEvents()),
    getMealEvents: () => dispatch(MealsActions.getMealEvents()),
    getReminders: (params) => dispatch(UserActions.getReminders(params)),
    getMessages: (params) => dispatch(MessagesActions.getMessages(params)),
    getAttendances: (params) => dispatch(AttendanceActions.getAttendance(params)),
    fetchNotificationsCount: () => dispatch(NotificationsActions.getNotificationsCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSchools)
