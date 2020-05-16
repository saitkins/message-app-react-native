// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.80)'
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: Colors.transparent,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  bgWhite: {
    backgroundColor: Colors.snow
  },
  selectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pickerStyle: {
    flex: 1
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnText: {
    margin: Metrics.baseMargin,
    flex: 1,
    color: Colors.themeColor,
    fontFamily: Fonts.type.sBold,
    fontSize: Fonts.size.regular
  },
  text: {
    marginVertical: Metrics.baseMargin,
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  icon: {
    color: Colors.halfWhite,
    margin: Metrics.baseMargin
  },
  iconStyle: {
    color: Colors.input,
    position: 'absolute',
    right: 10,
    top: 12
  },
  itemStyle: {
    fontFamily: Fonts.type.sBold,
    fontSize: Fonts.size.regular
  }
})
