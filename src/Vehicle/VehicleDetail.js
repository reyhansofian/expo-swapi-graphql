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
      vehicle(id: $id) {
        name
        model
        vehicleClass
        manufacturers
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
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
class VehicleDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  render() {
    const { vehicle } = this.props.data;
    console.log(vehicle);

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{vehicle.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Model:</Text><Text> {vehicle.model}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Class:</Text><Text> {vehicle.vehicleClass}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Cost:</Text><Text> {vehicle.costInCredits}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Length:</Text><Text> {vehicle.length}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Crew:</Text><Text> {vehicle.crew}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Passengers:</Text><Text> {vehicle.passengers}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Max Atmosphering Speed:</Text><Text> {vehicle.maxAtmospheringSpeed}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Capacity:</Text><Text> {vehicle.cargoCapacity}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Consumeables:</Text><Text> {vehicle.consumables}</Text>
        </View>
      </View>
    );
  }
}

export default VehicleDetail;

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
