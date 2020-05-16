import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/index'

const commonStyles = {
  borderBottomColor: Colors.frost,
  borderBottomWidth: StyleSheet.hairlineWidth
}
export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    paddingLeft: Metrics.doubleBaseMargin
  },
  dateContainer: {
    ...commonStyles,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin
  },
  borderTop: {
    borderTopColor: Colors.frost,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  dateText: {
    color: Colors.lightText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeContainer: {
    flex: 0.3
  },
  eventNameContainer: {
    flex: 0.7,
    flexDirection: 'row',
    paddingVertical: Metrics.marginFifteen,
    paddingRight: Metrics.doubleBaseMargin
  },
  eventName: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold
  },
  eventVenue: {
    color: Colors.lightText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  startTime: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  endTime: {
    color: Colors.lightText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  dot: {
    width: 4,
    height: 4,
    marginTop: 8,
    marginRight: 5,
    borderRadius: 2,
    backgroundColor: Colors.yellow
  },
  topBorder: {
    borderTopColor: Colors.frost,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  BorderBottom: {
    ...commonStyles
  }
})
