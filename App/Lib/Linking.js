// @flow
// Utility functions
import { Linking } from 'react-native'
import { isEmpty } from 'lodash'
import { Actions } from 'react-native-router-flux'
import { ROUTE_NAMES } from '../Constants/Constants'
import { WebUrl } from './AppConstants'
import AppConfig from '../Config/AppConfig'

export const addLinkingListener = () => {
  setTimeout(() => {
    Linking.getInitialURL().then((url) => {
      console.log('url' + url)
      if (url && url.startsWith(WebUrl[AppConfig.env])) {
        fromWebUrl(url)
      }
    })
    Linking.addEventListener(
      'url', e => handleOpenUrl(e)
    )
  }, 1)
}

export const removeLinkingListener = () => {
  Linking.removeEventListener(
    'url', e => handleOpenUrl(e, () => {}))
}

const handleOpenUrl = (event: any) => {
  const { url } = event
  if (url.startsWith(WebUrl[AppConfig.env])) {
    fromWebUrl(url)
  }
}

const fromWebUrl = (url: string) => {
  if (isEmpty(url)) return
  try {
    const sendUrl = decodeURI(url)
    const route = sendUrl.replace(/.*?:\/\//g, '')
    const routeName = route.split('/')[2].split('?')[0]
    const id = route.split('/')[3].split('?')[0]
    if (routeName && ROUTE_NAMES.MESSAGES === routeName) {
      navigateToMessages(id)
    } else if (routeName && (ROUTE_NAMES.CALENDER === routeName || ROUTE_NAMES.MEALS === routeName)) {
      navigateToEvents(id, routeName)
    }
  } catch (e) {
    console.log(e.message)
  }
}

const navigateToMessages = (id: string) => {
  if (id) {
    setTimeout(() => {
      Actions.messageDetails({
        messageId: id,
        type: 'jump'
      })
    }, 1)
  }
}

const navigateToEvents = (id: string, routeName: string) => {
  if (id) {
    setTimeout(() => {
      if (ROUTE_NAMES.CALENDER === routeName) {
        Actions.eventDetails({
          eventId: id,
          type: 'jump'
        })
      } else {
        Actions.mealDetails({
          mealId: id,
          type: 'jump'
        })
      }
    }, 1)
  }
}
