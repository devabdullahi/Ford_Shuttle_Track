import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY } from '@env';
import axios from 'axios';

export default function MapScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // to Ford WHQ
  const destination = {
    latitude: 42.3174,
    longitude: -83.2105
  }
  useEffect(() => {
    // set loading
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission denied");
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!origin) return;

    const fetchRoute = async () => {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}
                  &destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
      console.log(destination)
      console.log(origin)
      try {
        const response = await axios.get(url);
        console.log('Google Maps response:', response.data);

        const route = response.data.routes?.[0];
        if (!route || !route.overview_polyline) {
          console.warn('No routes found:', response.data);
          return;
        }

        const points = decodePolyline(route.overview_polyline.points);
        setRouteCoords(points);
      } catch (error) {
        console.error('Error fetching route:', error.message);
      }
    };

    fetchRoute();
  }, [origin]);

  const decodePolyline = (t) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < t.length) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>

      {origin && (
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...origin,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          <Marker coordinate={origin} title="You are here" />
          <Marker coordinate={destination} title="Destination" />
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    color: '#003366',
    fontWeight: 'bold',
  },
});
