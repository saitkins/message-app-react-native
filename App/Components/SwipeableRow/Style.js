import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

// @ts-ignore
export default StyleSheet.create({
  ...ApplicationStyles,
  actionText: {
    color: 'white',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    backgroundColor: 'transparent',
    padding: Metrics.baseMargin
  },
  rightButton: {
    width: Metrics.screenWidth / 3
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent
  }
})
