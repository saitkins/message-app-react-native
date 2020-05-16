import { StyleSheet } from 'react-native'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  footerLoadingContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
    paddingVertical: Metrics.baseMargin
  }
})
