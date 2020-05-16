import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/index'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  textStyle: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  dropdownStyle: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  highlightedText: {
    color: Colors.themeColor,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  }
})
