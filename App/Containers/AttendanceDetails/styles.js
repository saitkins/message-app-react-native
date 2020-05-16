import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import Metrics from '../../Themes/Metrics'
import ApplicationStyles from '../../Themes/ApplicationStyles'

const border = {
  borderBottomColor: Colors.frost,
  borderBottomWidth: StyleSheet.hairlineWidth
}
const commonRow = {
  flexDirection: 'row',
  justifyContent: 'space-between'
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
  descriptionContainer: {
    ...border,
    marginLeft: 40,
    marginRight: Metrics.marginFifteen,
    paddingVertical: Metrics.baseMargin
  },
  title: {
    color: Colors.darkText,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.sBold,
    paddingBottom: Metrics.baseMargin
  },
  reason: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    paddingBottom: Metrics.baseMargin
  },
  detailItem: {
    flexDirection: 'row'
  },
  detailsItemIcon: {
    width: 25,
    fontSize: 20,
    color: Colors.themeColor,
    marginVertical: Metrics.doubleBaseMargin
  },
  labelText: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  },
  itemValue: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  dateRow: {
    ...commonRow
  },
  timeRow: {
    ...commonRow,
    marginTop: Metrics.smallMargin
  },
  dateTimeContainer: {
    ...border,
    flex: 1,
    marginHorizontal: Metrics.marginFifteen,
    paddingVertical: Metrics.doubleBaseMargin
  },
  labelContainer: {
    ...border,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.marginFifteen,
    marginHorizontal: Metrics.marginFifteen
  },
  moreInfoContainer: {
    marginLeft: 25
  },
  notesContainer: {
    padding: 15
  },
  notes: {
    color: Colors.darkText,
    paddingTop: Metrics.tiny,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  }
})
