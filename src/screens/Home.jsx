import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Button } from "react-native";
import { Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000CD",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  item: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 10,
    marginVertical: 5,
    width: 300,
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  extraButton: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const Home = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [pagina, setPagina] = useState(1);

  const fetchItensData = useCallback(async () => {
    try {
      const { data: response } = await axios.get(
        `https://cs2-api.vercel.app/api/items?page=${pagina}`
      );

      setItems([...items, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  }, [pagina, items]);

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
      <TouchableOpacity onPress={() => navegarDetalhes(item)}>
        <View style = {styles.container}>
          <Text style = {styles.item}>
            Nome: {item.name}
          </Text>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.item}>
            Raridade: {item.rarity.name} 
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data = {items}
        renderItem = {renderItem}
        onEndReached = {() => setPagina(pagina + 1)}
        keyExtractor = {(item) => item.id.toString()}
      />
      <Button title = "Ir para a Página Extra sobre Gatos" onPress = {navigateToPageExtra} />
    </SafeAreaView>
  );
};

export default Home;