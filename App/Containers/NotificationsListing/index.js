import styles from './styles'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import Colors from '../../Themes/Colors'
import React, { Component } from 'react'
import AnimatedAlert from '../../Components/AnimatedAlert'
import NotificationsActions from '../../Redux/NotificationsRedux'
import { FlatList, SafeAreaView, StatusBar } from 'react-native'
import NotificationItem from '../../Components/NotificationItem'
import { ProgressDialog } from '../../Components/ProgressDialog'
import ListFooterLoading from '../../Components/ListFooterLoading'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import { Actions } from 'react-native-router-flux'
import { NOTIFICATION_TYPE } from '../../Constants/Constants'
import { isEmpty } from 'lodash'

class NotificationsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  componentDidMount () {
    const {fetchNotifications} = this.props
    fetchNotifications({pageNo: 1})
  }

  componentWillReceiveProps ({fetching, error}) {
    const {refreshing} = this.state
    if ((refreshing && !fetching && fetching !== this.props.fetching) ||
      (error && this.props.error !== error)) {
      this.setState({refreshing: false})
    }
  }

  onItemPress = (item) => {
    const {type = '', event: {_id: eventId = ''} = {}} = item
    if (type === NOTIFICATION_TYPE.NEW_EVENT) {
      Actions.eventDetails({eventId: eventId})
    } else if (type === NOTIFICATION_TYPE.MEAL) {
      Actions.mealDetails({mealId: eventId})
    } else if (type === NOTIFICATION_TYPE.KID_ADDED) {
      Actions.profile()
    }
  }

  onRefresh = () => {
    const {fetchNotifications} = this.props
    this.setState({refreshing: true})
    fetchNotifications({pageNo: 1})
  }

  onReachEnd = () => {
    const {fetchNotifications, hasNoMore, pageNo, fetching} = this.props
    if (!fetching && !hasNoMore) {
      fetchNotifications({pageNo})
    }
  }

  renderFooter = () => {
    const {pageNo, fetching} = this.props
    const {refreshing} = this.state
    return <ListFooterLoading refreshing={refreshing} fetching={fetching} pageNo={pageNo} />
  }

  _keyExtractor = (item = {}, index) => item && item._id ? item._id : index

  renderItem = ({item}, index) => {
    const {parentName} = this.props
    if (isEmpty(item)) {
      return
    }
    return <NotificationItem item={item} parentName={parentName} onPress={() => this.onItemPress(item)} />
  }

  render () {
    const {notifications, fetching, pageNo} = this.props
    const {refreshing} = this.state
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <EventDetailsHeader title={I18n.t('notifications')} fetching />
        <FlatList
          data={notifications}
          extraData={this.props}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.01}
          onEndReached={this.onReachEnd}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<AnimatedAlert color={Colors.frost} show={!fetching} title={I18n.t('noNotifications')} />}
        />
        <ProgressDialog hide={parseInt(pageNo) > 1 || !fetching || refreshing} />
      </SafeAreaView>
    )
  }
}
const mapStateToProps = ({notifications: {notifications = [], fetching, error, pageNo = 1, hasNoMore} = {}}, props) => {
  return {
    notifications, fetching, error, pageNo, hasNoMore
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: (params) => dispatch(NotificationsActions.getNotifications(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)
