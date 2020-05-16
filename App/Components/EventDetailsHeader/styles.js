import { Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles,
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? Metrics.marginFifteen : 30,
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.baseMargin
  },
  crossIcon: {
    fontSize: 15,
    padding: 5,
    color: Colors.lightText,
    paddingRight: Metrics.baseMargin
  },
  title: {
    textAlign: 'center',
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  favContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationIcon: {
    padding: 5,
    fontSize: 25,
    color: Colors.themeColor
  },
  favIcon: {
    padding: 5,
    color: Colors.fire,
    fontSize: Fonts.size.h5,
    marginLeft: Metrics.baseMargin
  },
  emptyView: {
    width: 20
  }
})
