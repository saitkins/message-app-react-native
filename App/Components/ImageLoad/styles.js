import {StyleSheet} from 'react-native'
export default StyleSheet.create({
  backgroundImage: {
    position: 'relative'
  },
  activityIndicator: {
    position: 'absolute',
    margin: 'auto',
    zIndex: 9
  },
  viewImageStyles: {
    flex: 1,
    backgroundColor: '#e2e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePlaceholderStyles: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  }
})
