import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/index'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1
  },
  contentContainerStyle: {
    paddingHorizontal: Metrics.marginFifteen
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
  tabsContainer: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleSection
  }
})
