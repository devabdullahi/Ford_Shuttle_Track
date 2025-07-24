import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const FAQScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('MainScreen')} 
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
      >
        <Icon name="arrow-back" size={24} color="#333" style={{ marginRight: 8 }} />
      </TouchableOpacity>

      {/* 🧠 FAQ Items */}
      <View style={styles.faqItem}>
        <Text style={styles.question}>What is the purpose of this app?</Text>
        <Text style={styles.answer}>This app helps users request and track shuttle stops in real-time.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>How do I request a stop?</Text>
        <Text style={styles.answer}>Tap on "Request Stop" on the main screen, then choose your stop and confirm.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Can I cancel a requested stop?</Text>
        <Text style={styles.answer}>Currently, requested stops cannot be canceled. Please contact support if needed.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default FAQScreen;
