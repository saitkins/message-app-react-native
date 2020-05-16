import { isEmpty } from 'ramda'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { Platform, SafeAreaView, FlatList, StatusBar, View, AsyncStorage } from 'react-native'

import styles from './styles'
import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import UserActions from '../../Redux/UserRedux'
import NotificationsActions from '../../Redux/NotificationsRedux'
import UserHeader from '../../Components/UserHeader'
import ReminderItem from '../../Components/RemindersItem'
import ListingHeader from '../../Components/ListingHeader'
import AnimatedAlert from '../../Components/AnimatedAlert'
import ReminderDialog from '../../Components/ReminderDialog'
import { ProgressDialog } from '../../Components/ProgressDialog'
import ListFooterLoading from '../../Components/ListFooterLoading'
import { SegmentedControl } from '../../Components/SegmentedControl'
import { STATUS } from '../../Constants/Constants'

const values = [I18n.t('unRead'), I18n.t('read')]

class RemindersListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 0,
      refreshing: false,
      showDialog: false,
      eventId: '',
      activeItem: ''
    }
  }

  componentWillReceiveProps ({fetching, error}) {
    const {refreshing} = this.state
    if ((refreshing && !fetching && fetching !== this.props.fetching) ||
      (error && this.props.error !== error)) {
      this.setState({refreshing: false})
    }
  }

  onRefresh= () => {
    const {getReminders} = this.props
    this.setState({refreshing: true})
    const status = this.getStatus()
    getReminders({status, pageNo: 1})
  }

  onSwipeItem = (activeItem) => {
    this.callMarkAsRead(activeItem)
  }

  callMarkAsRead = (activeItem) => {
    const {markAsRead} = this.props
    markAsRead(activeItem)
    this.setReminderCount()
  }

  changeSwipeItem = (item) => {
    const { activeItem } = this.state
    if (activeItem !== item) {
      this.setState({ activeItem: item })
    }
  }

  setReminderCount = () => {
    const {setReminderCount, remindersCount} = this.props
    if (remindersCount > 0) {
      setReminderCount(remindersCount - 1)
    }
  }

  onReachEnd = () => {
    const {getReminders, hasNoMore, pageNo, fetching} = this.props
    const status = this.getStatus()
    if (!fetching && !hasNoMore) {
      getReminders({status, pageNo})
    }
  }

  renderItem = ({item}) => {
    const {selectedTab} = this.state
    const {activeItem} = this.state
    if (isEmpty(item)) {
      return
    }
    const {_id: eventId = '', eventType = '', reminderId = '', reminderStatus} = item
    return <ReminderItem item={item} onRemind={() => { this.setState({showDialog: true, eventId}) }}
      onPress={() => {
        this.onItemPress(eventId, eventType, reminderStatus, reminderId)
      }} disabled={selectedTab === 1} onSwipeItem={() => this.onSwipeItem(reminderId)} changeSwipeItem={() => this.changeSwipeItem(reminderId)} activeItem={activeItem} />
  }

  onItemPress = (eventId, eventType, reminderStatus, reminderId) => {
    if (eventType === 'EVENT') {
      Actions.eventDetails({eventId})
    } else if (eventType === 'MEAL') {
      Actions.mealDetails({mealId: eventId})
    }
    if (reminderStatus === STATUS.NEW) {
      this.callMarkAsRead(reminderId)
      this.setReminderCount()
    }
  }

  deleteReminder = () => {
    const {eventId} = this.state
    const {deleteReminder} = this.props
    deleteReminder(eventId)
    this.setState({showDialog: false})
  }

  getStatus = () => {
    const {selectedTab} = this.state
    return selectedTab === 0 ? STATUS.NEW : STATUS.READ
  }

  renderFooter = () => {
    const {pageNo, fetching} = this.props
    const {refreshing} = this.state
    return <ListFooterLoading pageNo={pageNo} fetching={fetching} refreshing={refreshing} />
  }

  onTabPress = (index: number) => {
    const {getReminders, clearRemindersList} = this.props
    this.setState({
      selectedTab: index
    })
    setTimeout(() => {
      const status = this.getStatus()
      clearRemindersList()
      AsyncStorage.setItem('reminderSegment', status)
      getReminders({status, pageNo: 1})
    }, 100)
  };

  render () {
    const {showDialog, refreshing, selectedTab} = this.state
    const {pageNo, fetching, deleting, reminders, marking} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <View style={styles.iphoneXTopView} /> : null}
        <LinearGradient style={styles.gradient} start={{x: 0, y: 1}} end={{x: 0.5, y: 0}}
          colors={[Colors.primary3, Colors.lightTheme, Colors.lightTheme]}>
          <StatusBar translucent backgroundColor={'transparent'} />
          <UserHeader title={I18n.t('reminders')} />
          <ListingHeader heading={I18n.t('allEvents')} />
          <View style={styles.tabsContainer}>
            <SegmentedControl onChange={this.onTabPress} selectedIndex={selectedTab} values={values} />
          </View>
          <FlatList
            extraData={this.props}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            renderItem={this.renderItem}
            onEndReachedThreshold={0.01}
            onEndReached={this.onReachEnd}
            data={reminders}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={(item = {}, index) => item.id || index}
            ListEmptyComponent={<AnimatedAlert show={!fetching} title={I18n.t('noReminderSet')} />}
          />
        </LinearGradient>
        {showDialog && <ReminderDialog
          showMore={false}
          rejectTitle={I18n.t('keepOn')}
          onAccept={this.deleteReminder}
          acceptTitle={I18n.t('turnOff')}
          message={I18n.t('turnOffMessage')}
          onReject={() => this.setState({showDialog: false})}
        /> }
        <ProgressDialog hide={(parseInt(pageNo) > 1 || refreshing || !fetching) && !deleting && !marking} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({user: {fetching, marking, deleting, hasNoMore, pageNo, error, reminders = []}, notifications: { remindersCount } = {}}) => {
  return {
    fetching, deleting, hasNoMore, pageNo, error, reminders, marking, remindersCount
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getReminders: (params) => dispatch(UserActions.getReminders(params)),
    deleteReminder: (eventId) => dispatch(UserActions.deleteReminder(eventId)),
    markAsRead: (id) => dispatch(UserActions.markAsRead(id)),
    clearRemindersList: () => dispatch(UserActions.clearRemindersList()),
    setReminderCount: (reminderCount) => dispatch(NotificationsActions.setReminderCount(reminderCount))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RemindersListing)
