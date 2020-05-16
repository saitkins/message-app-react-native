import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles,
  contentContainer: {},
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.marginFifteen,
    paddingVertical: Metrics.smallMargin
  },
  title: {
    flex: 1,
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold,
    marginLeft: Metrics.baseMargin
  },
  description: {
    color: Colors.textColor
  }
})
