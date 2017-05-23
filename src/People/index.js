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

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

@graphql(gql`
    query {
      allPeople{
        people {
          id
          name
        }
      }
    }
`)
class People extends React.Component {
  static navigationOptions = {
      title: 'People',
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(value) {
    const { navigation } = this.props;

    navigation.navigate('PeopleDetail', { id: value.id, name: value.name });
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
        {!this.props.data.loading && this.props.data.allPeople.people.map(v => (
          <View key={v.id}>
            <TouchableOpacity style={styles.messageInput} onPress={() => this.onPress(v)}>
              <Text>{v.name}</Text>
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

export default People;
