import moment from 'moment'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { Image, ImageBackground, Linking, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'

import styles from './styles'
import Colors from '../../Themes/Colors'
import { DATE_FORMATS, EVENT_ORGANIZER } from '../../Lib/AppConstants'
import CalendarActions from '../../Redux/CalendarRedux'
import CustomIcon from '../../Components/Icons/CustomIcons'
import ReminderDialog from '../../Components/ReminderDialog'
import { ProgressDialog } from '../../Components/ProgressDialog'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import { titleCase } from '../../Lib/Utilities'
import Images from '../../Themes/Images'

class EventDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false
    }
  }

  componentDidMount () {
    const {eventId} = this.props
    this.props.getEventDetails(eventId)
  }

  likeEvent = () => {
    const {eventDetails: {_id = '', liked = false} = {}, likeEvent} = this.props
    !liked && this.setState({showDialog: true})
    likeEvent({eventId: _id, action: 'like'})
  }

  setReminder = () => {
    const {eventDetails: {_id = ''} = {}, likeEvent} = this.props
    likeEvent({eventId: _id, action: 'remind'})
  }

  renderTitleDescription = () => {
    const { eventDetails: {name = '', eventImg = null, school: {name: schoolName = ''} = {}} = {}, fetching, success } = this.props
    return (
      <ImageBackground source={{uri: isEmpty(eventImg) ? '' : eventImg}} style={[styles.headerImage, isEmpty(eventImg) && styles.headerHeight]}>
        {!fetching && success && <View style={styles.descriptionContainer}>
          <View style={[styles.backgroundTint, isEmpty(eventImg) && styles.transBackground]}>
            <Text style={[styles.title, isEmpty(eventImg) && styles.blackText]}>{name}</Text>
          </View>
          <Text style={styles.schoolName}>{schoolName}</Text>
          {isEmpty(eventImg) && <View style={styles.borderLine} />}
        </View>}
      </ImageBackground>
    )
  }

  renderDetailsRow = (label, iconName, value) => {
    let formattedValue = value
    if (label === 'Type') {
      formattedValue = titleCase(value)
    }
    return !isEmpty(value) ? (
      <View style={styles.detailItem}>
        {iconName === 'reminders' ? <Image source={Images.reminders} style={styles.reminderIcon} />
          : <CustomIcon name={iconName} style={styles.detailsItemIcon} />}
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.itemValue}>{formattedValue}</Text>
        </View>
      </View>
    ) : null
  }

  renderUrl = (label, url = null, deadline, icon) => {
    return !isEmpty(url) ? (
      <View style={styles.urlContainer}>
        <CustomIcon name={icon} style={styles.urlIcon} />
        <View style={styles.linkContainer}>
          <View style={styles.urlHeading}>
            <Text style={styles.urlValue}>{label}</Text>
            {!isEmpty(deadline) ? <Text
              style={styles.deadline}>{I18n.t('deadline') + moment(deadline).format(DATE_FORMATS.slashDate)}</Text>
              : <View style={styles.itemValue} />}
          </View>
          <Text style={styles.url}
            onPress={() => Linking.openURL(url).catch((error) => console.tron.warn(error))}>{url}</Text>
        </View>
      </View>
    ) : null
  }

  renderDateTime = () => {
    const {eventDetails: {startDate = '', endDate = '', allDay = false} = {}} = this.props
    const time = moment(startDate).format(DATE_FORMATS.timeFormat1) + ' - ' + moment(endDate).format(DATE_FORMATS.timeFormat1)
    const days = moment(endDate).diff(new Date(startDate), 'days', true)
    const dateText = days >= 1 ? `${moment(startDate).format(DATE_FORMATS.monthFormat)} - ${moment(endDate).format(DATE_FORMATS.monthFormat)}` : moment(startDate).format(DATE_FORMATS.monthFormat)
    return (
      <View style={styles.detailItem}>
        <CustomIcon name={'date'} style={styles.detailsItemIcon} />
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateRow}>
            <Text style={styles.labelText}>{I18n.t('date')}</Text>
            <Text style={styles.itemValue}>{dateText}</Text>
          </View>
          { !allDay && <View style={styles.timeRow}>
            <Text style={styles.labelText}>{I18n.t('time')}</Text>
            <Text style={styles.itemValue}>{time}</Text>
          </View>}
        </View>
      </View>
    )
  }

  render () {
    const {showDialog} = this.state
    const {eventDetails: {location = '', description = '', liked = false, reminded = false, organizer = '', type = '', signUpDeadLine = '', signUpURL = '', moreInfoURL = '', website = ''} = {}, fetching, success, updating} = this.props
    const reminderSettings = reminded ? 'On' : 'Off'
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <EventDetailsHeader liked={liked} fetching={fetching} reminder={reminded} onPressRemind={this.setReminder}
          onPressFav={this.likeEvent} />
        {!fetching && success && <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderTitleDescription()}
          <View style={styles.scrollContainer}>
            <Text style={styles.description}>{description}</Text>
            {this.renderDateTime()}
            {this.renderDetailsRow(I18n.t('location'), 'location', location)}
            {this.renderDetailsRow(I18n.t('organizer'), 'organizer', EVENT_ORGANIZER[organizer])}
            {this.renderDetailsRow(I18n.t('type'), 'type', type)}
            {this.renderDetailsRow(I18n.t('reminder'), 'reminders', reminderSettings)}
            {this.renderUrl(I18n.t('signUpLink'), signUpURL, signUpDeadLine, 'link')}
            {this.renderUrl(I18n.t('website'), website, '', '')}
            {this.renderUrl(I18n.t('moreInfoLink'), moreInfoURL, '', '')}
          </View>
        </ScrollView>}
        {showDialog && !updating && <ReminderDialog
          acceptTitle={I18n.t('gotIt')}
          message={I18n.t(reminded ? 'lovedMessage' : 'reminderMessage')}
          onAccept={() => this.setState({showDialog: false})} />}
        <ProgressDialog hide={!fetching && !updating} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({calendar: {fetching, updating, success, error, eventDetails = {}}}) => {
  return {
    fetching, updating, error, eventDetails, success
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    likeEvent: (params) => dispatch(CalendarActions.likeEvent(params)),
    getEventDetails: (params) => dispatch(CalendarActions.getEventDetails(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
