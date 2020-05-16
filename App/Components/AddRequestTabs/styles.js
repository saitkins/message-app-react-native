import {StyleSheet} from 'react-native'
import {Colors, Fonts} from '../../Themes/index'
import Metrics from '../../Themes/Metrics'
const commonButtonStyles = {
  flex: 1,
  height: 35,
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: Colors.border,
  backgroundColor: Colors.offWhite
}

export default StyleSheet.create({
  buttonsGroup: {
    flexDirection: 'row'
  },
  leftButton: {
    ...commonButtonStyles,
    borderTopLeftRadius: Metrics.smallMargin,
    borderBottomLeftRadius: Metrics.smallMargin
  },
  rightButton: {
    ...commonButtonStyles,
    borderTopRightRadius: Metrics.smallMargin,
    borderBottomRightRadius: Metrics.smallMargin
  },
  centerButton: {
    ...commonButtonStyles
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.dark,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  selectButton: {
    backgroundColor: Colors.dark
  },
  selectButtonText: {
    color: Colors.snow
  }
})
