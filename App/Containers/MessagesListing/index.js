import styles from './styles'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { Platform, SafeAreaView, FlatList, StatusBar, View, AsyncStorage } from 'react-native'

import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import UserHeader from '../../Components/UserHeader'
import MessageItem from '../../Components/MessageItem'
import MessagesActions from '../../Redux/MessagesRedux'
import NotificationsActions from '../../Redux/NotificationsRedux'
import AnimatedAlert from '../../Components/AnimatedAlert'
import ListingHeader from '../../Components/ListingHeader'
import { ProgressDialog } from '../../Components/ProgressDialog'
import ListFooterLoading from '../../Components/ListFooterLoading'
import { SegmentedControl } from '../../Components/SegmentedControl'
import { STATUS } from '../../Constants/Constants'

const values = [I18n.t('unRead'), I18n.t('read')]

class MessagesListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      showDialog: false,
      selectedTab: 0
    }
  }

  componentWillReceiveProps ({fetching, error}) {
    const {refreshing} = this.state
    if ((refreshing && !fetching && fetching !== this.props.fetching) ||
      (error && this.props.error !== error)) {
      this.setState({refreshing: false})
    }
  }

  renderListItem = ({item}) => {
    const {message: {_id: messageId = ''}} = item
    return <MessageItem item={item} onPress={() => this.onItemPress(messageId)} />
  }

  onItemPress = (messageId: string) => {
    const {messagesCount, setMessageCount} = this.props
    const {selectedTab} = this.state
    let unRead = false
    if (messagesCount > 0 && selectedTab === 0) {
      setMessageCount(messagesCount - 1)
      unRead = true
    }
    Actions.messageDetails({
      messageId,
      unRead
    })
  }

  onRefresh= () => {
    const {getMessages} = this.props
    this.setState({refreshing: true})
    getMessages({status: this.getStatus(), pageNo: 1})
  }

  getStatus = () => {
    const {selectedTab} = this.state
    return selectedTab === 0 ? STATUS.NEW : STATUS.READ
  }

  onReachEnd = () => {
    const {getMessages, hasNoMore, pageNo, fetching} = this.props
    const status = this.getStatus()
    if (!fetching && !hasNoMore) {
      getMessages({status, pageNo})
    }
  }

  renderFooter = () => {
    const {pageNo, fetching} = this.props
    const {refreshing} = this.state
    return <ListFooterLoading pageNo={pageNo} fetching={fetching} refreshing={refreshing} />
  }

  onTabPress = (index: number) => {
    const {getMessages, clearMessagesList} = this.props
    this.setState({
      selectedTab: index
    })
    setTimeout(() => {
      const status = this.getStatus()
      clearMessagesList()
      AsyncStorage.setItem('messageSegment', status)
      getMessages({status, pageNo: 1})
    }, 100)
  };

  render () {
    const {fetching, messages, pageNo} = this.props
    const {refreshing, selectedTab} = this.state
    return (
      <SafeAreaView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <View style={styles.iphoneXTopView} /> : null}
        <LinearGradient style={styles.gradient} start={{x: 0, y: 1}} end={{x: 0.5, y: 0}}
          colors={[Colors.primary3, Colors.lightTheme, Colors.lightTheme]}>
          <StatusBar translucent backgroundColor={'transparent'} />
          <UserHeader title={I18n.t('messages')} />
          <ListingHeader heading={I18n.t('incoming')} />
          <View style={styles.tabsContainer}>
            <SegmentedControl onChange={this.onTabPress} selectedIndex={selectedTab} values={values} />
          </View>
          <FlatList
            extraData={this.props}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            onEndReachedThreshold={0.01}
            onEndReached={this.onReachEnd}
            renderItem={this.renderListItem}
            data={messages}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={(item = {}, index) => item._id || index}
            ListEmptyComponent={<AnimatedAlert show={!fetching} title={I18n.t('noMessages')} />}
          />
        </LinearGradient>
        <ProgressDialog hide={parseInt(pageNo) > 1 || !fetching || refreshing} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({messages: {fetching, hasNoMore, pageNo, error, messages = []} = {}, notifications: { messagesCount } = {}}) => {
  return {
    fetching, hasNoMore, pageNo, error, messages, messagesCount
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (params) => dispatch(MessagesActions.getMessages(params)),
    clearMessagesList: () => dispatch(MessagesActions.clearMessagesList()),
    setMessageCount: (messageCount) => dispatch(NotificationsActions.setMessageCount(messageCount))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesListing)
