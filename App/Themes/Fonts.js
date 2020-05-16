import {Platform} from 'react-native'
const type = {
  regular: Platform.OS === 'ios' ? 'ProximaNova-Regular' : 'Proxima-Nova-Rg',
  bold: Platform.OS === 'ios' ? 'ProximaNova-Bold' : 'Proxima-Nova-Bold',
  sBold: Platform.OS === 'ios' ? 'ProximaNova-Semibold' : 'Proxima-Nova-Sbold'
}
const size = {
  h1: 40,
  h2: 34, // heading
  h3: 30,
  h4: 24, // subHeading
  h5: 20,
  h6: 19,
  regular: 17,
  medium: 14,
  mediumSmall: 12,
  small: 10,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
