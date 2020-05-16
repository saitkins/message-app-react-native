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
  dateContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Metrics.baseMargin
  },
  itemLabel: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  },
  itemValue: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.border
  },
  tag: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    paddingBottom: Metrics.baseMargin,
    paddingTop: Metrics.doubleBaseMargin
  },
  input: {
    height: 150,
    borderWidth: 1,
    marginTop: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    borderColor: Colors.border,
    borderRadius: Metrics.tiny,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  },
  disabledText: {
    color: Colors.lightText
  },
  disabledView: {
    backgroundColor: Colors.offWhite
  },
  submittedBy: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  confirmText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h6
  }
})
