import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // defaults to Ford WHQ
  const default_lat = 42.3174;
  const default_long = 83.2105;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission denied");
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setLoading(false);
    })();
  }, []);

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
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: location?.latitude ?? default_lat,
          longitude: location?.longitude ?? default_long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      />
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