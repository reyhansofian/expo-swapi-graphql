import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { routes } from '../routes';

class App extends React.Component {
  static navigationOptions = {
      title: 'Home',
  };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(routes),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData) {
    if (rowData.name === 'Home') { return (<View />); }

    const { navigation } = this.props;

    return (
      <TouchableHighlight
        onPress={() => {
          const { path, params, screen } = routes[rowData.name];
          const { router } = screen;
          const action = path && router.getActionForPathAndParams(path, params);
          navigation.navigate(rowData.name, {}, action);
        }}
        underlayColor="rgba(0,0,0,0)"
      >
        <View>
          <View style={styles.row}>
            <Ionicons name={rowData.icon.type} size={55} color="red" />
            <Text style={styles.text}>
              {rowData.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

export default App;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null,
  },
});
