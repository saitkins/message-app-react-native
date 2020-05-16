import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles,
  emptyDate: {
  },
  knobContainer: {
    height: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: Metrics.screenWidth,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.snow
  },
  knob: {
    width: 45,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.frost
  }
})
