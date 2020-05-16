import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: Metrics.doubleSection,
    marginTop: Metrics.baseMargin,
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.themeColor
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.snow,
    fontFamily: Fonts.type.sBold,
    fontSize: Fonts.size.regular
  }
})
