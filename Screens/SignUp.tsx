import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const SignUpScreen = () => {
  const [name, setName] = useState<string>('');   // separate state for name
  const [email, setEmail] = useState<string>(''); // separate state for email
  const [password, setPassword] = useState<string>('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Sign Up</Text>

      {/* Name Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
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
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
      </View>


        {/* password Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Password*</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a Password"
          value={password}
          onChangeText={text => setPassword(text)
          }
        />
        <Text>*Must be at least 8 Characters</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
  },
  signUpText: {
    fontSize: 42,
    fontWeight: '500',
    marginBottom: 30,
  },
  inputSection: {
    width: '60%', // controls how wide each section is
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default SignUpScreen;
