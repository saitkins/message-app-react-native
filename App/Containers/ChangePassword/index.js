import { isEmpty, isEqual } from 'lodash'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import React, { Component } from 'react'
import { Keyboard, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import Colors from '../../Themes/Colors'
import AuthActions from '../../Redux/AuthRedux'
import { showMessage } from '../../Lib/Utilities'
import FullButton from '../../Components/FullButton'
import { ProgressDialog } from '../../Components/ProgressDialog'
import TitleHeader from '../../Components/TitleHeader/index'
import InputPassword from '../../Components/InputPassword'

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      hideCurrentPassword: true,
      hideNewPassword: true,
      hideConfirmPassword: true
    }
  }

  handlePressChangePassword = () => {
    Keyboard.dismiss()
    const {currentPassword, confirmPassword, newPassword} = this.state
    if (isEmpty(currentPassword)) {
      showMessage(I18n.t('enterCurrentPassword'))
    } else if (isEmpty(newPassword)) {
      showMessage(I18n.t('enterNewPassword'))
    } else if (newPassword.length < 6) {
      showMessage(I18n.t('newPasswordLength'))
    } else if (isEmpty(confirmPassword)) {
      showMessage(I18n.t('confirmNewPassword'))
    } else if (!isEqual(newPassword, confirmPassword)) {
      showMessage(I18n.t('passwordsNotMatched'))
    } else {
      this.props.changePassword({newPassword, currentPassword})
    }
  }

  renderChangePasswordForm = () => {
    const {currentPassword, confirmPassword, newPassword, hideConfirmPassword, hideCurrentPassword, hideNewPassword} = this.state
    return (
      <View>
        <Text style={styles.labelText}>{I18n.t('currentPassword')}</Text>
        <InputPassword
          password={hideCurrentPassword}
          value={currentPassword}
          returnKeyType={'next'}
          styleOverride={styles.inputContainer}
          placeholder={I18n.t('currentPassword')}
          onSubmitEditing={() => this.refs.newPassword.focus()}
          onChangeText={(currentPassword) => this.setState({currentPassword})}
          onChangeView={() => this.setState({hideCurrentPassword: !hideCurrentPassword})}
        />
        <Text style={styles.labelText}>{I18n.t('newPassword')}</Text>
        <InputPassword
          ref='newPassword'
          value={newPassword}
          returnKeyType={'next'}
          password={hideNewPassword}
          placeholder={I18n.t('newPassword')}
          styleOverride={styles.inputContainer}
          onSubmitEditing={() => this.refs.cPassword.focus()}
          onChangeText={(newPassword) => this.setState({newPassword})}
          onChangeView={() => this.setState({hideNewPassword: !hideNewPassword})}
        />
        <Text style={styles.labelText}>{I18n.t('confirmPassword')}</Text>
        <InputPassword
          ref='cPassword'
          returnKeyType={'done'}
          value={confirmPassword}
          password={hideConfirmPassword}
          placeholder={I18n.t('confirmPassword')}
          styleOverride={styles.inputContainer}
          onSubmitEditing={this.handlePressChangePassword}
          onChangeView={() => this.setState({hideConfirmPassword: !hideConfirmPassword})}
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
        />
        <View style={styles.changePasswordButton}>
          <FullButton
            text={I18n.t('saveChanges')}
            onPress={this.handlePressChangePassword}
        />
        </View>
      </View>
    )
  }

  render () {
    const {fetching} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <View style={styles.innerContainer}>
          <TitleHeader title={I18n.t('changePassword')} />
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} style={styles.contentContainerStyle} >
            {this.renderChangePasswordForm()}
          </KeyboardAwareScrollView>
        </View>
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
    changePassword: (params) => dispatch(AuthActions.changePassword(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
