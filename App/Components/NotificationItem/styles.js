import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes'

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.marginFifteen,
    borderBottomColor: Colors.frost,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  descriptionContainer: {
    flex: 1
  },
  description: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold
  },
  timeText: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    paddingTop: Metrics.smallMargin
  },
  icon: {
    fontSize: 25,
    color: Colors.frost,
    paddingLeft: Metrics.baseMargin
  }
})
