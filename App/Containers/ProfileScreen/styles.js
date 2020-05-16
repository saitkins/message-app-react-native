import { StyleSheet, Platform } from 'react-native'
import {ApplicationStyles, Metrics, Fonts, Colors} from '../../Themes/index'
import { isIphoneX } from '../../Lib/IphoneXHelper'

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  gradient: {
    height: 140,
    width: '100%'
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.marginFifteen,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? Metrics.marginFifteen : 35
  },
  iconContainer: {
    width: 60,
    alignItems: 'flex-end',
    paddingHorizontal: Metrics.marginFifteen
  },
  backIconContainer: {
    width: 60,
    paddingHorizontal: Metrics.marginFifteen,
  },
  settingIcon: {
    fontSize: 25,
    color: Colors.snow
  },
  backIcon: {
    fontSize: 25,
    color: Colors.snow
  },
  profile: {
    width: 60,
    color: Colors.snow,
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.sBold
  },
  userImage: {
    top: Platform.OS === 'ios' ? isIphoneX() ? 120 : 95 : 80,
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    position: 'absolute'
  },
  name: {
    textAlign: 'center',
    color: Colors.darkText,
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.sBold,
    marginTop: Metrics.images.large,
    paddingBottom: Metrics.baseMargin
  },
  regularText: {
    textAlign: 'center',
    color: Colors.dark,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    paddingBottom: Metrics.smallMargin
  },
  editProfile: {
    textAlign: 'center',
    color: Colors.themeColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    padding: Metrics.smallMargin
  },
  studentsContainer: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    borderTopColor: Colors.frost,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  myStudents: {
    color: Colors.darkText,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.sBold,
    paddingTop: Metrics.marginFifteen,
    paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  profileBar: {
    backgroundColor: Colors.gradientC2
  }
})
