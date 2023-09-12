import React, { useEffect, useState  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
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

const ExtraPage = ({ navigation }) => {
  const [cat, setCat] = useState([]);

  const fetchCat = async () => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=10`
      );
      setCat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCat()
  }, []);

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style = {styles.container}>
      <ScrollView>
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
            Voltar para a tela Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ExtraPage;