import { StyleSheet } from 'react-native'
import {ApplicationStyles, Fonts, Colors} from '../../Themes/index'

const commonTextStyles = {
  color: Colors.snow,
  textAlign: 'center',
  fontSize: Fonts.size.medium,
  fontFamily: Fonts.type.regular
}
export default StyleSheet.create({
  ...ApplicationStyles,
  rememberPassword: {
    ...commonTextStyles
  },
  loginBack: {
    ...commonTextStyles,
    textDecorationLine: 'underline'
  }
})
