import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import Metrics from '../../Themes/Metrics'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import { hexToSemiTrans } from '../../Lib/Utilities'

const border = {
  borderBottomColor: Colors.frost,
  borderBottomWidth: StyleSheet.hairlineWidth
}
const commonRow = {
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const commonBackground = {
  alignSelf: 'flex-start',
  padding: Metrics.smallMargin,
  backgroundColor: hexToSemiTrans(Colors.themeColor)
}
export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  scrollContainer: {
    paddingHorizontal: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin
  },
  backgroundTint: {
    alignSelf: 'flex-start',
    ...commonBackground,
    marginBottom: Metrics.baseMargin
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  title: {
    color: Colors.snow,
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.sBold
  },
  transBackground: {
    backgroundColor: Colors.snow
  },
  blackText: {
    color: Colors.darkText
  },
  description: {
    color: Colors.darkLight,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    padding: Metrics.marginFifteen
  },
  detailItem: {
    flexDirection: 'row'
  },
  urlContainer: {
    flexDirection: 'row',
    paddingTop: Metrics.doubleBaseMargin
  },
  labelContainer: {
    ...border,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.marginFifteen,
    marginHorizontal: Metrics.marginFifteen
  },
  detailsItemIcon: {
    width: 25,
    fontSize: 20,
    marginTop: 15,
    color: Colors.themeColor,
    marginLeft: Metrics.baseMargin
  },
  urlIcon: {
    width: 25,
    fontSize: 20,
    color: Colors.themeColor,
    marginLeft: Metrics.baseMargin
  },
  labelText: {
    flex: 0.3,
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  },
  url: {
    flex: 1,
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.regular
  },
  itemValue: {
    flex: 0.7,
    textAlign: 'right',
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  urlValue: {
    flex: 0.7,
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  deadline: {
    color: Colors.red,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  dateRow: {
    ...commonRow
  },
  timeRow: {
    ...commonRow,
    marginTop: Metrics.smallMargin
  },
  borderLine: {
    marginTop: Metrics.section,
    borderBottomColor: Colors.frost,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  dateTimeContainer: {
    ...border,
    flex: 1,
    marginHorizontal: Metrics.marginFifteen,
    paddingVertical: Metrics.marginFifteen
  },
  linkContainer: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin
  },
  urlHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  schoolName: {
    overflow: 'hidden',
    color: Colors.snow,
    paddingVertical: 7.5,
    alignSelf: 'flex-start',
    borderRadius: Metrics.tiny,
    fontSize: Fonts.size.medium,
    backgroundColor: Colors.green,
    fontFamily: Fonts.type.regular,
    paddingHorizontal: Metrics.baseMargin
  },
  reminderIcon: {
    width: 25,
    height: 25,
    marginTop: 10,
    marginLeft: 7.5,
    resizeMode: 'contain',
    tintColor: Colors.themeColor
  },
  headerImage: {
    width: '100%',
    minHeight: 200,
    resizeMode: 'cover'
  },
  headerHeight: {
    minHeight: 130
  }
})
