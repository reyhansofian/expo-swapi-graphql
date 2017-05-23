import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

class LoadingComponent extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoadingComponent;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
