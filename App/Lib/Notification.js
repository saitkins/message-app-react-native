import firebase from 'react-native-firebase'
import {isEmpty} from 'lodash'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

const configure = (onTokenSuccess) => {
  firebase.messaging().hasPermission().then(enabled => {
    if (!enabled) {
      return firebase.messaging().requestPermission()
    }
  })
    .then(permissions => {
    //  console.tron.warn(permissions)
    })
    .catch(err => {
      console.tron.warn({perErr: err})
    })

  firebase.messaging().getToken()
    .then(token => {
      if (onTokenSuccess && typeof onTokenSuccess === 'function') {
        onTokenSuccess(token)
      }
      onTokenRefresh(token)
    })
}
const onNotification = (notification = {}, isLoggedIn: boolean = false) => {
  if (!isLoggedIn) {
    return
  }
  if (!isEmpty(notification) && notification._data) {
    const {_data: {messageId, eventType, eventId, attendanceId} = {}} = notification
    const timeDiff = moment().diff(moment(this.onPress), 'seconds')
    if (!this.onPress || timeDiff > 2) {
      this.onPress = moment()
      if (messageId) {
        Actions.messageDetails({
          messageId,
          type: 'jump'
        })
      } else if (eventType === 'EVENT') {
        Actions.eventDetails({
          eventId,
          type: 'jump'
        })
      } else if (eventType === 'MEAL') {
        Actions.mealDetails({
          mealId: eventId,
          type: 'jump'
        })
      } else if (attendanceId) {
        Actions.attendanceDetails({
          attendanceId,
          type: 'jump'
        })
      }
    }
  }
}
const onTokenRefresh = (token) => {
}

export default {configure, onNotification, onTokenRefresh}
