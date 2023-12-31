import { StyleSheet, View, Text, SafeAreaView, ScrollView,Pressable } from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";
import { FontAwesome } from "@expo/vector-icons";

const RecipeListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back button  */}
      <Pressable  onPress={() => navigation.goBack()}>
					<FontAwesome name={"arrow-circle-left"} size={28} color="white" />
				</Pressable>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recipes</Text>
        <RecipeCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor:'#006a4e'
  },
  header: {
    marginTop: 22,
    flex: 1,
  },
  headerText: {

	fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white',
	textAlign:'center',
  },
});

export default RecipeListScreen;
