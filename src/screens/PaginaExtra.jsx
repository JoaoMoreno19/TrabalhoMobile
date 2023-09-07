import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0fdff",
  },
  itemText: {
    color: "black",
    fontSize: 20,
    padding: 10,
  },
  imageCss: {
    width: 360,
    height: 400,
  },
  imageCssColection: {
    width: 100,
    height: 100,
  },
});

const DetalhesItem = ({ route }) => {
  const { id } = route.params;
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
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
    <View style={styles.container}>
      {itemDetails && (
        <>
          <View>
            <Text>Coleção: {itemDetails.collections[0].name}</Text>
            <Image source={{ uri: itemDetails.collections[0].image }} style={styles.imageCssColection} />
          </View>
        </>
      )}
    </View>
    </SafeAreaView> 
  );
};

export default DetalhesItem;
