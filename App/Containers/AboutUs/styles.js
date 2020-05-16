import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  innerContainer: {
    paddingBottom: Metrics.marginFifteen,
    paddingHorizontal: Metrics.marginFifteen
  },
  logo: {
    alignSelf: 'center',
    height: 60,
    width: 190,
    color: Colors.themeColor,
    tintColor: Colors.themeColor,
    marginVertical: Metrics.icons.large
  },
  version: {
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    paddingBottom: Metrics.tiny,
    color: Colors.darkText
  },
  copyright: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    color: Colors.darkText
  },
  urlContainer: {
    marginBottom: Metrics.section
  },
  url: {
    textAlign: 'center',
    color: Colors.themeColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  description: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    paddingVertical: Metrics.marginFifteen
  }
})
