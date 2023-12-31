import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert,   KeyboardAvoidingView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  // const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("DashboardScreen");
        Alert.alert('Login Successful', 'Welcome back!');
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    });
  };

  const handleForgotPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent successfully.");
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error.message);
        });
    } else {
      console.error("Email is required for password reset.");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
      source={require('../../assets/LoginScreenBg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header1}>Welcome to </Text> 
        <Text style={styles.header2}>Recipe Book</Text>

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

        {/* Login button  */}
        <TouchableOpacity style={styles.smallButton} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Forgot Password button  */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login with Google */}
        <TouchableOpacity style={styles.button} >
          <Icon name="google" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>

        {/* Login with Facebook */}
        <TouchableOpacity style={styles.button} >
          <Icon name="facebook" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>

        {/* Create account button */}
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  header2: {
    fontSize: 44,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  smallButton: {
    width: '40%',
    backgroundColor: '#2E8B57',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    backgroundColor: '#2E8B57',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
  createAccountButton: {
    marginTop: 20,
  },
  createAccountText: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default LoginScreen;
