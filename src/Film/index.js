import Exponent from 'expo';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

@graphql(gql`
  query {
    allFilms {
      films {
        id
        title
      }
    }
  }
`)
class Film extends React.Component {
  static navigationOptions = {
      title: 'Film',
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(value) {
    const { navigation } = this.props;

    navigation.navigate('PlanetDetail', { id: value.id, title: value.title });
  }

  render() {
    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <ScrollView>
        {!this.props.data.loading && this.props.data.allFilms.films.map(v => (
          <View key={v.id}>
            <TouchableOpacity style={styles.messageInput} onPress={() => this.onPress(v)}>
              <Text>{v.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageInput: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 30,
  },
  statusBarUnderlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: Exponent.Constants.statusBarHeight,
    backgroundColor: '#888',
  },
});

export default Film;
