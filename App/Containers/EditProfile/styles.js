import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/index'
const commonLabel = {
  color: Colors.darkText,
  fontSize: Fonts.size.medium,
  fontFamily: Fonts.type.sBold,
  marginTop: Metrics.baseMargin
}
export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  formView: {
    paddingHorizontal: Metrics.marginFifteen
  },
  imageBackground: {
    borderRadius: 50
  },
  labelText: {
    ...commonLabel
  },
  labelTextPhone: {
    ...commonLabel,
    marginBottom: Metrics.baseMargin
  },
  profileImageContainer: {
    flexDirection: 'row',
    marginTop: Metrics.section,
    marginBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.marginFifteen
  },
  userIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    resizeMode: 'cover'
  },
  changeImageContainer: {
    marginTop: Metrics.tiny,
    justifyContent: 'center',
    marginLeft: Metrics.baseMargin
  },
  changeImageText: {
    color: Colors.themeColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    paddingBottom: Metrics.baseMargin
  },
  uploadSize: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  }
})
