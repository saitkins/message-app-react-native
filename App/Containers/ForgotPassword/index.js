import { isEmpty, trim } from 'lodash'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import AuthActions from '../../Redux/AuthRedux'
import { Image, ImageBackground, Keyboard, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import I18n from '../../I18n'
import { Images } from '../../Themes/index'
import Input from '../../Components/Input'
import FullButton from '../../Components/FullButton'
import { isValidEmail, showMessage } from '../../Lib/Utilities'
import { ProgressDialog } from '../../Components/ProgressDialog'
import Colors from '../../Themes/Colors'

class ForgotPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: __DEV__ ? 'azmatullah+oma@techrivers.com' : '',
      isEmail: false
    }
  }

  onForgotPassword = () => {
    Keyboard.dismiss()
    let {email} = this.state
    if (isEmpty(email)) {
      showMessage('Please enter email.')
    } else if (!isValidEmail(email)) {
      showMessage('Please enter a valid email.')
    } else {
      this.props.forgotPassword({email})
    }
  }

  handleFocus = (key, value) => this.setState({[key]: value})

  render () {
    const {email, isEmail} = this.state
    const {fetching} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <View style={styles.iphoneXTopView} /> : null}
        <StatusBar translucent backgroundColor={'transparent'} />
        <ImageBackground style={styles.imageBackground} source={Images.background}>
          <ImageBackground style={styles.imageBackgroundBubbles} source={Images.bubbles}>
            <Image source={Images.logo} style={styles.logo} />
            <Text style={styles.header}>{I18n.t('forgotPassword')}</Text>
            <KeyboardAwareScrollView>
              <Input
                value={email}
                isFocused={isEmail}
                returnKeyType={'next'}
                autoCapitalize={'none'}
                placeholder={I18n.t('email')}
                keyboardType={'email-address'}
                placeholderTextColor={Colors.snow}
                onSubmitEditing={this.onForgotPassword}
                onFocus={() => this.handleFocus('isEmail', true)}
                onBlur={() => this.handleFocus('isEmail', false)}
                onChangeText={(email) => this.setState({email: trim(email)})}
          />
              <FullButton
                text={I18n.t('resetLink')}
                onPress={this.onForgotPassword}
          />
            </KeyboardAwareScrollView>
            <Text style={styles.rememberPassword}>{I18n.t('rememberPassword')}<Text style={styles.loginBack} onPress={Actions.login}>{I18n.t('loginBack')}</Text></Text>
          </ImageBackground>
        </ImageBackground>
        <ProgressDialog hide={!fetching} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({auth: {error, fetching}}) => {
  return {error, fetching}
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => dispatch(AuthActions.forgotPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
