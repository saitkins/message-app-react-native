import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/index'
const commonContainer = {
  height: 78,
  width: '100%',
  flexDirection: 'row',
  borderRadius: Metrics.smallMargin,
  marginBottom: Metrics.baseMargin
}
export default StyleSheet.create({
  ...ApplicationStyles,
  readContainer: {
    ...commonContainer,
    backgroundColor: Colors.snow
  },
  unreadContainer: {
    ...commonContainer,
    backgroundColor: Colors.green
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    marginLeft: Metrics.smallMargin,
    borderRadius: Metrics.smallMargin
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Metrics.baseMargin
  },
  date: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    paddingBottom: Metrics.tiny,
    color: Colors.darkText
  },
  time: {
    color: Colors.lightText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  name: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold,
    paddingBottom: Metrics.tiny,
    color: Colors.darkText
  },
  message: {
    color: Colors.darkLight,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  nameContainer: {
    flex: 1,
    marginLeft: Metrics.section,
    paddingRight: Metrics.baseMargin
  }

})
