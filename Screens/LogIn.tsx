import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';



const LogInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google');
    // Add your Google login logic here
  };

  return (
    <ImageBackground
      source={require('../assets/Backgrounds/MainFordLogo.jpg')}
      style={styles.LoginBackground}
      resizeMode="cover"
    >
      <View style={styles.LoginOverlay} />

      <View style={styles.SignInContainer}>
        <Text style={styles.LogInText}>SIGN IN</Text>

        {/* Email Input */}
        <View style={styles.LoginInputSection}>
          <Text style={styles.LoginLabel}>Email*</Text>
          <TextInput
            style={styles.LoginInput}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.LoginInputSection}>
          <Text style={styles.LoginLabel}>Password*</Text>
          <TextInput
            style={styles.LoginInput}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.LoginButton}
          onPress={handleLogin}
          accessibilityHint="Tap to log in"
        >
          <Text style={styles.LoginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        {/* Login with Google */}
        <TouchableOpacity
          style={styles.LoginGoogleButton}
          onPress={handleGoogleLogin}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/google_g_icon.png')}
              style={{ width: 24, height: 24, marginRight: 10 }}
              resizeMode="contain"
            />
            <Text style={styles.LoginGoogleButtonText}>LOG IN WITH GOOGLE</Text>
          </View>
        </TouchableOpacity>


        <View style={styles.DontHaveAccountContainer}>
            <Text style={styles.DontHaveAccountText}>Don't have an account? {' '}
                <Text style={styles.DontHaveAccountLink} onPress={() => navigation.navigate('SignUp')}>
                    Sign Up
                </Text>
            </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  LoginBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  LoginOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 50, 100, 0.5)',
  },
  SignInContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    
  },
  LogInText: {
    fontSize: 42,
    fontWeight: '600',
    marginBottom: 40,
    color: 'black',
    textShadowColor: 'rgba(9, 7, 42, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  LoginInputSection: {
    width: '100%',
    marginBottom: 20,
  },
  LoginLabel: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
    fontWeight: '500',
  },
  LoginInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
  },
  LoginButton: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'blue',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '50%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  LoginButtonText: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  LoginGoogleButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  LoginGoogleButtonText: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  

  DontHaveAccountContainer: {
  marginTop: 20,
  alignItems: 'center',
},
DontHaveAccountText: {
  color: 'white',
  fontSize: 14,
},
DontHaveAccountLink: {
  color: '#FFD700',
  fontWeight: '600',
},

});

export default LogInScreen;
