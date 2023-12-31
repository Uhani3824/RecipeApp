import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Welcome!</Text>
        {/* Profile button  */}
        <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
          <Image source={require('../../assets/NoUserImage.png')} style={styles.userImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconRow}>
          {/* Recipe button  */}
          <TouchableOpacity onPress={() => navigation.navigate('RecipeList')}>
            <View style={styles.icon}>
              <Image source={require('../../assets/recipe_icon.png')} style={styles.iconImage} />
              <Text style={styles.iconName}>Recipe</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#006a4e'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  icon: {
    alignItems: 'center',
    margin: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  iconName: {
    marginTop: 10,
    fontSize: 16,
    color: '#2E8B57',
  },
});

export default Dashboard;
