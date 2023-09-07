import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  itemText: {
    color: "#00FF00",
    fontSize: 20,
    padding: 10,
  },
  itemTextTitle: {
    color: "#00FF00",
    fontSize: 20,
    padding: 5,
  },
  imageCss: {
    width: 360,
    height: 400,
  },
  imageCssColection: {
    width: 275,
    height: 275,
    margin: 50
  },
  Space: {
    height: 200,
    width: 400,
    backgroundColor: "#000"
  }
});

const DetalhesItem = ({ route }) => {
  const { id } = route.params;
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        console.log(id)
        const { data: response } = await axios.get(
          `https://cs2-api.vercel.app/api/items/?id=${id}`
        );
        console.log(response)
        setItemDetails(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItemDetails();
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>
      {itemDetails && (
        <>
          <View>
            <Text style={styles.itemTextTitle}>{itemDetails.name}</Text>
            <Image source={{ uri: itemDetails.image }} style={styles.imageCss} />
            <Text style={styles.itemTextTitle}>Descrição: </Text>
              <Text style={styles.itemText}>{itemDetails.description}</Text>
              <Text style={styles.itemText}>Raridade: {itemDetails.rarity}</Text>
            {itemDetails.collections && 
              <>
                <Text style={styles.itemText}>Coleção: {itemDetails.collections[0].name}</Text>
                <Image source={{ uri: itemDetails.collections[0].image }} style={styles.imageCssColection} />
              </>
            }
            
          </View>
        </>
      )}
    </View>
    <View style={styles.Space}></View>
    </ScrollView>
    </SafeAreaView>
    
  );
};

export default DetalhesItem;
