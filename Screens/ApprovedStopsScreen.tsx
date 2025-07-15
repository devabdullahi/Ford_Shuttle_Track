import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { Card } from 'react-native-paper';

const ApprovedStopsScreen = () => {
  const [approvedStops, setApprovedStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchApprovedStops = async () => {
      try {
        // Replace this with your actual API call
        const mockData = [
          {
            id: '1',
            name: 'Rotunda Center',
            address: '123 Main St, City Center',
            status: 'approved',
            coordinates: { lat: 40.7128, lng: -74.0060 },
          },
          {
            id: '2',
            name: 'WHQ Campus',
            address: '456 College Ave, University District',
            status: 'approved',
            coordinates: { lat: 40.8075, lng: -73.9626 },
          },
          {
            id: '3',
            name: 'Union at Dearborn',
            address: '789 Commerce St, Business District',
            status: 'approved',
            coordinates: { lat: 40.7145, lng: -74.0082 },
          },
          {
            id: '4',
            name: 'Union at MidTown',
            address: '101 River Rd, Scenic Area',
            status: 'Not Approved',
            coordinates: { lat: 40.7831, lng: -73.9712 },
          },
        ];
        
        setApprovedStops(mockData); //setApprovedStops(mockData.filter(stop => stop.status === 'approved'));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApprovedStops();
  }, []);

  const renderStopItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.stopHeader}>
          <Text style={styles.stopName}>{item.name}</Text>
        </View>
        <Text style={styles.stopAddress}>{item.address}</Text>
        <View style={styles.statusContainer}>
          <Text style={item.status === 'approved' ? styles.approvedText : styles.rejectedText}>
            {item.status === 'approved' ? 'Approved' : 'Not Approved'}
          </Text>
        </View>
      </Card.Content>
    </Card>
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
      <Text style={styles.title}>Approved Bus Stops</Text>
      <FlatList
        data={approvedStops}
        renderItem={renderStopItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No approved stops found</Text>
        }
      />
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
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
  },
  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stopIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  stopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  stopAddress: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  approvedText: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
    rejectedText: {
    color: 'red',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 16,
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
});

export default ApprovedStopsScreen;