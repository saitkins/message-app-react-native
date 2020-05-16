import React from 'react'
import {StyleSheet } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import {Colors, Fonts } from '../../Themes'

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: Colors.themeColor,
    borderColor: Colors.snow
  },
  tabStyle: {
    backgroundColor: Colors.snow,
    borderColor: Colors.transparent
  },
  tabText: {
    color: Colors.dark,
    fontSize: Fonts.size.mediumSmall,
    fontFamily: Fonts.type.sBold
  },
  activeTabText: {
    fontSize: Fonts.size.mediumSmall,
    fontFamily: Fonts.type.sBold,
    color: Colors.snow
  },
  tabsContainer: {
    height: 32
  }
})

export const SegmentedControl = ({
                                   values = [],
                                   selectedIndex = 0,
                                   onChange
}) => {
  return (
    <SegmentedControlTab
      activeTabStyle={styles.activeTab}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabText}
      tabsContainerStyle={styles.tabsContainer}
      activeTabTextStyle={styles.activeTabText}
      values={values}
      selectedIndex={selectedIndex}
      onTabPress={onChange}
      />
  )
}
