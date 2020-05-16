import React, { Component } from 'react'
import Communications from 'react-native-communications'
import { Image, Linking, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity } from 'react-native'

import styles from './styles'
import I18n from '../../I18n'
import { AppUrl, WebUrl } from '../../Lib/AppConstants'
import { AboutDescription } from '../../DummyData'
import FullButton from '../../Components/FullButton'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import { Images } from '../../Themes'
import AppConfig from '../../Config/AppConfig'

export default class AboutUs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description: ''
    }
  }
  sendEmail = () => {
    Communications.email(['support@usebindr.com'], null, null, '', '')
  }

  render () {
    const version = 'Version 1.0.0'
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent />
        <EventDetailsHeader title={I18n.t('about')} fetching />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
          <Image source={Images.logo} style={styles.logo} />
          <Text style={styles.version}>{version}</Text>
          <Text style={styles.copyright}>{I18n.t('copyright')}</Text>
          <Text style={styles.description}>{AboutDescription}</Text>
          <TouchableOpacity style={styles.urlContainer} onPress={() => Linking.openURL(WebUrl[AppConfig.env])}>
            <Text style={styles.url}>{WebUrl[AppConfig.env]}</Text>
          </TouchableOpacity>
          <FullButton onPress={this.sendEmail} text={I18n.t('contactUs')} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
