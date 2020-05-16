import {Metrics, Colors, Fonts} from '../../Themes/'
import {Platform} from 'react-native'

const navBarBottomBorder = Platform.OS === 'ios' ? {borderBottomWidth: 1, borderBottomColor: Colors.darkGray} : {}
export default {
  container: {
    flex: 1
  },
  leftButton: {
    color: Colors.snow,
    tintColor: Colors.snow
  },
  rightButtonContainer: {
    marginHorizontal: Metrics.baseMargin

  },
  navBarTextTabs: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: null,
    fontFamily: Fonts.type.medium,
    color: Colors.snow
  },
  navBarTextScreens: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'stretch',
    fontWeight: null,
    fontFamily: Fonts.type.base,
    color: Colors.snow
  },
  subNavText: {
    fontFamily: Fonts.type.normal,
    fontSize: Fonts.size.medium,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  longTitle: {
    alignSelf: 'center',
    color: Colors.silver,
    width: Metrics.screenWidth - 50,
    marginLeft: Metrics.doubleBaseMargin
  },
  navBarStyle: {
    backgroundColor: Colors.themeColor,
    ...navBarBottomBorder
  },
  LeftButton: {
    marginLeft: Metrics.baseMargin
  },
  switchContainer: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.fire,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1
  },
  tabBar: {
    height: 55,
    borderTopWidth: 0.5,
    paddingTop: Metrics.smallMargin,
    borderTopColor: Colors.steel,
    backgroundColor: Colors.bottomTabbarBG
  },
  tabBarIcon: {
    flex: 1,
    alignItems: 'stretch'
  },
  overrideText: {},
  title: {
    color: Colors.snow,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: Fonts.type.medium,
    backgroundColor: Colors.transparent,
    paddingHorizontal: Metrics.baseMargin
  },
  rightButtonText: {
    textAlign: 'center',
    fontFamily: Fonts.type.medium,
    color: Colors.snow
  },
  backButtonContainer: {
    marginHorizontal: Metrics.marginFifteen,
    paddingTop: 1
  }
}
