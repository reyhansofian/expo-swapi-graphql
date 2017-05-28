import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DataHandler from '../DataHandler/DataHandler';

@graphql(gql`
    query($id: ID!) {
      species(id: $id) {
        name
        classification
        language
        averageHeight
        averageLifespan
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
class SpeciesDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  render() {
    const { species } = this.props.data;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{species.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Classification:</Text><Text> {species.classification}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Language:</Text><Text> {species.language}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Average Height:</Text><Text> {species.averageHeight} cm</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Average Lifespan:</Text><Text> {species.averageLifespan || 0} years</Text>
        </View>
      </View>
    );
  }
}

export default SpeciesDetail;

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
