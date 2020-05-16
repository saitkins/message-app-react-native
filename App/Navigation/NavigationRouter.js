import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { Actions, Router, Scene, Stack, Tabs } from 'react-native-router-flux'
import { isEmpty } from 'ramda'
import styles from './Styles/NavigationContainerStyle'
import TabIcon from '../Components/TabIcon'
import CustomWebview from '../Components/CustomWebview'
import { Colors } from '../Themes'
import Calendars from '../Containers/Calendars'
import AccountSettings from '../Containers/AccountSettings'
import EventDetails from '../Containers/EventDetails'
import I18n from '../I18n'
import Meals from '../Containers/Meals'
import MealDetails from '../Containers/MealDetails'
import MessageDetails from '../Containers/MessageDetails'
import AttendanceDetails from '../Containers/AttendanceDetails'
import FilterSchools from '../Containers/FilterSchools'
import LoginScreen from '../Containers/LoginScreen'
import ForgotPassword from '../Containers/ForgotPassword'
import AttendanceListing from '../Containers/AttendanceListing'
import RemindersListing from '../Containers/RemindersListing'
import ProfileScreen from '../Containers/ProfileScreen'
import EditProfile from '../Containers/EditProfile'
import MessagesListing from '../Containers/MessagesListing'
import NotificationsListing from '../Containers/NotificationsListing'
import AttendanceRequest from '../Containers/AttendanceRequest'
import Defaults from '../Config/ElementDefaults'
import TextConfig from '../Config/ElementDefaults/defaultStyles'
import ChangePassword from '../Containers/ChangePassword/index'
import CalendarActions from '../Redux/CalendarRedux'
import MealsActions from '../Redux/MealsRedux'
import UserActions from '../Redux/UserRedux'
import ConfigActions from '../Redux/ConfigRedux'
import AttendanceActions from '../Redux/AttendanceRedux'
import firebase from 'react-native-firebase'
import Notification from '../Lib/Notification'
import SubmitAppIdea from '../Containers/SubmitAppIdea'
import AboutUs from '../Containers/AboutUs'
import MessagesActions from '../Redux/MessagesRedux'
import NotificationsActions from '../Redux/NotificationsRedux'
import { setBadge } from '../Lib/Utilities'
import { STATUS } from '../Constants/Constants'

Defaults.loadGlobalTextProps(TextConfig.customTextProps)
Defaults.loadGlobalInputTextProps(TextConfig.customTextInputProps)

// export const navigationMiddleware = createReactNavigationReduxMiddleware(state => state.nav)
class NavigationRouter extends Component {
  constructor (props) {
    super(props)
    AsyncStorage.setItem('currentTab', 'all')
  }

  componentWillMount () {
    const {fetchNotificationsCount} = this.props
    this.interval = setInterval(() => {
      const {authToken} = this.props
      if (authToken) {
        fetchNotificationsCount()
      }
    }, 60000)
  }

  async componentDidMount () {
    const {setDeviceToken} = this.props
    Notification.configure(setDeviceToken)
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(token => {
      Notification.onTokenRefresh(token)
      setDeviceToken(token)
    })
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      this.handlePushNotification(notification, false)
    })
    this.notificationOpenListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      this.handlePushNotification(notificationOpen.notification, true)
    })
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      this.handlePushNotification(notificationOpen.notification, true)
    }
  }

  handlePushNotification = (notification, wasAppClosed) => {
    // console.tron.warn({notification, msg: 'Push received', wasAppClosed})
    setTimeout(() => {
      const {authToken} = this.props
      if (wasAppClosed) {
        Notification.onNotification(notification, !isEmpty(authToken))
      }
      setBadge(0)
    }, 1000)
  }

  shouldComponentUpdate () {
    return false
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.onTokenRefreshListener()
    this.notificationListener()
    this.notificationOpenListener()
  }
  getCalendarEvents = () => {
    Actions.tab1()
    const {getEvents} = this.props
    getEvents()
  }
  getRemindersListing = () => {
    Actions.tab2()
    const {getReminders} = this.props
    AsyncStorage.getItem('reminderSegment').then(tab => {
      let tabType = tab
      if (tabType === null || tabType === '') {
        tabType = STATUS.NEW
      }
      getReminders({status: tabType, pageNo: 1})
    })
  }
  getAttendanceListing = () => {
    Actions.tab3()
    const {getAttendances} = this.props
    AsyncStorage.getItem('currentTab').then(tab => {
      let attendanceType = ''
      if (tab !== null) {
        attendanceType = tab === 'all' ? '' : tab
      }
      getAttendances({attendanceType, pageNo: 1})
    })
  }
  getMealEvents = () => {
    Actions.tab4()
    const {getMealEvents} = this.props
    getMealEvents()
  }
  getMessages = () => {
    Actions.tab5()
    const {getMessages} = this.props
    AsyncStorage.getItem('messageSegment').then(tab => {
      let tabType = tab
      if (tabType === null || tabType === '') {
        tabType = STATUS.NEW
      }
      getMessages({status: tabType, pageNo: 1})
    })
  }

  render () {
    return <Router
      headerMode='screen'
      navigationBarStyle={styles.navBarStyle}
      titleStyle={styles.navBarTextScreens}
      backButtonTintColor={Colors.snow}>
      <Stack key='root' headerMode='screen'>
        <Scene
          key='webView'
          component={CustomWebview}
          hideNavBar
          titleStyle={styles.navBarTextTabs} />
        <Scene
          initial
          hideNavBar
          key='login'
          component={LoginScreen} />
        <Scene
          hideNavBar
          key='forgotPassword'
          component={ForgotPassword} />
        <Scene
          hideNavBar
          key='eventDetails'
          component={EventDetails} />
        <Scene
          hideNavBar
          key='messageDetails'
          component={MessageDetails} />
        <Scene
          hideNavBar
          key='attendanceDetails'
          component={AttendanceDetails} />
        <Scene
          hideNavBar
          key='filterSchools'
          component={FilterSchools} />
        <Scene
          hideNavBar
          key='profile'
          component={ProfileScreen} />
        <Scene
          hideNavBar
          key='editProfile'
          component={EditProfile} />
        <Scene
          hideNavBar
          key='notifications'
          component={NotificationsListing} />
        <Scene
          hideNavBar
          key='accountSettings'
          component={AccountSettings} />
        <Scene
          hideNavBar
          key='changePassword'
          component={ChangePassword} />
        <Scene
          hideNavBar
          key='mealDetails'
          component={MealDetails} />
        <Scene
          hideNavBar
          key='attendanceRequest'
          component={AttendanceRequest} />
        <Scene
          hideNavBar
          key='submitAppIdea'
          component={SubmitAppIdea} />
        <Scene
          hideNavBar
          key='aboutUs'
          component={AboutUs} />
        <Tabs
          hideNavBar
          key='tabbar'
          showLabel={false}
          tabBarPosition={'bottom'}
          tabBarStyle={styles.tabBar}
          tabStyle={styles.tabBarIcon}
          titleStyle={styles.navBarTextTabs}>
          <Scene
            key='tab1'
            hideNavBar
            icon={TabIcon}
            iconName={'calendar'}
            component={Calendars}
            title={I18n.t('calendar')}
            tabBarOnPress={this.getCalendarEvents} />
          <Scene
            key='tab2'
            hideNavBar
            icon={TabIcon}
            iconName={'reminders'}
            title={I18n.t('reminders')}
            component={RemindersListing}
            tabBarOnPress={this.getRemindersListing} />
          <Scene
            key='tab3'
            hideNavBar
            icon={TabIcon}
            iconName={'attendance'}
            component={AttendanceListing}
            title={I18n.t('attendance')}
            tabBarOnPress={this.getAttendanceListing} />
          <Scene
            key='tab4'
            hideNavBar
            icon={TabIcon}
            iconName='meals'
            component={Meals}
            title={I18n.t('meals')}
            tabBarOnPress={this.getMealEvents} />
          <Scene
            key='tab5'
            hideNavBar
            icon={TabIcon}
            iconName='messages'
            component={MessagesListing}
            title={I18n.t('messages')}
            tabBarOnPress={this.getMessages}
          />
        </Tabs>
      </Stack>
    </Router>
  }
}

const mapStateToProps = ({auth: {fetching, user: {authToken} = {}}}) => {
  return {authToken}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => dispatch(CalendarActions.getEvents()),
    getMealEvents: () => dispatch(MealsActions.getMealEvents()),
    getReminders: (params) => dispatch(UserActions.getReminders(params)),
    getMessages: (params) => dispatch(MessagesActions.getMessages(params)),
    setDeviceToken: (token) => dispatch(ConfigActions.setDeviceToken(token)),
    clearAttendanceList: () => dispatch(AttendanceActions.clearAttendanceList()),
    getAttendances: (params) => dispatch(AttendanceActions.getAttendance(params)),
    fetchNotificationsCount: () => dispatch(NotificationsActions.getNotificationsCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
