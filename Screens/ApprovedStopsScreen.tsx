import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ApprovedStopsScreen = ({navigation, route}) => {
  const [allStops, setAllStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchAllStops = async () => {
    try {
      const mockData = [
        {
          id: '1',
          name: 'Wagner Place',
          address: '22001 Michigan Ave, Dearborn',
          status: 'approved',
          coordinates: { lat: 42.322, lng: -83.176 },
        },
        {
          id: '2',
          name: 'World Headquarters',
          address: '1 American Rd, Dearborn',
          status: 'approved',
          coordinates: { lat: 42.315, lng: -82.210 },
        },
        {
          id: '4',
          name: 'Union at MidTown',
          address: '101 River Rd, Scenic Area',
          status: 'rejected',
          coordinates: { lat: 40.7831, lng: -73.9712 },
        },
      ];

      setAllStops(mockData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStops();
  }, []);

  // Handle newly requested stops from RequestStopScreen
  useEffect(() => {
    if (route.params?.requestedStops) {
      const requestedStops = route.params.requestedStops.map(stop => ({
        ...stop,
        status: 'requested'
      }));
      
      setAllStops(prevStops => {
        // Remove duplicates and add new requested stops
        const existingIds = prevStops.map(stop => stop.id);
        const newStops = requestedStops.filter(stop => !existingIds.includes(stop.id));
        return [...prevStops, ...newStops];
      });
    }
  }, [route.params?.requestedStops]);

  const handleRefresh = () => {
    setLoading(true);
    fetchAllStops();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#27ae60';
      case 'rejected':
        return '#ac0606ff';
      case 'requested':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'requested':
        return 'Requested';
      default:
        return 'Unknown';
    }
  };

  const renderStopItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.stopHeader}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={styles.stopName}>{item.name}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
        <Text style={styles.stopAddress}>{item.address}</Text>
        <View style={styles.footerContainer}>
          <Text style={styles.coordinates}>
            {item.coordinates.lat.toFixed(4)}, {item.coordinates.lng.toFixed(4)}
          </Text>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigation.navigate('StopDetails', { stop: item })}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
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
        <Button onPress={handleRefresh} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('MainScreen')}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Bus Stops</Text>
        </View>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('RequestStops')}
          style={styles.requestButton}
          labelStyle={styles.requestButtonText}
        >
          Request New Stop
        </Button>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIndicator, { backgroundColor: '#27ae60' }]} />
          <Text style={styles.legendText}>Approved</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIndicator, { backgroundColor: '#b10303ff' }]} />
          <Text style={styles.legendText}>Rejected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIndicator, { backgroundColor: '#3498db' }]} />
          <Text style={styles.legendText}>Requested</Text>
        </View>
      </View>

      <FlatList
        data={allStops}
        renderItem={renderStopItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No stops found</Text>
            <Button 
              onPress={() => navigation.navigate('RequestStop')}
              style={styles.emptyButton}
            >
              Request a Stop
            </Button>
          </View>
        }
        refreshing={loading}
        onRefresh={handleRefresh}
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
  headerContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
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
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  stopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  stopAddress: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coordinates: {
    fontSize: 12,
    color: '#95a5a6',
    fontFamily: 'monospace',
  },
  detailsButton: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#ebf5fb',
  },
  detailsButtonText: {
    color: '#3498db',
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#95a5a6',
    marginBottom: 16,
  },
  emptyButton: {
    width: '60%',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    width: '50%',
  },
  requestButton: {
    borderRadius: 8,
    backgroundColor: '#3498db',
    height: 40,
  },
  requestButtonText: {
    fontSize: 14,
  },
});

export default ApprovedStopsScreen;