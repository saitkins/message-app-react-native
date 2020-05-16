import { Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles,
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.marginFifteen,
    paddingTop: Platform.OS === 'ios' ? Metrics.marginFifteen : 35
  },
  icon: {
    color: Colors.snow,
    fontSize: 25
  },
  userContainer: {
    width: 65
  },
  userIcon: {
    fontSize: 25,
    color: Colors.snow,
    paddingVertical: Metrics.tiny,
    paddingRight: Metrics.baseMargin
  },
  notificationContainer: {
    paddingRight: Metrics.marginFifteen
  },
  notificationIcon: {
    color: Colors.snow,
    fontSize: 30
  },
  title: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  rightContainer: {
    width: 65,
    flexDirection: 'row',
    alignItems: 'center'
  },
  countContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: Colors.red,
    marginLeft: 17.5
  },
  countText: {
    textAlign: 'center',
    fontSize: Fonts.size.small,
    color: Colors.snow
  }
})
