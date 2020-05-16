import {isEmpty} from 'lodash'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Input from '../../Components/Input'
import ActionSheet from 'react-native-actionsheet'
import FullButton from '../../Components/FullButton'
import MaskedPhone from '../../Components/MaskedPhone'
import ImagePicker from 'react-native-image-crop-picker'
import InputScrollView from 'react-native-input-scroll-view'
import { Keyboard, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Colors from '../../Themes/Colors'
import { Images } from '../../Themes/index'
import UserActions from '../../Redux/UserRedux'
import { ProgressDialog } from '../../Components/ProgressDialog'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import { imageOptions, photosPermissionTypes } from '../../Lib/AppConstants'
import { handlePermissionError, isValidEmail, isValidPhoneNo, showErrorMessage } from '../../Lib/Utilities'
import ImageLoad from '../../Components/ImageLoad'

class EditProfile extends Component {
  constructor (props) {
    const {name: {first = '', last = ''} = {}, email = '', phoneNumber = '', profileImg = ''} = props.profile || {}
    super(props)
    this.state = {
      name: `${first} ${last}`,
      email,
      phone: phoneNumber,
      phoneNumber: '',
      imagePath: '',
      profileImg,
      imageType: ''
    }
  }

  onChangePhoneNumber = (phoneNumberFormat, phoneNumber) => {
    this.setState({phoneNumber, phone: phoneNumberFormat})
  }

  updateProfile = () => {
    const {name, email, phone, imagePath, imageType, profileImg} = this.state
    const {editProfile} = this.props
    const lastIndex = name.lastIndexOf(' ')
    const first = lastIndex === -1 ? name.substring(lastIndex, name.length) : name.substring(0, lastIndex)
    const last = lastIndex === -1 ? '' : name.substring(lastIndex + 1, name.length)

    Keyboard.dismiss()
    if (isEmpty(name)) {
      showErrorMessage('Please enter name')
    } else if (isEmpty(email)) {
      showErrorMessage('Please enter email')
    } else if (!isValidEmail(email)) {
      showErrorMessage('Please enter a valid email address')
    } else if (isEmpty(phone) || !isValidPhoneNo(phone)) {
      showErrorMessage('Please enter a valid phone number')
    } else {
      editProfile({first, last, email, phoneNumber: phone, imagePath, imageType, profileImg})
    }
  }

  renderProfileImage = () => {
    const {imagePath, profileImg = ''} = this.state
    const profileImage = isEmpty(imagePath) ? {uri: profileImg} : {uri: imagePath}
    return (
      <View style={styles.profileImageContainer}>
        <ImageLoad
          source={profileImage}
          placeholderSource={Images.defaultUser}
          borderRadius={50}
          isShowActivity style={styles.userIcon} />
        <View style={styles.changeImageContainer}>
          <TouchableOpacity onPress={this.showActionSheet}>
            <Text style={styles.changeImageText}>{I18n.t('changeImage')}</Text>
          </TouchableOpacity>
          <ActionSheet
            ref={o => this.ImageSheet = o}
            options={['Capture Image', 'Select from gallery', 'Remove Image', 'Cancel']}
            cancelButtonIndex={3}
            onPress={this.onImageActionPressed}
          />
        </View>
      </View>
    )
  }

  renderEditProfileForm = () => {
    const {name, email, phone, phoneNumber} = this.state
    return (
      <View style={styles.formView}>
        <Text style={styles.labelText}>{I18n.t('fullName')}</Text>
        <Input
          placeholder='Name'
          returnKeyType={'next'}
          isFocused={false}
          placeholderTextColor={Colors.darkLight}
          styleOverride={styles.inputContainer}
          onSubmitEditing={() => this.refs.email.focus()}
          onChangeText={(name) => this.setState({name})}
          value={name}
          />
        <Text style={styles.labelText}>{I18n.t('email')}</Text>
        <Input
          ref='email'
          value={email}
          placeholder='Email'
          returnKeyType={'next'}
          autoCapitalize={'none'}
          keyboardType='email-address'
          placeholderTextColor={Colors.darkLight}
          styleOverride={styles.inputContainer}
          onSubmitEditing={() => this.phone.focus()}
          onChangeText={(email) => this.setState({email})}
          />
        <Text style={styles.labelTextPhone}>{I18n.t('phoneNumber')}</Text>
        <MaskedPhone
          ref={ref => { this.phone = ref }}
          phoneNumber={phoneNumber}
          onSubmitEditing={() => { Keyboard.dismiss() }}
          phoneNumberFormat={phone} onChangeText={this.onChangePhoneNumber} />

        <FullButton
          onPress={this.updateProfile}
          text={I18n.t('saveChanges')}
        />
      </View>
    )
  }

  onImageActionPressed = (index) => {
    switch (index) {
      case 0:
        ImagePicker.openCamera(imageOptions).then(image => {
          const {path: imagePath, mime: imageType} = image
          if (imagePath) {
            this.setState({imagePath, imageType})
          }
        }).catch(err => {
          handlePermissionError(photosPermissionTypes.CAMERA)
        })
        break
      case 1:
        ImagePicker.openPicker(imageOptions).then(image => {
          const {path: imagePath, mime: imageType} = image
          if (imagePath) {
            this.setState({imagePath, imageType})
          }
        }).catch(err => {
          handlePermissionError(photosPermissionTypes.PHOTOS)
        })
        break
      case 2:
        this.setState({profileImg: '', imagePath: ''})
        break
    }
  }
  showActionSheet = () => {
    Keyboard.dismiss()
    this.ImageSheet.show()
  }

  render () {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent />
        <EventDetailsHeader title={I18n.t('editProfile')} fetching />
        {this.renderProfileImage()}
        <View style={styles.scrollContainer}>
          <InputScrollView>
            {this.renderEditProfileForm()}
          </InputScrollView>
        </View>
        <ProgressDialog hide={!this.props.fetching} />
      </SafeAreaView>
    )
  }
}
const mapStateToProps = ({user: {profile = {}, error, fetching}}) => {
  return {error, fetching, profile}
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (data) => dispatch(UserActions.editProfile(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
