import {StyleSheet} from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'
export default StyleSheet.create({
  ...ApplicationStyles,
  title: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold,
    color: Colors.darkText
  },
  contentContainerStyle: {
    paddingVertical: Metrics.baseMargin
  }
})
