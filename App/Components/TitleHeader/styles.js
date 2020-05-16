import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles,
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Metrics.marginFifteen,
    marginTop: Platform.OS === 'ios' ? 0 : Metrics.marginFifteen
  },
  title: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold,
    color: Colors.darkText
  },
  icon: {
    paddingRight: Metrics.baseMargin,
    fontSize: 25,
    color: Colors.frost
  },
  viewWidth: {
    width: 35
  }
})
