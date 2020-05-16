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
  backgroundColor: Colors.snow
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
    fontSize: Fonts.size.mediumSmall,
    fontFamily: Fonts.type.sBold
  },
  selectButton: {
    backgroundColor: Colors.themeColor
  },
  selectButtonText: {
    color: Colors.snow
  }
})
