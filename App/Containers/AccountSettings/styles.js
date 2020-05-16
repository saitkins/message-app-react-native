import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Fonts from '../../Themes/Fonts'

const border = {
  borderBottomColor: Colors.frost,
  borderBottomWidth: StyleSheet.hairlineWidth
}

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  innerContainer: {
    padding: Metrics.marginFifteen
  },
  settingItem: {
    ...border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.marginFifteen
  },
  settingLabel: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    color: Colors.darkText
  },
  version: {
    color: Colors.dark,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    paddingTop: Metrics.marginFifteen
  },
  logoutLabel: {
    color: Colors.themeColor
  },
  icon: {
    fontSize: 25,
    color: Colors.frost,
  }
})
