import styles from './styles'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { FlatList, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

import I18n from '../../I18n'
import { Colors, Images } from '../../Themes/index'
import VectorIcon from '../../Components/VectorIcon'
import StudentItem from '../../Components/StudentItem'
import ImageLoad from '../../Components/ImageLoad'
import withPreventDoubleClick from '../../Lib/withPreventDoubleClick'
import AnimatedAlert from '../../Components/AnimatedAlert'
import UserActions from '../../Redux/UserRedux'
import { ProgressDialog } from '../../Components/ProgressDialog'

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

class ProfileScreen extends Component {

  componentDidMount () {
    this.props.getProfile(true)
  }

  renderProfileHeader = () => {
    return (
      <LinearGradient style={styles.gradient} start={{x: 0, y: 0}} end={{x: 0.5, y: 0}}
                      colors={[Colors.gradientC1, Colors.gradientC2]}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <View style={styles.profileHeader}>
          <TouchableOpacityEx onPress={Actions.pop} style={styles.backIconContainer}>
            <VectorIcon name={'ios-arrow-back'} type={'Ionicons'} style={styles.backIcon} />
          </TouchableOpacityEx>
          <Text style={styles.profile}>{I18n.t('profile')}</Text>
          <TouchableOpacityEx onPress={Actions.accountSettings} style={styles.iconContainer}>
            <VectorIcon name={'setting'} type={'AntDesign'} style={styles.settingIcon}/>
          </TouchableOpacityEx>
        </View>
      </LinearGradient>
    )
  }

  renderUserInfo = () => {
    const {profile: {name: {first = '', last = ''} = {}, profileImg = '', email = '', phoneNumber = ''} = {}} = this.props
    return (
      <>
        <ImageLoad source={{uri: profileImg}} isShowActivity
                   borderRadius={55} placeholderSource={Images.defaultUser} style={styles.userImage}/>
        <Text style={styles.name}>{`${first} ${last}`}</Text>
        <Text style={styles.regularText}>{email}</Text>
        <Text style={styles.regularText}>{phoneNumber}</Text>
        <TouchableOpacityEx onPress={Actions.editProfile}>
          <Text style={styles.editProfile}>{I18n.t('editProfile')}</Text>
        </TouchableOpacityEx>
      </>
    )
  }

  renderListItem = ({item}) => {
    return <StudentItem item={item}/>
  }

  renderStudents = () => {
    const {profile: {kids = []} = {}} = this.props
    return (
      <View style={styles.studentsContainer}>
        <Text style={styles.myStudents}>{I18n.t('myKids')}</Text>
        <FlatList
          data={kids}
          extraData={this.props}
          renderItem={this.renderListItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item = {}, index) => item.id || index}
          ListEmptyComponent={<AnimatedAlert show={true} color={Colors.frost} title={I18n.t('noKid')} />}
        />
      </View>
    )
  }

  render () {
    const {fetching} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <View style={[styles.iphoneXTopView, styles.profileBar]}/> : null}
        {this.renderProfileHeader()}
        {this.renderUserInfo()}
        {this.renderStudents()}
        <ProgressDialog hide={!fetching}/>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({user: {profile, error, fetching}}) => {
  return {error, fetching, profile}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (loading) => dispatch(UserActions.getProfile(loading))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
