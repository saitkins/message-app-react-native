import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/index'
const shadow = {
  shadowColor: Colors.black,
  elevation: 5,
  shadowRadius: 5,
  shadowOffset: {width: 2, height: 2},
  shadowOpacity: 0.2
}
export default StyleSheet.create({
  ...ApplicationStyles,
  itemContainer: {
    ...shadow,
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.marginFifteen,
    backgroundColor: Colors.snow,
    borderRadius: Metrics.tiny,
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin
  },
  avatarContainer: {
    ...shadow,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: Colors.avatar
  },
  avatarText: {
    textAlign: 'center',
    color: Colors.darkLight,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  rightContainer: {
    flex: 1,
    marginLeft: Metrics.baseMargin
  },
  labelText: {
    color: Colors.dark,
    fontSize: Fonts.size.medium,
    paddingBottom: Metrics.tiny,
    fontFamily: Fonts.type.regular
  },
  valueText: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    paddingBottom: Metrics.tiny,
    fontFamily: Fonts.type.sBold
  },
  name: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold,
    paddingBottom: Metrics.smallMargin
  }
})
