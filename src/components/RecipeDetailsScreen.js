import React from 'react';
import {Image,SafeAreaView,StyleSheet,Text,View,Pressable,Dimensions,ScrollView,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RecipeDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  console.log(item);
  return (
    <View style={{ backgroundColor: item.color, flex: 1 }}>
      <SafeAreaView style={styles.headerContainer}>
		{/* Back Button */}
        <Pressable style={styles.goBackBtn} onPress={() => navigation.goBack()}>
          <FontAwesome name={'arrow-circle-left'} size={28} color="white" />
        </Pressable>
      </SafeAreaView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.recipeImage} />
        </View>

        {/* Recipe Name */}
        <Text style={styles.recipeName}>{item.name}</Text>

        <View style={styles.detailsContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Recipe Description */}
            <Text style={styles.description}>{item.description}</Text>

            {/* Recipe Extra Details */}
            <View style={styles.extraDetailsContainer}>
              <View style={[styles.extraDetail, styles.timeDetail]}>
                <Text style={styles.icon}>⏰</Text>
                <Text style={styles.detailText}>{item.time}</Text>
              </View>
              <View style={[styles.extraDetail, styles.difficultyDetail]}>
                <Text style={styles.icon}>🥣</Text>
                <Text style={styles.detailText}>{item.difficulty}</Text>
              </View>
              <View style={[styles.extraDetail, styles.caloriesDetail]}>
                <Text style={styles.icon}>🔥</Text>
                <Text style={styles.detailText}>{item.calories}</Text>
              </View>
            </View>

            {/* Recipe Ingredients */}
            <View style={styles.ingredientsContainer}>
              <Text style={styles.ingredientsTitle}>Ingredients:</Text>
              {item.ingredients.map((ingredient, index) => (
                <View style={styles.ingredientItem} key={index}>
                  <View style={styles.bulletPoint}></View>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            {/* Recipe Steps */}
            <View style={styles.stepsContainer}>
              <Text style={styles.stepsTitle}>Steps:</Text>
              {item.steps.map((step, index) => (
                <Text style={styles.stepText} key={index}>{`${index + 1} ) ${step}`}</Text>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  goBackBtn: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 140,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageContainer: {
    height: 300,
    width: 300,
    position: 'absolute',
    top: -150,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  recipeName: {
    marginTop: 150,
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  description: {
    fontSize: 20,
    marginVertical: 16,
  },
  extraDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extraDetail: {
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
  },
  icon: {
    fontSize: 40,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '400',
  },
  timeDetail: {
    backgroundColor: 'rgba(255, 0, 0, 0.38)',
  },
  difficultyDetail: {
    backgroundColor: 'rgba(135, 206, 235, 0.8)',
  },
  caloriesDetail: {
    backgroundColor: 'rgba(255, 165, 0, 0.48)',
  },
  ingredientsContainer: {
    alignSelf: 'flex-start',
    marginVertical: 22,
  },
  ingredientsTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  bulletPoint: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  ingredientText: {
    fontSize: 18,
    marginLeft: 6,
  },
  stepsContainer: {
    alignSelf: 'flex-start',
    marginVertical: 22,
  },
  stepsTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
  },
  stepText: {
    fontSize: 18,
    marginLeft: 6,
    marginVertical: 6,
  },
});

export default RecipeDetailsScreen;
