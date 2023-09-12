import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Button, ScrollView, Text } from "react-native";
import axios from "axios";

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

const DetalhesItem = ({ route, navigation }) => {
  const { id } = route.params;
  const [itemDetalhes, setItemDetalhes] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const { data: response } = await axios.get(
          `https://cs2-api.vercel.app/api/items/?id=${id}`
        );
        setItemDetalhes(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style = {styles.container}>
          {itemDetalhes && (
            <>
              <View>
                <Text style = {styles.item}>
                  Nome: {itemDetalhes.name}
                </Text>
                <Image
                  source = {{ uri: itemDetalhes.image }}
                  style = {styles.image}
                />
                <Text style = {styles.item}>
                  Detalhes: {itemDetalhes.description}
                </Text>
                <Text style = {styles.item}>
                  Raridade: {itemDetalhes.rarity && itemDetalhes.rarity.name}
                </Text>
                {itemDetalhes.collections && itemDetalhes.collections.length > 0 && (
                  <>
                    <Text style = {styles.item}>
                      Coleção: {itemDetalhes.collections[0].name}
                    </Text>
                    <Image
                      source = {{ uri: itemDetalhes.collections[0].image }}
                      style = {styles.image}
                    />
                  </>
                )}
                <TouchableOpacity onPress={navigateHome} style = {styles.Button}>
                  <Text >
                    Voltar para Home
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetalhesItem;