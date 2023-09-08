import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
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
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
  Button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
  },
});

const ExtraPage = ({ navigation }) => {
  const [cat, setCat] = useState([]);

  const fetchCat = useCallback(async () => {
    try {
      const { data: response } = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=10`
      );
      setCat(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCat()
  }, []);

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style = {styles.container}>
      <Text>
        Página extra
      </Text>
      <FlatList
        data = {cat}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {({ item }) => (
          <View style = {styles.item}>
            <Image source = {{ uri: item.url }} style = {styles.image} />
          </View>
        )}
      />
      <TouchableOpacity onPress = {navigateHome} style = {styles.Button}>
        <Text>
          Voltar para Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExtraPage;