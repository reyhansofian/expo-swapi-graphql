import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import LoadingComponent from '../DataHandler/LoadingComponent';
import ErrorComponent from '../DataHandler/ErrorComponent';

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
    if (this.props.data.error) {
      return (
        <ErrorComponent error={this.props.data.error} />
      );
    }

    if (this.props.data.loading) {
      return (
        <LoadingComponent />
      );
    }

    return (
      <ScrollView>
        {!this.props.data.loading && this.props.data.allPeople.people.map(v => (
          <View key={v.id}>
            <TouchableOpacity style={styles.rowContainer} onPress={() => this.onPress(v)}>
              <View style={styles.container}>
                <View>
                  <Text>{v.name}</Text>
                </View>
                <View>
                  <Entypo name="chevron-small-right" size={15} />
                </View>
              </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 30,
  },
});

export default People;
