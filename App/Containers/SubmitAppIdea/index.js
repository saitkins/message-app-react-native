import React, { Component } from 'react'
import {isEmpty, trim} from 'lodash'
import InputScrollView from 'react-native-input-scroll-view'
import { SafeAreaView, StatusBar, TextInput, View, Keyboard } from 'react-native'

import styles from './styles'
import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import FullButton from '../../Components/FullButton'
import EventDetailsHeader from '../../Components/EventDetailsHeader'
import UserActions from '../../Redux/UserRedux'
import { connect } from 'react-redux'
import { ProgressDialog } from '../../Components/ProgressDialog'
import { showMessage } from '../../Lib/Utilities'

class SubmitAppIdea extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idea: ''
    }
  }

  onSubmitAppIdea = () => {
    Keyboard.dismiss()
    const {idea} = this.state
    const {submitAppIdea} = this.props
    if (!isEmpty(trim(idea))) {
      submitAppIdea({idea: trim(idea)})
    } else {
      showMessage('Please enter some details')
    }
  }

  render () {
    const {idea} = this.state
    const {fetching} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent />
        <EventDetailsHeader title={I18n.t('submitAppIdea')} fetching />
        <View style={styles.scrollContainer}>
          <InputScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.innerContainer}>
              <TextInput multiline textAlignVertical={'top'}
                value={idea}
                onChangeText={(idea) => { this.setState({idea}) }}
                style={styles.input} placeholder={I18n.t('writeDetails')}
                placeholderTextColor={Colors.lightText} />
              <FullButton text={I18n.t('submitAppIdea')} onPress={this.onSubmitAppIdea} />
            </View>
          </InputScrollView>
        </View>
        <ProgressDialog hide={!fetching} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({user: {error, fetching}}) => {
  return {error, fetching}
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitAppIdea: (data) => dispatch(UserActions.submitAppIdea(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitAppIdea)
