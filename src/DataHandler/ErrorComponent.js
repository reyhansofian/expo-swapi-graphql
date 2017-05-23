import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

class ErrorComponent extends Component {
  render() {
    return (
      <View style={styles.errorContainer}>
        <Text>Oops. Something went wrong</Text>
        <Text>{this.props.error.toString()}</Text>
      </View>
    );
  }
}

export default ErrorComponent;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
