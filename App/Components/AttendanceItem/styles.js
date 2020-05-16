import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    height: 78,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.fire,
    borderRadius: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.marginFifteen,
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
  startDate: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    paddingBottom: Metrics.tiny,
    color: Colors.darkText
  },
  endDate: {
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
  reason: {
    color: Colors.lightText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  nameContainer: {
    marginLeft: Metrics.section
  },
  crossIcon: {
    fontSize: 10,
    color: Colors.lightText,
    padding: Metrics.smallMargin,
  }

})
