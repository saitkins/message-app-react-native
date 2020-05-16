import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/index'
import ApplicationStyles from '../../Themes/ApplicationStyles'

const border = {
  borderBottomColor: Colors.frost,
  borderBottomWidth: StyleSheet.hairlineWidth
}
const iconCommon = {
  width: 25,
  fontSize: 22,
  color: Colors.themeColor,
  marginLeft: Metrics.smallMargin
}

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  scrollContainer: {
    padding: Metrics.baseMargin
  },
  title: {
    ...border,
    marginLeft: 35,
    fontWeight: 'bold',
    color: Colors.darkText,
    fontSize: Fonts.size.h4,
    marginRight: Metrics.marginFifteen,
    paddingVertical: Metrics.baseMargin
  },
  detailItem: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin
  },
  dateContainer: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin
  },
  label: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold,
    paddingBottom: Metrics.smallMargin
  },
  itemValue: {
    lineHeight: 25,
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  },
  icon: {
    ...iconCommon
  },
  dateIcon: {
    ...iconCommon,
    paddingTop: Metrics.baseMargin
  },
  detailsContainer: {
    flex: 1,
    marginLeft: Metrics.baseMargin
  },
  date: {
    ...border,
    flex: 1,
    color: Colors.darkText,
    fontFamily: Fonts.type.sBold,
    fontSize: Fonts.size.regular,
    marginLeft: Metrics.marginFifteen,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin
  }
})
