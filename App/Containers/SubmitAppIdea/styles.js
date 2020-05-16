import { StyleSheet } from 'react-native'
import {ApplicationStyles, Metrics, Fonts, Colors} from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  innerContainer: {
    flex: 1,
    padding: Metrics.section
  },
  input: {
    height: 200,
    borderWidth: 1,
    marginTop: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    borderColor: Colors.border,
    borderRadius: Metrics.tiny,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  },
})
