import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/index'
const reminderCommon = {
  lineHeight: 25,
  textAlign: 'center',
  color: Colors.darkText,
  fontSize: Fonts.size.regular,
  fontFamily: Fonts.type.regular,
  paddingHorizontal: Metrics.section
}

const buttonCommon = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: Metrics.smallMargin
}
export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.promptBackground
  },
  innerContainer: {
    width: 280,
    borderRadius: 15,
    backgroundColor: Colors.snow
  },
  reminderText: {
    marginTop: Metrics.doubleBaseMargin,
    ...reminderCommon
  },
  reminderTextBold: {
    ...reminderCommon,
    fontFamily: Fonts.type.sBold
  },
  rightButtonStyle: {
    ...buttonCommon
  },
  leftButtonStyle: {
    ...buttonCommon,
    borderRightColor: Colors.frost,
    borderRightWidth: StyleSheet.hairlineWidth
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.themeColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    padding: Metrics.marginFifteen
  },
  horizontalView: {
    width: '100%',
    flexDirection: 'row',
    borderTopColor: Colors.frost,
    marginTop: Metrics.doubleBaseMargin,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
