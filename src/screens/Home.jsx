import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000CD",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 5,
    width: 300,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  extraButton: {
    backgroundColor: 'blue',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});

const Home = ({ navigation }) => {
  const [item, setItem] = useState([]);
  const [pagina, setPagina] = useState(1);

  const fetchItensData = useCallback(async () => {
    try {
      const { data: response } = await axios.get(
        `https://cs2-api.vercel.app/api/items?page=${pagina}`
      );

      setItem([...item, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  }, [pagina, item]);

  const navegarDetalhes = (item) => {
    console.log(item.id);
    navigation.navigate('Detalhes', { id: item.id });
  };

  const navigateToPageExtra = () => {
    navigation.navigate('PageExtra');
  };

  useEffect(() => {
    fetchItensData();
  }, [pagina]); 

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress = {() => navegarDetalhes(item)}>
        <View style = {styles.container}>
          <Text style = {styles.item}>
            {item.name}
          </Text>
          <Image source = {{ uri: item.image }} style = {styles.image} />
          <Text style = {styles.item}>
            {item.rarity}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Text>
        Home
      </Text> 
      <FlatList
        data = {item}
        renderItem = {renderItem}
        onEndReached = {() => setPagina(pagina + 1)}
        keyExtractor = {(item) => item.id.toString()} 
      />
      <TouchableOpacity onPress = {navigateToPageExtra} style = {styles.extraButton}>
        <Text>
          Ir para a Página Extra sobre Gatos
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
