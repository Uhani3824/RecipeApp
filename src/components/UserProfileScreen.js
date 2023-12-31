import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,Image,TouchableOpacity,Alert,ImageBackground,StyleSheet,Pressable,} from 'react-native';
import { auth, database, storage } from './firebase'; 
import * as ImagePicker from 'expo-image-picker';

const UserProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const userRef = database.ref(`users/${auth.currentUser.uid}`);
      const snapshot = await userRef.once('value');

      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUsername(userData.username);
      }
    } catch (error) {
      console.error('Error loading profile data:', error.message);
    }
  };

  const saveProfileData = async () => {
    try {
      const profilePictureURL = await uploadProfilePicture();
      const userRef = database.ref(`users/${auth.currentUser.uid}`);
      userRef.set({
        username: username,
        profilePicture: profilePictureURL,
      });
      Alert.alert('Profile Updated', 'Your profile has been successfully updated!');
    } catch (error) {
      console.error('Error saving profile data:', error.message);
      Alert.alert('Error', 'Failed to save profile data. Please try again.');
    }
  };

  const uploadProfilePicture = async () => {
    if (!profilePicture) {
      return null;
    }

    const response = await fetch(profilePicture.uri);
    const blob = await response.blob();

    const storageRef = storage.ref();
    const profilePictureRef = storageRef.child(`profilePictures/${auth.currentUser.uid}`);

    await profilePictureRef.put(blob);

    const downloadURL = await profilePictureRef.getDownloadURL();

    return downloadURL;
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfilePicture(result);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Profile Image */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profilePicture
                ? { uri: profilePicture.uri }
                : require('../../assets/NoUserImage.png')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>
          {editMode ? 'Enter your username' : username}
        </Text>

        {editMode && (
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        )}

        {/* Edit Button */}
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => setEditMode(!editMode)}
        >
          <Text style={styles.buttonText}>
            {editMode ? 'Cancel' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>

        {/* Save Profile Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveProfileData();
            setEditMode(false);
          }}
        >
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006a4e',
  },
  profileContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    borderColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: 'white',
  },
  button: {
    width: '80%',
    backgroundColor: '#2E8B57',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 20,
    textDecorationLine:'underline',
  },
});

export default UserProfileScreen;
