import { isEmpty, trim } from 'lodash'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import AuthActions from '../../Redux/AuthRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Image, ImageBackground, Keyboard, SafeAreaView, StatusBar, Text, View } from 'react-native'

import styles from './styles'
import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import Input from '../../Components/Input'
import { Images } from '../../Themes/index'
import FullButton from '../../Components/FullButton'
import { isValidEmail, showMessage } from '../../Lib/Utilities'
import { ProgressDialog } from '../../Components/ProgressDialog'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: __DEV__ ? 'ghulam.abbas+6@techrivers.com' : '',
      password: __DEV__ ? '123456' : '',
      isPassword: false,
      isEmail: false
    }
  }

  handlePressLoginButton = () => {
    Keyboard.dismiss()
    let {email, password} = this.state
    if (isEmpty(email)) {
      showMessage(I18n.t('enterEmail'))
    } else if (!isValidEmail(email)) {
      showMessage(I18n.t('validEmail'))
    } else if (!password) {
      showMessage(I18n.t('enterPassword'))
    } else {
      this.props.loginUser({email, password})
    }
  }

  handleFocus = (key, value) => this.setState({[key]: value})

  render () {
    const {email, password, isEmail, isPassword} = this.state
    const {fetching} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.iphoneXTopView} >
          <StatusBar translucent backgroundColor={'transparent'} />
        </View>
        <ImageBackground style={styles.imageBackground} source={Images.background}>
          <ImageBackground style={styles.imageBackgroundBubbles} source={Images.bubbles}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
              <Image source={Images.logo} style={styles.logo} />
              <Text style={styles.header}>{I18n.t('login')}</Text>
              <Input
                value={email}
                isFocused={isEmail}
                returnKeyType={'next'}
                autoCapitalize={'none'}
                placeholder={I18n.t('email')}
                keyboardType={'email-address'}
                placeholderTextColor={Colors.snow}
                onFocus={() => this.handleFocus('isEmail', true)}
                onBlur={() => this.handleFocus('isEmail', false)}
                onSubmitEditing={() => this.refs.password.focus()}
                onChangeText={(email) => this.setState({email: trim(email)})} />
              <Input
                password
                showForgot
                ref='password'
                value={password}
                returnKeyType={'done'}
                isFocused={isPassword}
                placeholder={I18n.t('password')}
                placeholderTextColor={Colors.snow}
                onSubmitEditing={this.handlePressLoginButton}
                onFocus={() => this.handleFocus('isPassword', true)}
                onBlur={() => this.handleFocus('isPassword', false)}
                onChangeText={(password) => this.setState({password})} />
              <FullButton
                text={I18n.t('login')}
                onPress={this.handlePressLoginButton} />
            </KeyboardAwareScrollView>
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
    loginUser: (params) => dispatch(AuthActions.login(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
