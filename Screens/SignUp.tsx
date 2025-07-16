import React, { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  // You might need Platform or other imports depending on further styling
} from 'react-native';


const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // We'll add a simple function to handle sign up action later
  const handleSignUp = () => {

    
      console.log('Signing up with:', { name, email, password });

    // Add your sign-up logic here (e.g., API call, validation)
  };

   const handleGoogleSignUp = () => {
    console.log('Signing up with Google');
    // Add your Google sign-up logic here
  };


  return (
    <ImageBackground
      source={require('../assets/Backgrounds/MainFordLogo.jpg')}
      style={styles.SignUpbackground}
      resizeMode="cover"
    >
      {/* Semi-transparent Overlay */}
      {/* This view sits between the background image and the content */}
      <View style={styles.SignUpOverlay} />

      {/* Main Content Container */}
      {/* This view holds all your form elements */}
      <View style={styles.SignUpcontainer}>
        <Text style={styles.signUpText}>Sign Up</Text>

        {/* Name Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#888" // Add placeholder text color for better contrast
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>

        {/* Email Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
             placeholderTextColor="#888"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none" // Good practice for email inputs
          />
        </View>

        {/* Password Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Password*</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a Password"
             placeholderTextColor="#888"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.helperText}>*Must be at least 8 characters</Text>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity
            style={styles.createAccButton}
            onPress={handleSignUp} // Add the action here
            accessibilityHint="Tap to register with the entered information"
        >
          <Text style={styles.createAccButtonText}>
            CREATE AN ACCOUNT
          </Text>
        </TouchableOpacity>

        {/* Sign Up with Google Button */}
        <TouchableOpacity
            style={styles.signUpGoogleButton}
            onPress={handleGoogleSignUp} // Add the action here
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/google_g_icon.png')}
              style={{ width: 24, height: 24, marginRight: 10 }} // Slightly smaller icon
              resizeMode="contain"
            />
            <Text style={styles.signUpGoogleButtonText}>SIGN UP WITH GOOGLE</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.AlreadyHaveAnAccountContainer}>
          <Text style={styles.AlreadyHaveAnAccountText}>Already have an account? {' '}
            <Text style={styles.AlreadyHaveAnAccountLink} onPress={() => navigation.navigate('LogInScreen')}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  SignUpbackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // New Overlay Style
  SignUpOverlay: {
    ...StyleSheet.absoluteFillObject, // Position over the entire background
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black with 60% opacity
    // You could try 'rgba(0, 50, 100, 0.5)' for a Ford blue tint overlay
  },
  SignUpcontainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50, // Increased padding top
    paddingHorizontal: 20, // Add some horizontal padding
  },
  signUpText: {
    fontSize: 42,
    fontWeight: '600', // Slightly bolder
    marginBottom: 40, // More space below title
    color: 'white', // Make title white to stand out
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Optional: Add a subtle shadow for readability
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  inputSection: {
    width: '100%', // Let inputs take full width of container (with container padding)
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8, // More space below label
    color: 'white', // Make labels white
    fontWeight: '500',
  },
  input: {
    height: 50, // Make input fields slightly taller
    borderColor: '#ccc', // Lighter border color
    borderWidth: 1,
    paddingHorizontal: 15, // More horizontal padding inside input
    borderRadius: 8, // Slightly less rounded corners
    backgroundColor: 'white', // Give input a white background
    color: 'black', // Ensure text typed is black
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: '#ccc', // Light grey color
    marginTop: 5,
    // textAlign: 'right', // Optional: align helper text to the right
  },
  createAccButton: {
    alignItems: 'center',
    marginTop: 30, // More space above the first button
    backgroundColor: 'black',
    paddingVertical: 16, // More vertical padding
    paddingHorizontal: 40,
    borderRadius: 8, // Match input border radius
    width: '50%', // Make button full width of container
    // borderColor: 'black', // Border not needed if background is solid black
    // borderWidth: 1,
    elevation: 5, // Add a subtle shadow (Android)
    shadowColor: '#000', // Add a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
   createAccButtonText: {
        fontWeight: '600', // Slightly bolder text
        fontSize: 18, // Slightly larger text
        color: 'white',
   },
  signUpGoogleButton: {
    alignItems: 'center',
    marginTop: 15, // Space between buttons
    backgroundColor: 'white', // Keep white background
    paddingVertical: 16, // Match padding of other button
    paddingHorizontal: 40,
    borderRadius: 8, // Match border radius
    width: '50%', // Make button full width
    borderColor: '#ccc', // Add a light border
    borderWidth: 1,
     elevation: 5, // Add a subtle shadow (Android)
    shadowColor: '#000', // Add a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
   signUpGoogleButtonText: {
        fontWeight: '600', // Match other button text weight
        fontSize: 18, // Match other button text size
        color: 'black', // Ensure text is black on white button
   },
   
  AlreadyHaveAnAccountContainer: {
  marginTop: 20,
  alignItems: 'center',
},
AlreadyHaveAnAccountText: {
  color: 'white',
  fontSize: 14,
},
AlreadyHaveAnAccountLink: {
  color: '#17c1e8',
  fontWeight: '600',
},

});

export default SignUpScreen;
