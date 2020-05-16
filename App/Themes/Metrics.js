import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS === 'ios'
// Used via Metrics.baseMargin
const metrics = {
  isIOS,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  marginFifteen: 15,
  doubleBaseMargin: 20,
  margin32: 32,
  smallMargin: 5,
  tiny: 2.5,
  input: 45,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    tabIcon: 25,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics
