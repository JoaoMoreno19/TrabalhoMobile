import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000CD",
  },
  itemText: {
    backgroundColor: "#0000CD",
    color: "#808080",
    fontSize: 25,
    padding: 15,
  },
  imageCss: {
    backgroundColor: "#0000CD",
    width: 500,
    height: 400,
  },
  divisao: {
    backgroundColor: "#DCDCDC",
    width: 700,
    height: 6,
  },
});

const Home = ({ navigation }) => {
  const [csgo, setCsgo] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const fetchCsgoData = useCallback(async () => {
    try {
      const { data: response } = await axios.get(
        `https://cs2-api.vercel.app/api/items?page=${paginaAtual}`
      );

      setCsgo([...csgo, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  }, [paginaAtual, csgo]);

  const navegarDetalhes = (item) => {
    console.log(item.id);
    navigation.navigate('Detalhes', { id: item.id });
  };

  useEffect(() => {
    fetchCsgoData();
  }, [paginaAtual]); 

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navegarDetalhes(item)}>
        <View style={styles.container}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image source={{ uri: item.image }} style={styles.imageCss} />
          <Text style={styles.itemText}>{item.rarity}</Text>
        </View>
        <View style={styles.divisao}></View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data = {csgo}
        renderItem = {renderItem}
        onEndReached = {() => setPaginaAtual(paginaAtual + 1)}
        keyExtractor = {(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Home;
