
export const imageOptions = {
  mediaType: 'photo',
  cropping: true,
  compressImageMaxWidth: 1600,
  compressImageMaxHeight: 1600,
  compressImageQuality: 0.9
}

export const photosPermissionTypes = {
  CAMERA: 'camera',
  PHOTOS: 'photo'
}

export const DATE_FORMATS = {
  displayFormat: 'dddd DD, MMMM',
  slashDate: 'MM/DD/YYYY',
  monthFormat: 'MMMM DD, YYYY',
  timeFormat: 'hh:mm A',
  timeFormat1: 'h:mm A'
}

export const BaseURL = {
  dev: 'https://devapi.usebindr.com/',
  stage: 'https://devapi.usebindr.com/',
  prod: 'https://api.usebindr.com/'
}

export const environments = {
  DEV: 'dev',
  STAGE: 'stage',
  PROD: 'prod'
}

export const AttendanceReasons = [
  'Vacation',
  'Illness',
  'Funeral',
  'Religious Holiday',
  'Other'
]

export const CheckboxColors = [
  '#7BCDCB',
  '#f78b8f',
  '#F7BABE',
  '#D164F4',
  '#F4AE61'
]

export const PrivacyPolicy = {
  dev: 'https://dev.usebindr.com/privacy',
  stage: 'https://dev.usebindr.com/privacy',
  prod: 'https://app.usebindr.com/privacy'
}
export const TermsOfServices = {
  dev: 'https://dev.usebindr.com/tos',
  stage: 'https://dev.usebindr.com/tos',
  prod: 'https://app.usebindr.com/tos'
}
export const AppUrl = {
  dev: 'https://dev.usebindr.com',
  stage: 'https://dev.usebindr.com',
  prod: 'https://api.usebindr.com'
}
export const WebUrl = {
  dev: 'https://dev.usebindr.com',
  stage: 'https://dev.usebindr.com',
  prod: 'https://app.usebindr.com'
}
export const EVENT_ORGANIZER = {
  ROOM_MOM: 'Room Mom',
  PTA: 'PTA',
  SCHOOL: 'School',
  DISTRICT: 'District',
  TEACHER: 'Teacher'
}

export const ATTENDANCE_TYPE = {
  ABSENCE: 'Absence',
  EARLY_PICKUP: 'Early Pickup',
  LATE_DROPOFF: 'Late Drop Off'
}
