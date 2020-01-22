import React, { useReducer } from 'react';
import { StyleSheet, FlatList, Text, View, StatusBar, TextInput, Image, ActivityIndicator} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, text: '' }
    this.arrayholder = []
  }

  componentDidMount() {
    this.getData()
    
  }

  getData = async () => {
    const url = 'https://gateway.marvel.com/v1/public/characters?ts=1579541853&apikey=8343a00d63acbfaea58ca2029759e1e3&hash=e2ce54eeb0cef26146a2a661907f64fb';
    fetch(url).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        data: responseJson.data.results
      },
      function() {
        this.arrayholder = responseJson.data.results
      }
      )
    })
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      text: text,
    });
  }
 
  renderRow = ({item}) => {
    return (
      <View style={styles.wrapperList}>
        <Image 
        style={styles.imgList}
        source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}}
        />
        <Text style={styles.nameComic}>{item.name}</Text>
      </View>
    )
  }
  render(){
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center",  }}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    return (
      <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
     
      <View style={styles.titles}>
        <Text style={styles.title}>Busca Marvel</Text>
        <Text style={styles.titleTest}> Teste Front-end</Text>
      </View>
      <View style={styles.harLine}>
      </View>
      <View style={styles.searchComics}>
        <Text style={styles.labelComics}>Nome do Personagem</Text>
        <TextInput 
        style={styles.searchInput}
        placeholder="Buscar Herois" 
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        onChangeText={text => this.SearchFilterFunction(text)}
        value={this.state.text}
        />
      </View>
      <View style={styles.wrapperBar}>
        <Text style={styles.barName}>Nome</Text>
      </View>
      <FlatList
        data={this.state.data}
        renderItem={this.renderRow}
        enableEmptySections={true}
        keyExtractor={(item, index) => index.toString()}
      />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: '#fff',
  },
  titles: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginTop: 25
  },
  title: {
    color: '#d42026',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  titleTest: {
    color: '#d42026',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  harLine: {
    height: 3,
    width: 50,
    backgroundColor: '#d42026',
    marginTop: 2,
    marginBottom: 10,
    marginLeft: 25
  },
  labelComics: {
    color: '#d42026',
    fontSize: 16,
    paddingHorizontal: 25
  },
  searchInput: {
    height: 35,
    backgroundColor: '#fff',
    color: '#333',
    margin: 1,
    borderRadius: 2,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 4,
        height: 4,
    },
    elevation: 2,
    marginHorizontal: 25,
    marginBottom: 12
  },
  wrapperBar: {
    backgroundColor:'#d42026',
  },
  barName: {
    color: '#fff',
    paddingLeft: 90,
    paddingVertical: 5,
    fontSize: 16,
  },
  wrapperList: {
    flexDirection: 'row',
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#d42026',
  },
  imgList: {
    width: 50,
    height:50,
    borderRadius: 50
  },
  nameComic: {
    fontSize: 20,
    textAlignVertical: 'center',
    marginLeft: 20,
  }
});
