import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles,
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Metrics.marginFifteen,
    paddingHorizontal: Metrics.baseMargin
  },
  userIcon: {
    color: Colors.snow,
    fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    color: Colors.snow,
    fontSize: Fonts.size.medium
  },
  month: {
    color: Colors.snow,
    fontSize: Fonts.size.medium
  },
  emptyMessage: {
    textAlign: 'center',
    color: Colors.lightText,
    fontSize: Fonts.size.medium
  }
})
