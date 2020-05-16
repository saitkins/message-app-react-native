// Utility functions
import moment from 'moment'
import I18n from 'react-native-i18n'
import Snackbar from 'react-native-snackbar'
import { Alert, NetInfo } from 'react-native'
import Permissions from 'react-native-permissions'
import OpenSettings from 'react-native-open-settings'
import { compact, isEqual, isEmpty, unionBy, upperFirst, trim } from 'lodash'

import { Colors } from '../Themes/'
import { DATE_FORMATS, photosPermissionTypes } from './AppConstants'
import firebase from 'react-native-firebase'
import memoizeOne from 'memoize-one'

export const setBadge = (count: number) => {
  try {
    firebase.notifications().setBadge(count)
  } catch (e) {
    console.log(e)
  }
}

let connectedCallbacks = []
export const registerConnectionChangeCB = (Callback) => {
  if (typeof Callback === 'function') {
    connectedCallbacks = unionBy(connectedCallbacks, [Callback])
  }
}
export const unRegisterConnectCb = (Callback) => {
  if (typeof Callback === 'function') {
    connectedCallbacks = connectedCallbacks.filter(item => !isEqual(item, Callback))
  }
}
export let isConnected = false

const updateConnected = ({type}) => {
  isConnected = (type !== 'NONE' && type !== 'none')
  for (const Cb of connectedCallbacks) {
    Cb(isConnected)
  }
  console.tron.log('Network Connection = ' + isConnected)
  console.log('Network Connection = ' + isConnected)
}

export const checkConnected = () => {
  NetInfo.getConnectionInfo().then(updateConnected)
  NetInfo.addEventListener('connectionChange', updateConnected)
}

// Correct Map URIs
export const showMessage = (message: string) => {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_LONG,
    action: {
      title: 'OK',
      color: Colors.snow,
      onPress: () => {
      }
    }
  })
}
export const showMessageIndefinate = (message: string) => {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_INDEFINITE,
    action: {
      title: 'OK',
      color: Colors.snow,
      onPress: () => {
      }
    }
  })
}

export const showErrorMessage = (error: any) => {
  if (typeof error === 'string' || error instanceof String) {
    showMessage(error)
  } else if (error && error.message) {
    showMessage(error.message)
  } else {
    showMessage('Something went wrong please try again')
  }
}

export const isValidEmail = (email: string) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const isValidPhoneNo = (phoneNo: string) => {
  var phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
  return phoneRe.test(phoneNo)
}

export const setScheme = (url) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url
  }
  return url
}

export const getAddressString = (city, state, zipCode) => {
  return compact([city, state, zipCode]).join(', ')
}

export const formatAddress = (street1, street2, city, state, zipCode) => {
  return compact([street1, street2, city, state, zipCode]).join(', ')
}

export const hexToSemiTrans = (hex, transparency) => {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + (transparency || 0.5) + ')'
  }
  return hex
}

export const showAlertDialog = (title, message, okCallBack, cancelable = false) => {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: okCallBack}
    ],
    {cancelable}
  )
}

export const convertData = (data = []) => {
  let sections = {}
  data.sort((a, b) => { return (a.startDate > b.startDate) ? -1 : ((b.startDate > a.startDate) ? 1 : 0) })
  data.forEach(item => {
    let itemDate = moment(item.startDate).isValid() ? moment(item.startDate).format(DATE_FORMATS.displayFormat) : moment().format(DATE_FORMATS.displayFormat)
    if (sections[itemDate]) {
      sections[itemDate].push(item)
    } else {
      sections[itemDate] = [item]
    }
  })
  let keys = Object.keys(sections)
  let newData = []
  keys.forEach((key) => {
    newData.push({data: sections[key], title: key})
  })
  return newData
}

export const convertMessages = (data = []) => {
  let sections = {}
  data.forEach(item => {
    let itemDate = item.status
    if (sections[itemDate]) {
      sections[itemDate].push(item)
    } else {
      sections[itemDate] = [item]
    }
  })
  let keys = Object.keys(sections)
  let newData = []
  keys.forEach((key) => {
    newData.push({data: sections[key], title: key})
  })
  newData = newData.sort((a, b) => { return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0) })
  return newData
}

export const convertDataEvents = (data = []) => {
  let sections = {}
  data.forEach((item, index) => {
    let itemDate = moment(item.startDate).isValid() ? moment(item.startDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
    if (sections[itemDate]) {
      sections[itemDate].push(item)
    } else {
      sections[itemDate] = [{title: itemDate, index}]
      sections[itemDate].push(item)
    }
  })
  for (const key of Object.keys(sections)) {
    const items = sections[key]
    const item = items[items.length - 1]
    sections[key][items.length - 1] = {...item, isLastItem: true}
  }
  return sections
}

export const formatMenu = (menu) => {
  const menuItem = []
  for (const key of Object.keys(menu)) {
    if (key !== '_id' && !isEmpty(menu[key])) {
      menuItem.push(upperFirst(menu[key]))
    }
  }
  return menuItem.join(', ')
}

export const handlePermissionError = (permissionType) => {
  Permissions.check(permissionType)
    .then(response => {
      if (response === 'denied' || response === 'restricted' || response === 'undetermined') {
        const title = isEqual(photosPermissionTypes.CAMERA, permissionType) ? I18n.t('cameraPermissionTitle') : I18n.t('photosPermissionTitle')
        const message = isEqual(photosPermissionTypes.CAMERA, permissionType) ? I18n.t('cameraPermissionMessage') : I18n.t('photosPermissionMessage')
        Alert.alert(title, message,
          [{text: 'Cancel', style: 'cancel'}, {
            text: 'Settings',
            onPress: () => OpenSettings.openSettings()
          }])
      }
    })
}

export const getAttendanceType = (all, absence, earlyPickup) => {
  const attendanceType = all ? '' : absence ? 'ABSENCE' : earlyPickup ? 'EARLY_PICKUP' : 'LATE_DROPOFF'
  return attendanceType
}

export const getSelectedTab = (type) => {
  const selectedType = type === 'EARLY_PICKUP' ? {
    absence: false,
    earlyPickup: true,
    lateDrop: false
  } : type === 'LATE_DROPOFF' ? {absence: false, earlyPickup: false, lateDrop: true} : {
    absence: true,
    earlyPickup: false,
    lateDrop: false
  }
  return selectedType
}

export const getDeadLineMessage = (startDate, signUpDeadLine) => {
  const signupdeadline = moment(signUpDeadLine).utc().format('DD/MM/YYYY')
  const startedDate = moment(startDate).utc().format('DD/MM/YYYY')
  const now = moment().format('DD/MM/YYYY')
  const signUpDifference = moment(now, 'DD/MM/YYYY').diff(moment(signupdeadline, 'DD/MM/YYYY'), 'days')
  const startDateDifference = moment(now, 'DD/MM/YYYY').diff(moment(startedDate, 'DD/MM/YYYY'), 'days')
  let message = ''
  if (signUpDifference === -1) {
    message = 'Sign up deadline is tomorrow'
  } else if (signUpDifference === 0) {
    message = 'Sign up deadline is today'
  } else if (signUpDifference < -1) {
    message = `Sign up deadline is in ${Math.abs(signUpDifference)} days`
  } else if (startDateDifference === 0) {
    message = 'This event is today'
  } else if (startDateDifference === -1) {
    message = 'This event is tomorrow'
  } else if (startDateDifference < -1) {
    message = `This event is in ${Math.abs(startDateDifference)} days`
  }
  return message
}

export const titleCase = (text) => {
  return text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

export const isTopDay = (topDay, title) => {
  if (!isEmpty(title)) {
    const current = trim(topDay.toString().substring(0, 11))
    const titleDate = moment(title).format('ddd MMM DD').toString()
    const titleMonth = moment(title).format('ddd, DD MMM').toString()
    return current === titleDate || current === titleMonth
  } else {
    return false
  }
}

const identity = x => x
export const deepMemoized = memoizeOne(identity, isEqual)
