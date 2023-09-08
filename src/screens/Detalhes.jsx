import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";

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
  Button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
  },
});

const DetalhesItem = ({ route }) => {
  const { id } = route.params;
  const [itemDetalhes, setItemDetalhes] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        console.log(id)
        const { data: response } = await axios.get(
          `https://cs2-api.vercel.app/api/items/?id=${id}`
        );
        console.log(response)
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
        <View style={styles.container}>
          {itemDetalhes && (
            <>
              <View>
                <Text style = {styles.item}>
                  {itemDetalhes.name}
                </Text>
                <Image source = {{ uri: itemDetalhes.image }} style = {styles.image} />
                <Text style = {styles.item}>
                  Item detalhes: 
                </Text>
                <Text style = {styles.item}>
                  {itemDetalhes.description}
                </Text>
                <Text style = {styles.item}>
                  Raridade: {itemDetalhes.rarity}
                </Text>
                {itemDetalhes.collections && 
                  <>
                    <Text style = {styles.item}>
                      Coleção: {itemDetalhes.collections[0].name}
                    </Text>
                    <Image source = {{ uri: itemDetalhes.collections[0].image }} style = {styles.image} />
                  </>
                }
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity onPress = {navigateHome} style = {styles.Button}>
        <Text>
          Voltar para Home
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DetalhesItem;
