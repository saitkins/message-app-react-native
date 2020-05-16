import {Fonts, Colors } from '../../Themes'

export default {
  customTextInputProps: {
    underlineColorAndroid: 'rgba(0,0,0,0)',
    style: {
      backgroundColor: Colors.snow,
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.regular
    }
  },
  customTextProps: {
    style: {
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.regular,
      color: Colors.textColor
    }
  }
}
