
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { collection, doc, setDoc, getDoc, getFirestore, query, where, getDocs } from "firebase/firestore";
import {app} from "../firebase_config"

const db = getFirestore(app);

// Opens the phone dialer with the driver number
const handleCall = () => {
  const phoneNumber = 'tel:3132693165'; 
  Linking.openURL(phoneNumber);
};

// Navigates to the ApprovedStops screen
const handleSchedule = (navigation) => {
  navigation.navigate('ApprovedStops');
};

// handle map navigation
const handleMap = (navigation) => {
  navigation.navigate('MapScreen');
};
const handleFAQ = (navigation) => {
  navigation.navigate('FAQScreen');
}
// Defines color for each stop status type
const statusColors = {
  Completed: '#bbb',
  Current: '#003366',
  Next: '#0066cc',
  Upcoming: '#bbb',
};

// List of quick action buttons with icons and labels
const quickActions = [
  { id: 1, label: 'Call Ride', icon: '📞' },
  { id: 2, label: 'Request Stop', icon: '🚍' },
  { id: 3, label: 'Map', icon: '🗺️' },
  { id: 4, label: 'FAQ', icon: '❓' },
];

// Main screen component
const MainScreen = ({ navigation }) => {
  // State to store shuttle stop data
  const [stops, setStops] = useState([]);

  // Load stop data when the screen mounts
  useEffect(() => {

    async function setStopData(){
      const currentStopRef = doc(db, "bus_locations", "7KE1TzMHdqpLSEH9aQKo");
      const currentStop = await getDoc(currentStopRef);
      const currentStopData = {"id": currentStop.data().id, "building_name": currentStop.data().building_name}

      const stopsRef = collection(db, "upcoming_stops");
      const nextStopQuery = query(stopsRef, where("stop_id", "==", 1));
      const nextStopData = await getDocs(nextStopQuery)
      const nextStop = nextStopData.docs[0];
      console.log(nextStop.data()["building_name"]);
    
      const timelineData = [
        {
          id: currentStopData.id,
          name: currentStopData.building_name,
          status: 'Current',
          timeLabel: 'Currently at station',
          iconType: 'bus'
        },
        {
          id: nextStop.data()["stop_id"],
          name: nextStop.data()["building_name"],
          status: 'Next',
          timeLabel: 'ETA: 12:05 PM',
          iconType: 'clock'
        }
      ];

      // Log each stop name to console
      timelineData.forEach(stop => {
        console.log(`Loaded stop: ${stop.name}`);
      });

      // Set the timeline data to state
      setStops(timelineData);
    }

    setStopData();
  }, []);

  // Handles press on quick action buttons
  const onQuickActionPress = (action) => {
    console.log('Quick action pressed:', action.label);

    if (action.label === 'Call Ride') {
      handleCall(); // Call driver
    }
    if (action.label === 'Request Stop') {
      handleSchedule(navigation); // Go to schedule screen
    }
    if (action.label === 'Map') {
      // Navigate to map screen (not implemented)
      handleMap(navigation); // Go to map screen
    }

    if (action.label === 'FAQ'){
      handleFAQ(navigation) //go to FAQ Screen
    }
  };
  
  // UI rendering
  // Debug logs for duplicate key errors
  console.log('stops ids:', stops.map(s => s.id));
  console.log('quickActions ids:', quickActions.map(a => a.id));
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Header Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerSmall}>Next Shuttle Arrival</Text>
          <Text style={styles.bannerLarge}>8 min</Text>
        </View>

        {/* Shuttle Timeline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shuttle Progress</Text>
          <View style={styles.timeline}>
            {/* Now only displaying current and next location from available stops data */}
            {stops.map((stop, idx) => (
              <View key={`${stop.id}-${idx}`} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  {idx !== stops.length - 1 && <View style={styles.line} />}
                  <View style={[styles.iconCircle, { backgroundColor: statusColors[stop.status] || '#ccc' }]}>
                    <Text style={styles.iconText}>
                      {stop.iconType === 'check' ? '✓' : stop.iconType === 'bus' ? '🚌' : stop.iconType === 'clock' ? '🕒' : ''}
                    </Text>
                  </View>
                </View>
                <View style={styles.timelineRight}>
                  <View style={styles.stopHeader}>
                    <Text style={[
                      styles.stopTitle,
                      stop.status === 'Upcoming' && styles.upcomingText,
                      stop.status === 'Completed' && styles.completedText
                    ]}>
                      {stop.name}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      stop.status === 'Completed' && styles.completedBadge,
                      stop.status === 'Current' && styles.currentBadge,
                      stop.status === 'Next' && styles.nextBadge,
                      stop.status === 'Upcoming' && styles.upcomingBadge
                    ]}>
                      <Text style={[
                        styles.statusBadgeText,
                        stop.status === 'Upcoming' && styles.upcomingBadgeText
                      ]}>{stop.status}</Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.timeLabel,
                    stop.status === 'Upcoming' && styles.upcomingTimeLabel,
                    stop.status === 'Current' && styles.currentTimeLabel,
                    stop.status === 'Next' && styles.nextTimeLabel,
                    stop.status === 'Completed' && styles.completedTimeLabel
                  ]}>
                    {stop.timeLabel}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Shuttle Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Shuttle Details</Text>
            <View style={styles.onTimeBadge}><Text style={styles.onTimeText}>On Time</Text></View>
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Route</Text>
              <Text style={styles.detailsValue}>Route 15</Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Vehicle ID</Text>
              <Text style={styles.detailsValue}>FRD-2847</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Driver Number</Text>
              <Text style={styles.detailsValue}>000-000-0000</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsWrapper}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, idx) => (
              <View key={`${action.id}-${idx}`} style={styles.quickActionItem}>
                <TouchableOpacity
                  style={styles.quickActionButton}
                  activeOpacity={0.7}
                  onPress={() => onQuickActionPress(action)}
                >
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const circleSize = 28; // Diameter of status icon circles

// All styles for layout, text, colors, etc.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f3f8' },
  banner: { backgroundColor: '#003366', paddingVertical: 30, paddingHorizontal: 20, alignItems: 'center' },
  bannerSmall: { color: 'white', fontSize: 18, marginBottom: 6, fontWeight: '500' },
  bannerLarge: { color: 'white', fontSize: 48, fontWeight: '700', marginBottom: 6 },
  section: { paddingHorizontal: 20, paddingTop: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  timeline: { borderLeftWidth: 2, borderLeftColor: '#ddd' },
  timelineItem: { flexDirection: 'row', marginBottom: 30, position: 'relative', minHeight: circleSize },
  timelineLeft: { width: 50, alignItems: 'center' },
  line: { position: 'absolute', top: circleSize, left: '50%', width: 2, height: 50, backgroundColor: '#ddd' },
  iconCircle: { width: circleSize, height: circleSize, borderRadius: circleSize / 2, justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 18, color: 'white' },
  timelineRight: { flex: 1, paddingLeft: 10 },
  stopHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  stopTitle: { fontSize: 16, fontWeight: '700' },
  completedText: { color: '#999' },
  upcomingText: { color: '#999' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  completedBadge: { backgroundColor: '#e0e0e0' },
  currentBadge: { backgroundColor: '#003366' },
  nextBadge: { backgroundColor: '#0066cc' },
  upcomingBadge: { backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ccc' },
  statusBadgeText: { fontWeight: '600', fontSize: 12, color: 'white' },
  upcomingBadgeText: { color: '#888' },
  timeLabel: { fontSize: 14 },
  completedTimeLabel: { color: '#999' },
  upcomingTimeLabel: { color: '#999' },
  currentTimeLabel: { color: '#003366' },
  nextTimeLabel: { color: '#0066cc' },
  detailsCard: { backgroundColor: 'white', marginHorizontal: 20, marginTop: 20, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 4 },
  detailsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  detailsTitle: { fontSize: 20, fontWeight: '700' },
  onTimeBadge: { backgroundColor: '#daf6dc', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  onTimeText: { color: '#2e7d32', fontWeight: '600', fontSize: 14 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  detailsColumn: { flex: 1 },
  detailsLabel: { fontSize: 14, color: '#888', marginBottom: 4 },
  detailsValue: { fontWeight: '700', fontSize: 16 },
  quickActionsWrapper: { marginHorizontal: 20, marginTop: 30, marginBottom: -40 },
  quickActionsTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#003366' },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickActionItem: { width: '48%', marginBottom: 25, alignItems: 'center' },
  quickActionButton: { backgroundColor: '#e6f0ff', borderRadius: 16, width: '100%', height: 90, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  quickActionIcon: { fontSize: 28, marginBottom: 6 },
  quickActionLabel: { fontSize: 12, fontWeight: '600', textAlign: 'center', color: '#003366' },
});

export default MainScreen;
