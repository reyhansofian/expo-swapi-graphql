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
import { gql, graphql } from 'react-apollo';

import DataHandler from '../DataHandler/DataHandler';

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
@DataHandler
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
