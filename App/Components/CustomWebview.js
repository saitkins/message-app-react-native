import React from 'react'
import { connect } from 'react-redux'
import Styles from './Styles/CustomWebviewStyle'
import { SafeAreaView, StatusBar, WebView } from 'react-native'
import { showMessage } from '../Lib/Utilities'
import { Actions as NavigationActions } from 'react-native-router-flux'
import AlertMessage from './AlertMessage'
import {isEmpty} from 'lodash'
import { Metrics } from '../Themes'
import styles from '../Containers/SubmitAppIdea/styles'
import EventDetailsHeader from './EventDetailsHeader'
import { ProgressDialog } from './ProgressDialog'

class CustomWebview extends React.Component {
  state: {
    isLoading: boolean
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      isLoading: navState.loading,
      scalesPageToFit: true
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      scalesPageToFit: true,
      isLoading: false,
      loadingError: false
    }
  }

  componentDidMount () {
    const {isVideoUrl, title} = this.props
    if (isVideoUrl) {
      NavigationActions.refresh({hideNavBar: true})
    }
    if (title) {
      NavigationActions.refresh({title})
    }
  }

  renderLoading = () => {
    return (
      <ProgressDialog hide={false} />
    )
  }

  render () {
    let {url, html, title} = this.props
    const contentInsets = {top: 0, left: 10, bottom: 0, right: 5}
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent />
        <EventDetailsHeader title={title} fetching />
        {
          isEmpty(html) && isEmpty(url)
            ? <AlertMessage messageStyle={{marginBottom: Metrics.navBarHeight}}
              title={'Unable to load the page. Please try later.'}
              IconClass={null}
            />
            : <WebView
              onNavigationStateChange={this.onNavigationStateChange}
              source={html ? {html} : {uri: url}}
              injectedJavaScript={''}
              javaScriptEnabled
              contentInset={contentInsets}
              allowsInlineMediaPlayback
              renderLoading={this.renderLoading}
              startInLoadingState
              onError={(e) => {
                showMessage(e.nativeEvent.description)
              }}
              style={Styles.webView} />
        }
      </SafeAreaView>
    )
  }
}

export default connect(null)(CustomWebview)
