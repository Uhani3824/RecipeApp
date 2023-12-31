import { FlatList, StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, recipeList } from "../Constant";

const RecipeCard = () => {
  const navigation = useNavigation();

  const cardContainer = {
    backgroundColor: colors.COLOR_LIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 16,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 26,
  };

  const recipeImage = {
    width: 150,
    height: 150,
    resizeMode: "center",
  };

  return (
    <View>
      <FlatList
        data={recipeList}
        renderItem={({ item }) => (
          // Recipe
          <Pressable
            onPress={() => navigation.navigate("RecipeDetail", { item: item })}
            style={cardContainer}
          >
            <Image source={item.image} style={recipeImage} />
            <Text>{item.name}</Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text>{item.time}</Text>
            </View>
          </Pressable>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RecipeCard;
