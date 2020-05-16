import React, {Component} from 'react'
import {StatusBar, Platform, AppState} from 'react-native'
import {connect} from 'react-redux'
import NavigationRouter from '../Navigation/NavigationRouter'
import { Actions } from 'react-native-router-flux'
import { checkConnected, setBadge } from '../Lib/Utilities'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
// Styles
import { Colors } from '../Themes'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount () {
    StatusBar.setBarStyle('light-content')
    Platform.OS === 'android' && StatusBar.setBackgroundColor(Colors.gradientC2)
    checkConnected()
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    const { appState } = this.state
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.tron.warn('App has come to the foreground!')
      setBadge(0)
    }
    this.setState({ appState: nextAppState })
  };

  backHandler = () => {
    const prevScene = Actions.currentScene
    Actions.pop()
    return Actions.currentScene !== prevScene
  }

  render () {
    return (
      <NavigationRouter />
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
