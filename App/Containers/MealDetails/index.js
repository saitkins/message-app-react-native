import moment from 'moment'
import styles from './styles'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'

import Colors from '../../Themes/Colors'
import MealsActions from '../../Redux/MealsRedux'
import { DATE_FORMATS } from '../../Lib/AppConstants'
import CustomIcon from '../../Components/Icons/CustomIcons'
import ReminderDialog from '../../Components/ReminderDialog'
import { ProgressDialog } from '../../Components/ProgressDialog'
import EventDetailsHeader from '../../Components/EventDetailsHeader'

class MealDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false
    }
  }

  componentDidMount () {
    const {mealId} = this.props
    this.props.getMealDetails(mealId)
  }

  renderDetailsRow = (label, details, iconName) => {
    return (
      <View style={styles.detailItem}>
        <CustomIcon style={styles.icon} name={iconName} />
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>{label}</Text>
          {details.map((item) => {
            return <Text style={styles.itemValue}>{item}</Text>
          })}
        </View>
      </View>
    )
  }

  renderDate = () => {
    const {mealDetails: {startDate = ''} = {}} = this.props
    const formattedDate = moment(startDate).format(DATE_FORMATS.displayFormat)
    return (
      <View style={styles.dateContainer}>
        <CustomIcon style={styles.dateIcon} name={'calendar'} />
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    )
  }

  likeEvent = () => {
    const {mealDetails: {_id: mealId, liked} = {}, likeRemindMeal} = this.props
    !liked && this.setState({showDialog: true})
    likeRemindMeal({mealId, action: 'like'})
  }

  setReminder = () => {
    const {mealDetails: {_id: mealId} = {}, likeRemindMeal} = this.props
    likeRemindMeal({mealId, action: 'remind'})
  }

  render () {
    const {showDialog} = this.state
    const {mealDetails: {name = '', menu: {entrees = [], vegetables = [], fruits = [], drinks = [], miscs = []} = {}, liked = false, reminded = false} = {}, fetching, updating} = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
        <EventDetailsHeader fetching={fetching} liked={liked} reminder={reminded}
          onPressFav={this.likeEvent} onPressRemind={this.setReminder} />
        {!fetching && <ScrollView contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{name}</Text>
          {this.renderDate()}
          {this.renderDetailsRow(I18n.t('entree'), entrees, 'meals')}
          {this.renderDetailsRow(I18n.t('vegetables'), vegetables)}
          {this.renderDetailsRow(I18n.t('fruit'), fruits)}
          {this.renderDetailsRow(I18n.t('drink'), drinks)}
          {this.renderDetailsRow(I18n.t('misc'), miscs)}
        </ScrollView> }
        {showDialog && !updating && <ReminderDialog
          acceptTitle={I18n.t('gotIt')}
          message={I18n.t(reminded ? 'lovedMessageMeal' : 'reminderMessageMeal')}
          onAccept={() => this.setState({showDialog: false})} /> }
        <ProgressDialog hide={!fetching && !updating} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({meals: {fetching, updating, error, mealDetails = {}}}) => {
  return {
    fetching, updating, error, mealDetails
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMealDetails: (mealId) => dispatch(MealsActions.getMealDetails(mealId)),
    likeRemindMeal: (params) => dispatch(MealsActions.likeMeal(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MealDetails)
