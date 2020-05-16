import styles from './styles'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

import Colors from '../../Themes/Colors'
import I18n from '../../I18n'
import VectorIcon from '../../Components/VectorIcon'
import AuthActions from '../../Redux/AuthRedux'
import TitleHeader from '../../Components/TitleHeader/index'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'
import { APP_URLS, BaseURL, PrivacyPolicy, TermsOfServices } from '../../Lib/AppConstants'
import AppConfig from '../../Config/AppConfig'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

class AccountSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false
    }
  }

  renderDetailsRow = (label, onPress, logout) => {
    return (
      <TouchableOpacityEx style={styles.settingItem} onPress={onPress}>
        <Text style={[styles.settingLabel, logout && styles.logoutLabel]}>{label}</Text>
        <VectorIcon name={'ios-arrow-forward'} type={'Ionicons'} style={styles.icon} />
      </TouchableOpacityEx>
    )
  }

  render () {
    const version = '1.0.0'
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <View style={styles.innerContainer}>
          <TitleHeader title={I18n.t('accountSettings')} />
          {this.renderDetailsRow(I18n.t('changePassword'), Actions.changePassword)}
          {this.renderDetailsRow(I18n.t('termsOfService'), () => Actions.webView({title: I18n.t('termsOfService'), url: PrivacyPolicy[AppConfig.env]}))}
          {this.renderDetailsRow(I18n.t('privacyPolicy'), () => Actions.webView({title: I18n.t('privacyPolicy'), url: TermsOfServices[AppConfig.env]}))}
          {this.renderDetailsRow(I18n.t('about'), Actions.aboutUs)}
          {this.renderDetailsRow(I18n.t('submitIdea'), Actions.submitAppIdea)}
          {this.renderDetailsRow(I18n.t('logout'), this.props.logoutUser, true)}
          <Text style={styles.version}>{`${I18n.t('version')} ${version}`}</Text>
        </View>
      </SafeAreaView>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(AuthActions.logout())
  }
}

export default connect(null, mapDispatchToProps)(AccountSettings)
