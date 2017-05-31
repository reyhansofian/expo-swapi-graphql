import React, { Component, PropTypes } from 'react';
import { gql, graphql } from 'react-apollo';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';

import DataHandler from '../DataHandler/DataHandler';

@graphql(gql`
    query($id: ID!) {
      film(id: $id) {
        title
        openingCrawl
        director
        producers
        releaseDate
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
class FilmDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { film } = this.props.data;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{film.title}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Released Date:</Text><Text> {moment(film.releaseDate).format('DD MMMM Y')}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Director:</Text><Text> {film.director}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Producers:</Text><Text> {film.producers.join(', ')}</Text>
        </View>
        <View style={styles.openingCrawlContainer}>
          <Text style={styles.openingCrawlText}>{film.openingCrawl}</Text>
        </View>
      </View>
    );
  }
}

export default FilmDetail;

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
  rowContainer: {
    flexDirection: 'row',
  },
});
