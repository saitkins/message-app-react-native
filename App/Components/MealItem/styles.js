import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/index'

const commonStyles = {
  borderBottomColor: Colors.frost,
  borderBottomWidth: StyleSheet.hairlineWidth
}

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    paddingLeft: Metrics.doubleBaseMargin
  },
  dateContainer: {
    ...commonStyles,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin
  },
  borderTop: {
    borderTopColor: Colors.frost,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  dateText: {
    color: Colors.lightText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuContainer: {
    flex: 0.7,
    paddingRight: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin
  },
  menu: {
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  holiday: {
    fontWeight: 'normal',
    color: Colors.darkText,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular
  },
  label: {
    flex: 0.3,
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  bottomBorder: {
    ...commonStyles
  }
})
