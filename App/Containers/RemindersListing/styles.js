import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1
  },
  gradient: {
    flex: 1
  },
  listTitle: {
    color: Colors.snow,
    paddingTop: Metrics.marginFifteen,
    paddingBottom: Metrics.baseMargin,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  sectionHeaderContainer: {
    paddingTop: Metrics.marginFifteen,
    paddingBottom: Metrics.smallMargin
  },
  headerDateText: {
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  contentContainerStyle: {
    paddingHorizontal: Metrics.marginFifteen
  },
  tabsContainer: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleSection
  }
})
