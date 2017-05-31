import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DataHandler from '../DataHandler/DataHandler';

@graphql(gql`
    query($id: ID!) {
      person(id: $id) {
        name
        height
        birthYear
        homeworld {
          id
          name
        }
      }
    }
`, {
  options: (props) => ({
    variables: {
      id: props.navigation.state.params.id,
    },
  }),
})
@DataHandler
class PeopleDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  render() {
    const { person } = this.props.data;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{person.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Birth Year:</Text><Text> {person.birthYear}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Height:</Text><Text> {person.height} cm</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Homeworld:</Text><Text> {person.homeworld.name}</Text>
        </View>
      </View>
    );
  }
}

export default PeopleDetail;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  openingCrawlContainer: {
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
  },
  openingCrawlText: {
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  messageInput: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 30,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
