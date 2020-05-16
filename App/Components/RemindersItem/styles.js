import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    marginBottom: Metrics.baseMargin,
    borderRadius: Metrics.smallMargin,
    padding: Metrics.baseMargin
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Metrics.baseMargin
  },
  time: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    color: Colors.darkText,
    paddingTop: Platform.OS === 'ios' ? 0 : 5
  },
  title: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  organizer: {
    color: Colors.lightText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  reminderT: {
    textAlign: 'right',
    color: Colors.lightText,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular
  },
  reminderContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventMessage: {
    color: Colors.themeColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    paddingVertical: Metrics.smallMargin
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: Metrics.baseMargin
  },
  reminderIcon: {
    fontSize: 17.5,
    color: Colors.themeColor,
    padding: Metrics.smallMargin,
    marginBottom: Metrics.marginFifteen
  }

})
