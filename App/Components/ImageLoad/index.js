import React from 'react'
import {isEmpty} from 'lodash'
import styles from './styles'
import PropTypes from 'prop-types'
import Images from '../../Themes/Images'
import { Image, ImageBackground, ActivityIndicator, View } from 'react-native'

export default class ImageLoad extends React.Component {
  static propTypes = {
    isShowActivity: PropTypes.bool
  };

  static defaultProps = {
    isShowActivity: true
  };

  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isError: false
    }
  }

  onLoadEnd ({nativeEvent = {}}) {
    this.setState({
      isLoaded: true
    })
  }

  onError ({nativeEvent}) {
    this.setState({
      isError: true
    })
  }

  render () {
    const {
      style, source, resizeMode, borderRadius, backgroundColor, children,
      loadingStyle, placeholderSource, placeholderStyle,
      customImagePlaceholderDefaultStyle
    } = this.props
    const finalSource = (typeof source === 'object' && isEmpty(source)) || !source || (source.hasOwnProperty('uri') && !source.uri) ? placeholderSource : source
    return (
      <ImageBackground
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={this.onError.bind(this)}
        style={[styles.backgroundImage, style]}
        source={finalSource}
        resizeMode={resizeMode}
        borderRadius={borderRadius}
      >
        {
          (this.state.isLoaded && !this.state.isError) ? children
            : <View
              style={[styles.viewImageStyles, { borderRadius: borderRadius }, backgroundColor ? { backgroundColor: backgroundColor } : {}]}
            >
              {
                (this.props.isShowActivity && !this.state.isError) &&
                <ActivityIndicator
                  style={styles.activityIndicator}
                  size={loadingStyle ? loadingStyle.size : 'small'}
                  color={loadingStyle ? loadingStyle.color : 'gray'}
                />
              }
              <Image
                style={placeholderStyle || [styles.imagePlaceholderStyles, customImagePlaceholderDefaultStyle]}
                source={placeholderSource || Images.defaultImage}
               />
            </View>
        }
        {
          this.props.children &&
          <View style={styles.viewChildrenStyles}>
            {
              this.props.children
            }
          </View>
        }
      </ImageBackground>
    )
  }
}
