import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or your preferred icon library

const StopDetailsScreen = ({ route, navigation }) => {
  const { stop } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{stop.name}</Text>
          <Text style={styles.address}>{stop.address}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[
              styles.detailValue,
              stop.status === 'approved' ? styles.approved : styles.pending
            ]}>
              {stop.status}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Coordinates:</Text>
            <Text style={styles.detailValue}>
              {stop.coordinates.lat}, {stop.coordinates.lng}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
    alignSelf: 'flex-start',
  },
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  address: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
    color: '#2c3e50',
  },
  detailValue: {
    flex: 1,
    color: '#7f8c8d',
  },
  approved: {
    color: '#27ae60',
  },
  pending: {
    color: '#f39c12',
  },
});

export default StopDetailsScreen;