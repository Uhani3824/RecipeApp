import React, { useState, useEffect } from "react";
import {StyleSheet,ImageBackground,Text,View,TextInput,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,
Alert,} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setLoading(false);

      if (authUser) {
        navigation.replace("OnboardingScreen");
      }
    });

    return unsubscribe;
  }, []);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const register = async () => {
    if (userName === "" || email === "" || password === "") {
      showAlert("Please enter your credentials!", "");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      await setDoc(doc(db, "users", `${myUserUid}`), {
        userName: userName,
        email: user,
      });

      // Reset form fields
      setUserName("");
      setEmail("");
      setPassword("");

      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Registration error:", error.message);
      showAlert("Registration Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.centeredContainer}>
            <Text style={styles.header1}>Create an Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {/* Register button  */}
            <TouchableOpacity style={styles.button} onPress={register}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Back button  */}
            <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#006a4e',
  },
  centeredContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop:80,
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
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
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
