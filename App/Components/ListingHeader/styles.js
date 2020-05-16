import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles,
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.marginFifteen
  },
  headerIcons: {
    fontSize: 22,
    color: Colors.snow,
    padding: Metrics.baseMargin
  },
  title: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  heading: {
    color: Colors.snow,
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.sBold
  }
})
