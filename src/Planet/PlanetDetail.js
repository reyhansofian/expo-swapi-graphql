import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import DataHandler from '../DataHandler/DataHandler';

@graphql(gql`
    query($id: ID!) {
      planet(id: $id) {
        name
        diameter
        rotationPeriod
        orbitalPeriod
        gravity
        population
        climates
        terrains
        surfaceWater
        residentConnection {
          edges {
            node {
              id
              name
            }
          }
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
class PlanetDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  constructor(props) {
    super(props);

    this.state = {
      resident: [],
    };

    this.renderResident = this.renderResident.bind(this);
  }

  renderResident = (resident) => (
    <View>
      <Text>• {resident}</Text>
    </View>
  );

  render() {
    const { planet } = this.props.data;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const residents = ds.cloneWithRows(planet.residentConnection.edges.map(res => res.node.name));

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{planet.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Diameter:</Text><Text> {planet.diameter} km</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Orbital Period:</Text><Text> {planet.orbitalPeriod} years</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Rotation Period:</Text><Text> {planet.rotationPeriod} years</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Gravitiy:</Text><Text> {planet.gravity}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Population:</Text><Text> {planet.population}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Climates:</Text><Text> {planet.climates.join(', ')}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Terrains:</Text><Text> {planet.terrains.join(', ')}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Residents:</Text>
          <ListView
            dataSource={residents}
            renderRow={this.renderResident}
            enableEmptySections
          />
        </View>
      </View>
    );
  }
}

export default PlanetDetail;

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
