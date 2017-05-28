import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Entypo } from '@expo/vector-icons';

import DataHandler from '../DataHandler/DataHandler';

@graphql(gql`
  query {
    allStarships {
      starships {
        id
        name
      }
    }
  }
`)
@DataHandler
class Starship extends React.Component {
  static navigationOptions = {
      title: 'Starship',
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(value) {
    const { navigation } = this.props;

    navigation.navigate('StarshipDetail', { id: value.id, name: value.name });
  }

  render() {
    return (
      <ScrollView>
        {!this.props.data.loading && this.props.data.allStarships.starships.map(v => (
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

export default Starship;
