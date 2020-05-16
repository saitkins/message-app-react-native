import styles from './styles'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {Actions} from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { FlatList, Platform, SafeAreaView, StatusBar, View } from 'react-native'

import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import UserHeader from '../../Components/UserHeader'
import { getAttendanceType } from '../../Lib/Utilities'
import AnimatedAlert from '../../Components/AnimatedAlert'
import ListingHeader from '../../Components/ListingHeader'
import AttendanceItem from '../../Components/AttendanceItem'
import AttendanceActions from '../../Redux/AttendanceRedux'
import ReminderDialog from '../../Components/ReminderDialog'
import { ProgressDialog } from '../../Components/ProgressDialog'
import ListFooterLoading from '../../Components/ListFooterLoading'
import AttendanceListingTabs from '../../Components/AttendanceListingTabs'

class AttendanceListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false,
      all: true,
      absence: false,
      lateDrop: false,
      refreshing: false,
      earlyPickup: false,
      attendanceId: ''
    }
  }

  componentDidMount () {
    this.props.clearAttendanceList()
  }

  deleteAttendanceItem = () => {
    const {attendanceId} = this.state
    this.props.deleteAttendance(attendanceId)
    this.setState({showDialog: false})
  }

  renderListItem = ({item}) => {
    const {_id: attendanceId = '', status = ''} = item
    const notNew = status !== 'NEW'
    return <AttendanceItem onPress={() => notNew ? Actions.attendanceDetails({attendanceId}) : Actions.attendanceRequest({item, edit: true})} onDelete={() => this.setState({attendanceId, showDialog: true})} item={item} />
  }

  componentWillReceiveProps ({fetching, error}) {
    const {refreshing} = this.state
    if ((refreshing && !fetching && fetching !== this.props.fetching) ||
      (error && this.props.error !== error)) {
      this.setState({refreshing: false})
    }
  }

  onChangeTab = (all, absence, earlyPickup, lateDrop) => {
    const {clearAttendanceList, getAttendances} = this.props
    const attendanceType = getAttendanceType(all, absence, earlyPickup)
    clearAttendanceList()
    getAttendances({attendanceType, pageNo: 1})
    this.setState({all, absence, earlyPickup, lateDrop})
  }

  onRefresh= () => {
    const {all, absence, earlyPickup} = this.state
    const attendanceType = getAttendanceType(all, absence, earlyPickup)
    const {getAttendances} = this.props
    this.setState({refreshing: true})
    getAttendances({pageNo: 1, attendanceType})
  }

  onReachEnd = () => {
    const {all, absence, earlyPickup} = this.state
    const {getAttendances, hasNoMore, pageNo, fetching} = this.props
    const attendanceType = getAttendanceType(all, absence, earlyPickup)
    if (!fetching && !hasNoMore) {
      getAttendances({pageNo, attendanceType})
    }
  }

  renderFooter = () => {
    const {pageNo, fetching} = this.props
    const {refreshing} = this.state
    return <ListFooterLoading pageNo={pageNo} fetching={fetching} refreshing={refreshing} />
  }

  attendanceRequest = () => {
    Actions.attendanceRequest()
  }

  render () {
    const {fetching, deleting, attendanceList, pageNo} = this.props
    const {refreshing, showDialog, absence, all, earlyPickup, lateDrop} = this.state
    const tabs = {absence, all, earlyPickup, lateDrop}
    return (
      <SafeAreaView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <View style={styles.iphoneXTopView} /> : null}
        <LinearGradient style={styles.gradient} start={{x: 0, y: 1}} end={{x: 0.5, y: 0}}
          colors={[Colors.primary3, Colors.lightTheme, Colors.lightTheme]}>
          <StatusBar translucent backgroundColor={'transparent'} />
          <UserHeader title={I18n.t('attendance')} />
          <ListingHeader heading={I18n.t('history')} onPress={this.attendanceRequest} showAction />
          <View style={styles.tabsContainer}>
            <AttendanceListingTabs tabs={tabs} onChangeTab={this.onChangeTab} />
          </View>
          <FlatList
            data={attendanceList}
            extraData={this.props}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            onEndReachedThreshold={0.01}
            onEndReached={this.onReachEnd}
            renderItem={this.renderListItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item = {}, index) => item._id || index}
            ListEmptyComponent={<AnimatedAlert show={!fetching} title={I18n.t('noHistory')} />}
          />
        </LinearGradient>
        <ProgressDialog hide={(parseInt(pageNo) > 1 || refreshing || !fetching) && !deleting} />
        {showDialog && <ReminderDialog
          acceptTitle={I18n.t('yes')}
          rejectTitle={I18n.t('no')}
          message={I18n.t('deleteMessage')}
          showMore={false}
          onAccept={this.deleteAttendanceItem}
          onReject={() => this.setState({showDialog: false})}
        /> }
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({attendance: {error, fetching, deleting, pageNo, hasNoMore, attendanceList}}) => {
  return {error, fetching, deleting, pageNo, hasNoMore, attendanceList}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAttendances: (params) => dispatch(AttendanceActions.getAttendance(params)),
    clearAttendanceList: () => dispatch(AttendanceActions.clearAttendanceList()),
    deleteAttendance: (attendanceId) => dispatch(AttendanceActions.deleteAttendance(attendanceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceListing)
