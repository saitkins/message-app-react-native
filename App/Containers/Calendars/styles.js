import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/index'
import Colors from '../../Themes/Colors'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1
  },
  emptyMessage: {
    textAlign: 'center',
    color: Colors.lightText,
    fontSize: Fonts.size.medium
  }
})
