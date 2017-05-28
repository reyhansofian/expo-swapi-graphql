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
      starship(id: $id) {
        name
        model
        starshipClass
        manufacturers
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
        hyperdriveRating
        cargoCapacity
        consumables
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
class StarshipDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  render() {
   const { starship } = this.props.data;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{starship.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Class:</Text><Text> {starship.starshipClass}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Model:</Text><Text> {starship.model}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Manufacturers:</Text><Text> {starship.manufacturers.join(', ')}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Cost:</Text><Text> {starship.costInCredits}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Length:</Text><Text> {starship.length} m</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Crew:</Text><Text> {starship.crew}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Passengers:</Text><Text> {starship.passengers}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Max Atmosphering Speed:</Text><Text> {starship.maxAtmospheringSpeed}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Hyperdrive Rating:</Text><Text> {starship.hyperdriveRating}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Cargo Capacity:</Text><Text> {starship.cargoCapacity}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Consumables:</Text><Text> {starship.consumables}</Text>
        </View>
      </View>
    );
  }
}

export default StarshipDetail;

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
