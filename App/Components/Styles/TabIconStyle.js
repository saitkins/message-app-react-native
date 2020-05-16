import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    textAlign: 'center',
    paddingVertical: 3,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.sBold
  },
  reminderIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  notificationBadgeCountStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.small,
    color: Colors.snow
  },
  badgeIcon: {
    height: 16,
    width: 16,
    borderRadius: 15,
    top: -5,
    right: 10,
    backgroundColor: Colors.fire,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center'
  }
})
