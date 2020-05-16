import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { hexToSemiTrans } from '../../Lib/Utilities'
import Color from '../../Themes/Colors'

export default StyleSheet.create({
  containerStyle: {
    height: Metrics.doubleSection,
    marginTop: Metrics.smallMargin,
    borderRadius: Metrics.smallMargin,
    backgroundColor: hexToSemiTrans(Colors.white, 0.2)
  },
  inputStyle: {
    flex: 1,
    color: Colors.snow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    borderRadius: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  forgotContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },
  forgotText: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.regular,
    padding: Metrics.baseMargin
  },
  focused: {
    borderWidth: 1,
    borderColor: Color.snow
  },
  eye: {
    fontSize: 25,
    padding: 10
  }
})
