import Expo from 'expo';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { StackNavigator } from 'react-navigation';

import App from './src/App';
import Film from './src/Film';
import FilmDetail from './src/Film/FilmDetail';
import People from './src/People';
import PeopleDetail from './src/People/PeopleDetail';
import Planet from './src/Planet';
import PlanetDetail from './src/Planet/PlanetDetail';
import Species from './src/Species';
import SpeciesDetail from './src/Species/SpeciesDetail';
import Starship from './src/Starship';
import StarshipDetail from './src/Starship/StarshipDetail';
import Vehicle from './src/Vehicle';
import VehicleDetail from './src/Vehicle/VehicleDetail';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://swapi-graphql-server-5c367817-1.9d3cfa08.cont.dockerapp.io:32768/',
  }),
});

const routes = {
  Home: {
    name: 'Home',
    screen: App,
  },
  Film: {
    name: 'Film',
    screen: Film,
  },
  FilmDetail: {
    name: 'FilmDetail',
    screen: FilmDetail,
  },
  People: {
    name: 'People',
    screen: People,
  },
  PeopleDetail: {
    name: 'PeopleDetail',
    screen: PeopleDetail,
  },
  Planet: {
    name: 'Planet',
    screen: Planet,
  },
  PlanetDetail: {
    name: 'PlanetDetail',
    screen: PlanetDetail,
  },
  Species: {
    name: 'Species',
    screen: Species,
  },
  SpeciesDetail: {
    name: 'SpeciesDetail',
    screen: SpeciesDetail,
  },
  Starship: {
    name: 'Starship',
    screen: Starship,
  },
  StarshipDetail: {
    name: 'StarshipDetail',
    screen: StarshipDetail,
  },
  Vehicle: {
    name: 'Vehicle',
    screen: Vehicle,
  },
  VehicleDetail: {
    name: 'VehicleDetail',
    screen: VehicleDetail,
  },
};

const MainApp = StackNavigator(routes);

class AppContainer extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainApp />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


Expo.registerRootComponent(AppContainer);
