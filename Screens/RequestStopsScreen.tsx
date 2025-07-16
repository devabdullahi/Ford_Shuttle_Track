import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-paper';

const RequestStopScreen = ({ navigation }) => {
  const [availableStops, setAvailableStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableStops = async () => {
      try {
        const mockData = [
          { id: '1', name: 'Advanced Engineering Center', address: '2400 Village Rd, Dearborn, MI 48124', coordinates: { lat: 42.3035, lng: -83.2352 } },
          { id: '2', name: 'Allen Park Test Lab', address: '1500 Enterprise Dr, Allen Park, MI 48101', coordinates: { lat: 42.2463, lng: -83.2128 } },
          { id: '3', name: 'Building #2 (Atrium)', address: '20000 Rotunda Dr, Dearborn, MI 48124', coordinates: { lat: 42.2969, lng: -83.2431 } },
          { id: '4', name: 'Building #4', address: '20200 Rotunda Dr, Dearborn, MI 48121', coordinates: { lat: 42.2977, lng: -83.2455 } },
          { id: '5', name: 'Building #5', address: '20300 Rotunda Dr, Dearborn, MI 48124', coordinates: { lat: 42.2983, lng: -83.2470 } },
          { id: '6', name: 'Central Campus Building (HUB)', address: '2100 Carroll Shelby Way, Dearborn, MI 48124', coordinates: { lat: 42.3050, lng: -83.2335 } },
          { id: '7', name: 'Central Lab', address: '15000 Century Dr, Dearborn, MI 48120', coordinates: { lat: 42.2810, lng: -83.1984 } },
          { id: '8', name: 'Commerce Dr North (Cyber & ADAS)', address: '15090 Commerce Dr. North, Dearborn, MI 48120', coordinates: { lat: 42.2842, lng: -83.2005 } },
          { id: '9', name: 'Crash Barrier Building', address: '20000 Oakwood Blvd, Dearborn, MI 48124', coordinates: { lat: 42.2911, lng: -83.2402 } },
          { id: '10', name: 'Dearborn Engine Plant', address: '3001 Miller Rd, Dearborn, MI 48120', coordinates: { lat: 42.2930, lng: -83.1767 } },
          { id: '11', name: 'Dearborn Inn', address: '20301 Oakwood Blvd, Dearborn, MI 48124', coordinates: { lat: 42.2918, lng: -83.2423 } },
          { id: '12', name: 'Dearborn Truck Plant', address: '3001 Miller Rd, Dearborn, MI 48120', coordinates: { lat: 42.2930, lng: -83.1769 } },
          { id: '13', name: 'Diagnostic Service Center', address: '1700 Fairlane Dr, Allen Park, MI 48101', coordinates: { lat: 42.2527, lng: -83.2123 } },
          { id: '14', name: 'Driving Dynamics Lab - East', address: '20500 Oakwood Blvd, Dearborn, MI 48121', coordinates: { lat: 42.2944, lng: -83.2451 } },
          { id: '15', name: 'Driving Dynamics Lab - West', address: '20600 Oakwood Blvd, Dearborn, MI 48121', coordinates: { lat: 42.2950, lng: -83.2460 } },
          { id: '16', name: 'Dynamometer Lab', address: '2473 Village Rd, Dearborn, MI 48124', coordinates: { lat: 42.3025, lng: -83.2344 } },
          { id: '17', name: 'Engine Mfg. Development Ops', address: '17000 Southfield Rd, Allen Park, MI 48101', coordinates: { lat: 42.2500, lng: -83.2100 } },
          { id: '18', name: 'Experimental Vehicle Building', address: '20800 Oakwood Blvd, Dearborn, MI 48124', coordinates: { lat: 42.2965, lng: -83.2482 } },
          { id: '19', name: 'Fairlane Business Park 3', address: '1555 Fairlane Dr, Allen Park, MI 48101', coordinates: { lat: 42.2505, lng: -83.2150 } },
          { id: '20', name: 'Fairlane Business Park 5', address: '17333 Federal Dr, Allen Park, MI 48101', coordinates: { lat: 42.2512, lng: -83.2165 } },
        ];
        
        setAvailableStops(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAvailableStops();
  }, []);

  const toggleStopSelection = (stop) => {
    setSelectedStops(prev =>
      prev.some(s => s.id === stop.id)
        ? prev.filter(s => s.id !== stop.id)
        : [...prev, stop]
    );
  };


  
  // Handle submission of selected stops

  const submitRequests = () => {
    console.log('Submitting requests for:', selectedStops);
    alert(`${selectedStops.length} stop(s) requested for approval`);
    navigation.navigate('ApprovedStops', { requestedStops: selectedStops });
  };

  // Render function for each stop item
  const renderStopItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleStopSelection(item)}>
      <Card style={[
        styles.card,
        selectedStops.some(s => s.id === item.id) && styles.selectedCard
      ]}>
        <Card.Content>
          <Text style={styles.stopName}>{item.name}</Text>
          <Text style={styles.stopAddress}>{item.address}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request New Bus Stops</Text>
      <Text style={styles.subtitle}>Select stops to request for approval</Text>

      <FlatList
        data={availableStops}
        renderItem={renderStopItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No available stops found</Text>
        }
      />

      <Button 
        mode="contained" 
        onPress={submitRequests}
        disabled={selectedStops.length === 0}
        style={styles.submitButton}
      >
        Request {selectedStops.length} Stop(s)
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#3498db',
    backgroundColor: '#ebf5fb',
  },
  stopName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  stopAddress: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#95a5a6',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
});

export default RequestStopScreen;
