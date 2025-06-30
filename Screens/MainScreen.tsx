import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const stops = [
  {
    id: 1,
    name: 'Manufacturing Plant',
    status: 'Completed',
    timeLabel: 'Departed 12:15 PM',
    iconType: 'check',
  },
  {
    id: 2,
    name: 'Research Center',
    status: 'Current',
    timeLabel: 'Currently at station',
    iconType: 'bus',
  },
  {
    id: 3,
    name: 'Dearborn Plant - Gate 3',
    status: 'Next',
    timeLabel: 'ETA: 12:27 PM',
    iconType: 'clock',
  },
  {
    id: 4,
    name: 'Downtown Transit Hub',
    status: 'Upcoming',
    timeLabel: 'ETA: 12:35 PM',
    iconType: 'circle',
  },
];

const statusColors = {
  Completed: '#bbb',
  Current: '#003366',
  Next: '#0066cc',
  Upcoming: '#bbb',
};

// Quick action buttons data
const quickActions = [
  { id: 1, label: 'Book Ride', icon: '🚍' },
  { id: 2, label: 'Schedule', icon: '📅' },
  { id: 3, label: 'Map', icon: '🗺️' },
  { id: 4, label: 'Help', icon: '❓' },
];

const NavigationBar = () => {
  const onPress = (tab) => {
    console.log('Pressed tab:', tab);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem} onPress={() => onPress('Home')}>
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => onPress('Schedule')}>
        <Text style={styles.navIcon}>🗓️</Text>
        <Text style={styles.navText}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => onPress('Map')}>
        <Text style={styles.navIcon}>🗺️</Text>
        <Text style={styles.navText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => onPress('Profile')}>
        <Text style={styles.navIcon}>👤</Text>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainScreen = () => {
  const onQuickActionPress = (action) => {
    console.log('Quick action pressed:', action.label);
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Top Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerSmall}>Next Shuttle Arrival</Text>
          <Text style={styles.bannerLarge}>8 min</Text>
          <Text style={styles.bannerRoute}>Route 15 - Downtown</Text>
        </View>

        {/* Shuttle Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shuttle Progress</Text>
          <View style={styles.timeline}>
            {stops.map((stop, idx) => (
              <View key={stop.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  {idx !== stops.length - 1 && <View style={styles.line} />}
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: statusColors[stop.status] || '#ccc' },
                    ]}
                  >
                    {stop.iconType === 'check' && <Text style={styles.iconText}>✓</Text>}
                    {stop.iconType === 'bus' && <Text style={styles.iconText}>🚌</Text>}
                    {stop.iconType === 'clock' && <Text style={styles.iconText}>🕒</Text>}
                    {stop.iconType === 'circle' && <View style={styles.greyCircle} />}
                  </View>
                </View>

                <View style={styles.timelineRight}>
                  <View style={styles.stopHeader}>
                    <Text
                      style={[
                        styles.stopTitle,
                        stop.status === 'Upcoming' && styles.upcomingText,
                        stop.status === 'Completed' && styles.completedText,
                      ]}
                    >
                      {stop.name}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        stop.status === 'Completed' && styles.completedBadge,
                        stop.status === 'Current' && styles.currentBadge,
                        stop.status === 'Next' && styles.nextBadge,
                        stop.status === 'Upcoming' && styles.upcomingBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          stop.status === 'Upcoming' && styles.upcomingBadgeText,
                        ]}
                      >
                        {stop.status}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.timeLabel,
                      stop.status === 'Upcoming' && styles.upcomingTimeLabel,
                      stop.status === 'Current' && styles.currentTimeLabel,
                      stop.status === 'Next' && styles.nextTimeLabel,
                      stop.status === 'Completed' && styles.completedTimeLabel,
                    ]}
                  >
                    {stop.timeLabel}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Shuttle Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Shuttle Details</Text>
            <View style={styles.onTimeBadge}>
              <Text style={styles.onTimeText}>On Time</Text>
            </View>
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
              <Text style={styles.detailsLabel}>Capacity</Text>
              <Text style={styles.detailsValue}>18/45 passengers</Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Driver</Text>
              <Text style={styles.detailsValue}>Mike Johnson</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              activeOpacity={0.7}
              onPress={() => onQuickActionPress(action)}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <NavigationBar />
    </>
  );
};

const circleSize = 28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f8',
  },

  banner: {
    backgroundColor: '#003366',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  bannerSmall: {
    color: 'white',
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '500',
  },

  bannerLarge: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 6,
  },

  bannerRoute: {
    color: 'white',
    fontSize: 16,
  },

  section: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
  },

  timelineItem: {
    flexDirection: 'row',
    marginBottom: 30,
    position: 'relative',
    minHeight: circleSize,
  },

  timelineLeft: {
    width: 50,
    alignItems: 'center',
  },

  line: {
    position: 'absolute',
    top: circleSize,
    left: '50%',
    width: 2,
    height: 50,
    backgroundColor: '#ddd',
  },

  iconCircle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    fontSize: 18,
    color: 'white',
  },

  greyCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#bbb',
  },

  timelineRight: {
    flex: 1,
    paddingLeft: 10,
  },

  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  stopTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  completedText: {
    color: '#999',
  },

  upcomingText: {
    color: '#999',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  completedBadge: {
    backgroundColor: '#e0e0e0',
  },

  currentBadge: {
    backgroundColor: '#003366',
  },

  nextBadge: {
    backgroundColor: '#0066cc',
  },

  upcomingBadge: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  statusBadgeText: {
    fontWeight: '600',
    fontSize: 12,
    color: 'white',
  },

  upcomingBadgeText: {
    color: '#888',
  },

  timeLabel: {
    fontSize: 14,
  },

  completedTimeLabel: {
    color: '#999',
  },

  upcomingTimeLabel: {
    color: '#999',
  },

  currentTimeLabel: {
    color: '#003366',
  },

  nextTimeLabel: {
    color: '#0066cc',
  },

  detailsCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  onTimeBadge: {
    backgroundColor: '#daf6dc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  onTimeText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 14,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  detailsColumn: {
    flex: 1,
  },

  detailsLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },

  detailsValue: {
    fontWeight: '700',
    fontSize: 16,
  },

  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },

  quickActionButton: {
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  quickActionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },

  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#003366',
  },

  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },

  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  navIcon: {
    fontSize: 24,
    marginBottom: 2,
  },

  navText: {
    fontSize: 12,
    color: '#333',
  },
});

export default MainScreen;
