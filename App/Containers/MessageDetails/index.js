import moment from 'moment'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Linking, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import styles from './styles'
import Colors from '../../Themes/Colors'
import CustomIcon from '../../Components/Icons/CustomIcons'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import MessagesActions from '../../Redux/MessagesRedux'
import { ProgressDialog } from '../../Components/ProgressDialog'

class MessageDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false
    }
  }

  componentDidMount () {
    const {messageId = '', getMessageDetails, unRead} = this.props
    getMessageDetails(messageId, unRead)
  }

  renderTitleDescription = () => {
    const {messageDetails: {from = ''}} = this.props
    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{typeof from === 'string' && from}</Text>
      </View>
    )
  }

  renderDateTime = () => {
    const {messageDetails: {createdAt = ''} = {}} = this.props
    return (
      <View style={styles.detailItem}>
        <CustomIcon name={'date'} style={styles.detailsItemIcon} />
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateRow}>
            <Text style={styles.labelText}>{I18n.t('date')}</Text>
            <Text style={styles.itemValue}>{moment(createdAt).format('MMMM DD, YYYY')}</Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.labelText}>{I18n.t('time')}</Text>
            <Text style={styles.itemValue}>{moment(createdAt).format('hh:mm A')}</Text>
          </View>
        </View>
      </View>
    )
  }

  openLink = (link: string) => {
    Linking.openURL(link)
  };

  render () {
    const {messageDetails: {message: {content = ''} = {}}, fetching, success} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <EventDetailsHeader fetching={false} showReminder={false} showFavourite={false} />
        {!fetching && success && <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {this.renderTitleDescription()}
          {this.renderDateTime()}
          <View style={styles.messageContainer}>
            <Text style={styles.itemValue}>Message</Text>
            <Hyperlink
              linkStyle={{ color: Colors.linkColor }}
              onPress={(url) => this.openLink(url)}
            >
              <Text style={styles.message}>{content}</Text>
            </Hyperlink>
          </View>
        </ScrollView> }
        <ProgressDialog hide={!fetching} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({messages: {fetching, success, error, messageDetails}}) => {
  return {
    fetching, error, success, messageDetails
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMessageDetails: (messageId, unRead) => dispatch(MessagesActions.getMessageDetails(messageId, unRead))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageDetails)
