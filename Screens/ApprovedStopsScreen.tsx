import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../firebase_config";

const db = getFirestore(app);

const ApprovedStopsScreen = ({ navigation, route }) => {
  const [allStops, setAllStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllStops = async () => {
    try {
      const stopsRef = collection(db, "upcoming_stops");
      const nextStopQuery = query(stopsRef, orderBy("stop_id"));
      const nextStopData = await getDocs(nextStopQuery);

      const mockData = [];
      nextStopData.forEach((doc) => {
        const stop = doc.data();
        mockData.push({
          id: stop.stop_id,
          name: stop.building_name,
          address: stop.address,
          status: "approved",
          coordinates: { lat: stop.lat, lng: stop.long },
        });
      });

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

  useEffect(() => {
    async function addStop(stop) {
      const idRef = doc(db, "id_priorities", "qpndyXt805nzCv7pSL9R");
      const currentIdData = await getDoc(idRef);
      const newId = currentIdData?.data()?.currentId ?? 1;

      const stopsRef = collection(db, "upcoming_stops");

      await addDoc(stopsRef, {
        address: stop.address,
        building_name: stop.name,
        lat: stop.coordinates.lat,
        long: stop.coordinates.lng,
        stop_id: newId,
        created_at: new Date(),
      });

      await updateDoc(idRef, {
        currentId: newId + 1,
      });
    }

    if (route.params?.requestedStops) {
      const requestedStops = route.params.requestedStops.map(stop => ({
        ...stop,
        status: 'requested',
      }));

      Promise.all(requestedStops.map(addStop)).then(handleRefresh);
    }
  }, [route.params?.requestedStops]);

  const handleRefresh = () => {
    setLoading(true);
    fetchAllStops();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#27ae60';
      case 'rejected': return '#ac0606ff';
      case 'requested': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'requested': return 'Requested';
      default: return 'Unknown';
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
            {(item.coordinates?.lat?.toFixed && item.coordinates.lat.toFixed(4)) || 'N/A'}, {(item.coordinates?.lng?.toFixed && item.coordinates.lng.toFixed(4)) || 'N/A'}
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

  // Debug log for duplicate key errors
  console.log('allStops ids:', allStops.map(s => s.id));
  return (
    <SafeAreaView style={styles.container}>
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
        keyExtractor={(item, idx) => `${item.id}-${idx}`}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // 🔼 Prevent clipping on Android
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    marginTop: 10,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  requestButton: {
    marginTop: 10,
    backgroundColor: '#2980b9',
  },
  requestButtonText: {
    color: '#fff',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
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
    fontSize: 14,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
  },
  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  stopName: {
    fontSize: 18,
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stopAddress: {
    color: '#555',
    marginTop: 4,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coordinates: {
    fontSize: 12,
    color: '#888',
  },
  detailsButton: {
    backgroundColor: '#3498db',
    padding: 6,
    borderRadius: 6,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  emptyButton: {
    backgroundColor: '#2980b9',
  },
});

export default ApprovedStopsScreen;
