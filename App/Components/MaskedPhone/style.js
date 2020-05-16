import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles,
  maskedPhoneInput: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    color: Colors.darkText,
    borderColor: Colors.frost,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    marginBottom: Metrics.baseMargin,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Metrics.baseMargin
  },
})
