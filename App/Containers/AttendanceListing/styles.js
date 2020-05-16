import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/index'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1
  },
  listContainer: {
    paddingHorizontal: Metrics.marginFifteen
  },
  tabsContainer: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.marginFifteen
  }
})
