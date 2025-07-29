import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FAQScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 🔙 Back Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('MainScreen')}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Frequently Asked Questions</Text>

        {/* 🧠 FAQ Items */}
        <View style={styles.faqItem}>
          <Text style={styles.question}>What is the purpose of this app?</Text>
          <Text style={styles.answer}>
            This app helps users request and track shuttle stops in real-time.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How do I request a stop?</Text>
          <Text style={styles.answer}>
            Tap on "Request Stop" on the main screen, then choose your stop and confirm.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>Can I cancel a requested stop?</Text>
          <Text style={styles.answer}>
            Currently, requested stops cannot be canceled. Please contact support if needed.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 6,
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default FAQScreen;
