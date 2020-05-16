import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles,
  innerContainer: {
    flex: 1,
    padding: Metrics.marginFifteen
  },
  labelText: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    marginTop: Metrics.baseMargin
  },
  contentContainerStyle: {
    flex: 1,
    padding: Metrics.baseMargin
  },
  changePasswordButton: {
    marginTop: Metrics.smallMargin
  }

})
